const express = require("express");
const router = express.Router();
const customer_order = require("../controller/customer_order_controller");
const customer_item = require("../controller/customer_item_controller");

// customer order
router.get("/order/:id", customer_order.getOrder);
router.post("/order/add", customer_order.addOrder);
router.put("/order/update", customer_order.updateOrderCustomer);

// router.post('/order/add/detail/:id', order.addDetailOrder)
router.patch("/order/sumbit/:id", customer_order.changeStatus);

// customer item
router.get("/product", customer_item.getlistProduct);
router.get("/product/detail/:id", customer_item.getOneProduct);

// customer category
router.get("/category", customer_item.getlistCategory);
router.get("/category/detail/:id", customer_item.getOneCategory);
router.get("/category/detail/list/:id", customer_item.getOneProductByCategory);

module.exports = router;
