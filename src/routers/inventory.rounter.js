const express = require('express')
const InventoryController = require('../controller/inventory.controller')


const inventoryRouter = express.Router()

inventoryRouter.post('/api/v1/admin/inventory', InventoryController.create)

module.exports = inventoryRouter