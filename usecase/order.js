const order_constants = require("../internal/constants/order");
const product_uc = require("../usecase/product");
let db = require("../models/index");
const Op = require("sequelize").Op;

let getPendingOrderByUserID = async (user_id) => {
  let order = null;
  try {
    order = await db.order.findOne({
      where: {
        user_id: user_id,
        status: order_constants.ORDER_PENDING,
      },
    });

    let grandTotal = await db.orderDetail.sum("total", {
      where: { order_id: order.id },
    });
  
    order.setDataValue("grandTotal", grandTotal);

  } catch (e) {
    console.log(e);
  }

  if (order === null) {
    return order;
  }


  return {
    ...order.dataValues,
    details: await getDetailOrder(order.id),
  };
};

let getDetailOrder = async (order_id) => {
  let details = [];
  try {
    details = await db.orderDetail.findAll({
      where: { order_id: order_id },
    });
  } catch (e) {
    console.log(e)
  }

  return details
};

let createOrUpdateOrder = async (user_id, items) => {
  
  let is_success = false;
 
  
  let data = {
    user_id: user_id,
    status: order_constants.ORDER_PENDING,
  };

  let order =null 
  let checkStock = await validateStock(items)
  if(checkStock.is_success){

  

  try {
    let order = await getPendingOrderByUserID(user_id);
    await db.order.create(data, { where: { id: order.id } });

    for (let i = 0; i < items.length; i++) {
      const product = await product_uc.getProductByID(items[i].id);
      if (product !== null) {
        const existData = await db.orderDetail.findOne({ where: { product_id: product.id, order_id: order.id } });

        if (existData !== null) {
          await existData.update({ 
            qty: items[i].qty,
            total: product.price * items[i].qty
          });
        } else {
          let detailData = items[i];
          detailData.product_id = product.id;
          detailData.price = product.price * items.qty
          detailData.order_id = order.id;

          await addOrderDetail(detailData);
        }
      }
    }

    order = await getPendingOrderByUserID(user_id);

    is_success = true;
  } catch (e) {
    console.log(e);
  }
  }else{
    is_success = false
    message = checkStock.message
  }
  return {
    is_success: is_success,
    order: order,
    message : message
  };
}

let validateStock = async (items) =>{
  let is_success = true
  let message = "success"

  for(let i = 0; i < items.length; i++){
    let product = await product_uc.getProductByID(items[i].id)
    let qty = items[i].qty
    let stock = product.stock

    if(qty > stock){
      is_success = false
      message = `stock ${product.name} kurang dari ${qty}`
      break;
    }
  }
  return{
    is_success,
    message,
  
  }
}


let addOrderDetails = async (order_id, items) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].qty <= 0) {
      continue;
    }

    let product = null;
    product = await product_uc.getProductByID(items[i].id);

    if (product !== null) {
      let detail = {
        order_id: order_id,
        product_id: product.id,
        price: product.price,
        qty: items[i].qty,
      };

      try {
          
          await addOrderDetail(detail);
        

      } catch (e) {
        console.log(e);
      }
    }
  }
};

let addOrderDetail = async (data) => {
  if (data.total === undefined) {
    data.total = data.price * data.qty;
  }

  await db.orderDetail.create(data);
};

let changeOrderStatus = async (order_id, status) => {
  await db.order.update(
    {
      status: status,
    },
    {
      where: { id: order_id },
    }
  );

};

let listOrderExcludePending = async () => {
  let orders = await db.order.findAll({
    where: {
      [Op.and]: [
        {
          status: {
            [Op.ne]: order_constants.ORDER_PENDING,
          },
        },
        {
          status: {
            [Op.ne]: order_constants.ORDER_COMPLETED,
          },
        },
      ],
    },
  });

  if (orders === null) {
    return [];
  }

  return orders;
};

let listCompletedOrder = async () => {
  let orders = await db.order.findAll({
    where: {
      [Op.or]: [
        {
          status: order_constants.ORDER_COMPLETED,
        },
        {
          status: order_constants.ORDER_CANCELED,
        },
      ],
    },
  });

  if (orders === null) {
    return [];
  }

  return orders;
};

let updateOrder = async (user_id, items) => {
  let is_success = false;
  let updated_order = null;
  
  let data = {
    user_id: user_id,
    status: order_constants.ORDER_PENDING,
  };

  try {
    let order = await getPendingOrderByUserID(user_id);
    await db.order.update(data, { where: { id: order.id } });

    for (let i = 0; i < items.length; i++) {
      const product = await product_uc.getProductByID(items[i].id);
      if (product !== null) {
        const existData = await db.orderDetail.findOne({ where: { product_id: product.id, order_id: order.id } });

        if (existData !== null) {
          await existData.update({ qty: items[i].qty });
        } else {
          let detailData = items[i];
          detailData.product_id = product.id;
          detailData.price = product.price;
          detailData.order_id = order.id;

          await addOrderDetail(detailData);
        }
      }
    }

    await db.orderDetail.destroy({
      where: {
        order_id: order.id,
        product_id: {
          [Op.notIn]: items.map((val) => val.id),
        },
      },
    });

    updated_order = await getPendingOrderByUserID(user_id);

    is_success = true;
  } catch (e) {
    console.log(e);
  }

  return {
    is_success: is_success,
    order: updated_order,
  };
};

module.exports = {
  getPendingOrderByUserID: getPendingOrderByUserID,
  getDetailOrder: getDetailOrder,
  createOrUpdateOrder:createOrUpdateOrder,
  addOrderDetails: addOrderDetails,
  changeOrderStatus: changeOrderStatus,
  listOrderExcludePending: listOrderExcludePending,
  listCompletedOrder: listCompletedOrder,
  updateOrder: updateOrder,
};
