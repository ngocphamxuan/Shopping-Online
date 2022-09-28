const express = require('express')
const CartController = require('../controller/cart.controller')
const { verifyToken } = require('../middleware/authen')


const cartRouters = express.Router()

//admin
// cartRouters.get('/api/v1/user/get-cart/:id', CartController.getCartByID)
cartRouters.post('/api/v1/user/add-product-to-cart', verifyToken, CartController.addToCart)
module.exports = cartRouters