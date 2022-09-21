const express = require('express')
const CustomerController = require('../controller/customer.controller')


const customerRouters = express.Router()

// customerRouters.post('/api/v1/customer/register', CustomerController.register)

module.exports = customerRouters