const ApiStatus = require("../constant/ApiStatus");
const { OrderStatus } = require("../constant/EntityConstant");
const HttpStatus = require("../constant/HttpStatus");
const MessageResponse = require("../constant/MessageResponse");
const _rate = require("../model/rate.model");
const { _resp } = require("../payload/response");
const OrdersService = require("../service/orders.service");
const RateService = require("../service/rate.service");

const RateController = {
  createRate: {},
  getTopProductByRate: {},

  createRate: async (req, res, next) => {
    try {
      // orderId, productId
      // assume user ordered this product
      const order = await OrdersService.getById(req.params.orderId).then(
        (order) => {
          return order.customerId == req.userId ? order : null;
        }
      );
      if (order.status !== OrderStatus.COMPLETED)
        throw new Error(`This order is not completed!`);
      const productRates = order.products.filter((item) => {
        return req.body.productId === item.productId;
      });
      if (productRates.length <= 0)
        throw new Error(`Cant rating this product that you dont buy!`);
      const ratingRequest = new _rate({
        productId: req.body.productId,
        customerId: req.userId,
        star: req.body.star,
        comment: req.body.comment,
      });
      const data = await RateService.ratingProduct(ratingRequest);
      _resp(
        res,
        HttpStatus.ACCEPTED,
        ApiStatus.SUCCESS,
        MessageResponse.SUCCESS,
        data
      );
    } catch (error) {
      if (error instanceof CustomError)
        return _resp(res, error.httpStatus, error.apiStatus, error.message, {});
      return _resp(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        ApiStatus.OTHER_ERR,
        error.message,
        {}
      );
    }
  },
};

module.exports = RateController;
