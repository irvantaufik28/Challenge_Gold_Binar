const express = require("express")
const router = express.Router()
const admin_item = require('../controller/admin_item_controller')
const admin_order= require('../controller/admin_order_controller')
const Validation_product = require('../validation/product/product.validation')
const Validation_category = require('../validation/category/category.validation')


// product
router.post('/product/add',Validation_product.createProduct, admin_item.addProduct)
router.put('/product/update/:id',Validation_product.createProduct, admin_item.editProduct)
router.delete('/product/delete/:id', admin_item.delete)



// category
router.post('/category/add',Validation_category.createCategory ,admin_item.addCategory)
router.delete('/category/delete/:id', admin_item.destroyCategory)


// order

router.patch('/order/update', admin_order.changeStatusOrder)
router.get('/order/:id', admin_order.getCompletedOrder)
router.get('/order/', admin_order.getCompletedOrder)

module.exports= router