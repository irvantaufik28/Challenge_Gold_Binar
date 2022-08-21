const express = require("express")
const router = express.Router()
const admin = require('../controller/admin_item_controller')
const Validation_product = require('../validation/product/product.validation')
const Validation_category = require('../validation/category/category.validation')


// product
router.post('/product/add',Validation_product.createProduct, admin.addProduct)
router.put('/product/update/:id',Validation_product.createProduct, admin.editProduct)
router.delete('/product/delete/:id', admin.delete)



// category
router.post('/category/add',Validation_category.createCategory ,admin.addCategory)
router.delete('/category/delete/:id', admin.destroyCategory)


// order

router.patch('/order/update', admin.changeStatusOrder)
router.get('/order', admin.getCompletedOrder)

module.exports= router