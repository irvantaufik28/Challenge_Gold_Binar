const product_uc = require('../usecase/product')
const category_uc = require('../usecase/category')
let order_const = require("../internal/constants/order");
let order_uc = require("../usecase/order");


exports.addProduct= async(req, res)=>{
    let product= req.body
    let res_data = {
        status: 'failed',
        message: '',
        data: null
    }
    let create_res = await product_uc.createProduct (product)
    if(create_res.is_success !== true) {
        res_data.message = 'something went wrong'
        return res.status(400).json(res_data)
    }

    res_data.status = 'ok'
    res_data.message = 'success'
    res_data.data = create_res.product

    res.json(res_data)
}

exports.editProduct =async (req, res)=>{
    let id = req.params.id
    let product= req.body
   
    let res_data = {
        status: 'failed',
        message: '',
        data: null
    }

    let update_res = await product_uc.updateProduct(product ,id)
    if(update_res.is_success !== true) {
        res_data.message = 'something went wrong'
        return res.status(400).json(res_data)
    }
    res_data.status = 'ok'
    res_data.message = 'success'
    res_data.data = update_res.product


    res.json(res_data)
}

exports.delete = async (req, res)=>{
    let id = req.params.id
    let res_data = {
        status: 'failed',
        message: '',
        data: null
    }
    let delete_res = await product_uc.deleteProduct(id)
    if(delete_res.is_success !== true) {
        res_data.message = 'something went wrong'
        return res.status(400).json(res_data)
    }
    res_data.status = 'ok'
    res_data.message = 'success'
    res_data.data = delete_res

    res.json(res_data)
}



exports.addCategory= async(req, res)=>{
    let category = {
    name: req.body.name,
    }
    let res_data = {
        status: 'failed',
        message: '',
        data: null
    }
    let create_res = await category_uc.createCategory(category)
    if(create_res.is_success !== true) {
        res_data.message = 'something went wrong'
        return res.status(400).json(res_data)
    }

    res_data.status = 'ok'
    res_data.message = 'success'
    res_data.data = create_res.category

    res.json(res_data)
}


exports.destroyCategory = async (req, res)=>{
    let id = req.params.id
    let res_data = {
        status: 'failed',
        message: '',
        data: null
    }
    let delete_res = await category_uc.deleteCategory(id)
    if(delete_res.is_success !== true) {
        res_data.message = 'something went wrong'
        return res.status(400).json(res_data)
    }
    res_data.status = 'ok'
    res_data.message = 'success'
    res_data.data = delete_res

    res.json(res_data)
}

exports.changeStatusOrder = async (req, res) => {
    let res_data = {
        status: 'ok',
        message: 'success',
        data: null
    }

    let order_id = req.body.id
    let status = order_const[req.body.status]
    if (status === undefined) {
        res_data.status = 'failed'
        res_data.message = 'invalid status'
        return res.status(400).json(res_data)
    }
    await order_uc.changeOrderStatus(order_id, status)
    res.json(res_data)
}


exports.getCompletedOrder = async (req, res) => {
    let res_data = {
        status: 'ok',
        message: 'success'
    }
    if (req.query['status'] === 'completed') {
        res_data.data = await order_uc.listCompletedOrder()
    } else {
        res_data.data = await order_uc.listOrderExcludePending()
    }

    res.json(res_data)
}