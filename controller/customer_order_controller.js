let order_uc = require("../usecase/order");
let order_const = require("../internal/constants/order");

exports.getOrder = async (req, res) => {
  let id = req.params.id;
  let res_data = {
    status: "failed",
    message: "belum ada data",
    data: null,
  };
  res_data.data = await order_uc.getPendingOrderByUserID(id);
  if (res_data.data === null) {
    return res.status(404).json(res_data);
  }
  res_data.status = "ok";
  res_data.message = "success";

  res.status(200).json(res_data.data);
};

exports.addOrder = async (req, res) => {
  let id = req.query.id;
  let items = req.body.items;
  let order = await order_uc.getPendingOrderByUserID(id);

  let res_data = {
    status: "failed",
    message: "something went wrong",
    data: null,
  };

  if (order === null) {
    let create_res = await order_uc.createOrder(id, items);
    if (create_res.is_success !== true) {
      return res.status(400).json(res_data);
    }
  } else {
    await order_uc.addOrderDetails(order.id, items);
  }
  order = await order_uc.getPendingOrderByUserID(id);

  res_data.status = "ok";
  res_data.message = "success";
  res_data.data = order;

  res.json(res_data);
};

exports.updateOrderCustomer = async (req, res) => {
  let id = req.query.user_id;
  let items = req.body.items;

  let res_data = {
    status: "failed",
    message: "something went wrong",
    data: null,
  };

  let create_res = await order_uc.updateOrder(id, items);
  if (create_res.is_success !== true) {
    res_data.message = "something went wrong";
    return res.status(400).json(res_data);
  }

  res_data.status = "ok";
  res_data.message = "success";
  res_data.data = create_res.order;

  res.json(res_data);
};

exports.changeStatus = async (req, res) => {
  let id = req.params.id;

  let res_data = {
    status: "failed",
    message: "",
    data: null,
  };

  let order_data = await order_uc.getPendingOrderByUserID(id);
  if (order_data === null) {
    res_data.message = "order is empty";
    return res.status(400).json(res_data);
  }

  // update status
  await order_uc.changeOrderStatus(order_data.id, order_const.ORDER_SUBMITTED);

  res_data.status = "ok";
  res_data.message = "success";
  res.json(res_data);
};
