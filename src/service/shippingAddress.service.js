const _shippingAddress = require("../model/shippingAddress.model")

const ShippingAddressService = {
    create: async (newShippingAddress) => {
        return await _shippingAddress.create(newShippingAddress)
    }
}

module.exports = ShippingAddressService