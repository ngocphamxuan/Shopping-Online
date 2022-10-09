const _rate = require("../model/rate.model")

const RateService = {
    ratingProduct: async (ratingRequest) => {
        return ratingRequest.save()
    },
    checkExistRating: async (productId, customerId) => {
        return await _rate.find({
            productId: productId,
            customerId: customerId
        })
    },
    getAllRateByProductId: async (productId) => {
        const data = await _rate.find({
            productId: productId
        })
        return data
    }
}

module.exports = RateService