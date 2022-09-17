const express = require('express')
const CartController = require('../controller/cart.controller')


const cartRouters = express.Router()

//admin
cartRouters.get('/api/v1/user/get-cart/:id', CartController.getCartByID)
module.exports = cartRouters