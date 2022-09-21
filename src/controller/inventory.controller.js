const ApiStatus = require("../constant/ApiStatus")
const HttpStatus = require("../constant/HttpStatus")
const MessageResponse = require("../constant/MessageResponse")
const { _resp } = require("../payload/response")
const InventoryService = require("../service/inventory.service")
const ProductService = require("../service/product.service")

const InventoryController = {
    create: async (req, res, next) => {
        try {
            const newInventory = req.body
            const product = await ProductService.getProductByID(req.body.productId)
            if(!product) throw new Error(`Cant found productId: ${req.body.productId}`)
            const data = await InventoryService.create(newInventory)
            _resp(res, HttpStatus.CREATED, ApiStatus.SUCCESS, MessageResponse.SUCCESS, data)
        } catch (error) {
            _resp(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiStatus.OTHER_ERR, error.message, {})
        }
    }
}

module.exports = InventoryController