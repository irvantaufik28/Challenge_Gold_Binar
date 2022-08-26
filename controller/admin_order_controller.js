let order_const = require("../internal/constants/order");
let order_uc = require("../usecase/order");
let db = require('../models/index')


exports.changeStatusOrder = async (req, res) => {
    let res_data = {
        status: 'ok',
        message: 'success',
        data: null
    }

    let order_id = req.body.id
    let order = await db.order.findByPk(order_id)
    let status = order_const[req.body.status]

    if (status === undefined) {
        res_data.status = 'failed'
        res_data.message = 'invalid status'
        return res.status(400).json(res_data)
    }

    if (order.status == order_const.ORDER_PENDING) {
        res_data.status = 'failed'
        res_data.message = `can't change status when order is ${order.status}`
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