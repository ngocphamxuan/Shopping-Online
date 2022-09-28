const express = require('express')
const OrdersController = require('../controller/orders.controller')

const orderRouters = express.Router()


orderRouters.post('/api/v1/user/order', OrdersController.createOrders)

module.exports = orderRouters