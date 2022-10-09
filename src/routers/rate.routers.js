const express = require('express')
const { verifyToken } = require('../middleware/authen')
const {user} = require('../constant/Url')
const RateController = require('../controller/rate.controller')

const rateRouter = express.Router()

rateRouter.get(`${user}/rating-products/:productId`, RateController.getAllRateByProductId)
rateRouter.post(`${user}/rating-products/:orderId`, verifyToken, RateController.createRate)

module.exports = rateRouter