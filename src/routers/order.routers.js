const express = require('express')
const { user,admin } = require('../constant/Url')
const OrdersController = require('../controller/orders.controller')
const { verifyToken } = require('../middleware/authen')

const orderRouters = express.Router()


orderRouters.post('/api/v1/user/order',verifyToken, OrdersController.createOrders)
orderRouters.get(`${admin}/orders`, OrdersController.getAllOrders)
orderRouters.get(`${admin}/orders/get-orders-by-customer/:customerId`, OrdersController.getListOrdersByCustomerID)
orderRouters.post(`${admin}/orders/cancel-order/:id`, OrdersController.cancelOrder)
orderRouters.get(`${admin}/orders/:id`, OrdersController.getOrderByID)
orderRouters.put(`${admin}/orders/update-status/:id`, OrdersController.updateStatusOrder)

//users get list our orders
orderRouters.get(`${user}/orders`, verifyToken, OrdersController.getListOrdersByCustomerID)
orderRouters.post(`${user}/orders/cancel-order/:id`, verifyToken, OrdersController.cancelOrder)
orderRouters.get(`${user}/orders/:id`, verifyToken, OrdersController.getOrderByID)
module.exports = orderRouters