const express = require('express')
const { verifyToken } = require('../middleware/authen')
const {user} = require('../constant/Url')
const RateController = require('../controller/rate.controller')

const rateRouter = express.Router()

rateRouter.post(`${user}/rating-products/:orderId`, verifyToken, RateController.createRate)
module.exports = rateRouter