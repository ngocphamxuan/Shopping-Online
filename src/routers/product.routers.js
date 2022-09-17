const express = require('express')
const ProductController = require('../controller/product.controller')


const productRouters = express.Router()

//admin
productRouters.post('/api/v1/admin/products/create', ProductController.createProduct)
productRouters.get('/api/v1/admin/products', ProductController.getAllProduct)
productRouters.get('/api/v1/admin/products/:id', ProductController.getProductByID)
productRouters.post('/api/v1/admin/products/:id', ProductController.updateProduct)

module.exports = productRouters