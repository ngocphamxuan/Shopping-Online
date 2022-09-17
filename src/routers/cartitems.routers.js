const express = require('express')
const CartItemsController = require('../controller/cartitems.controller')


const cartItemRouters = express.Router()

//admin
cartItemRouters.post('/api/v1/customer/add-product-to-cart', CartItemsController.addCartItems)

module.exports = cartItemRouters