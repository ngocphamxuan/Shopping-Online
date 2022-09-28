const express = require('express')
const CustomerController = require('../controller/customer.controller')
const checkParamRequest = require('../middleware/validator')


const customerRouters = express.Router()

customerRouters.post('/api/v1/customer/register', CustomerController.register)
customerRouters.get('/api/v1/admin/customer', CustomerController.getAllCustomer)
customerRouters.post('/api/v1/customer/login',checkParamRequest(['phone', 'password']), CustomerController.login)
module.exports = customerRouters