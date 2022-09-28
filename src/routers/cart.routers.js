const express = require('express')
const CartController = require('../controller/cart.controller')
const { verifyToken } = require('../middleware/authen')
const {user, admin} = require('../constant/Url')


const cartRouters = express.Router()
cartRouters.post('/api/v1/user/cart/add-product-to-cart', verifyToken, CartController.addToCart)
cartRouters.delete(`${user}/cart`, verifyToken, CartController.deleteCartItem )
cartRouters.get(`${user}/cart`, verifyToken, CartController.getCartByCustomerID)
cartRouters.put(`${user}/cart`, verifyToken, CartController.updateCart)
module.exports = cartRouters