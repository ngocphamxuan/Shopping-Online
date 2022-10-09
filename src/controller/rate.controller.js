const ApiStatus = require("../constant/ApiStatus");
const { OrderStatus } = require("../constant/EntityConstant");
const HttpStatus = require("../constant/HttpStatus");
const MessageResponse = require("../constant/MessageResponse");
const CustomError = require("../error/CustomError");
const _rate = require("../model/rate.model");
const { _resp } = require("../payload/response");
const OrdersService = require("../service/orders.service");
const ProductService = require("../service/product.service");
const RateService = require("../service/rate.service");

const RateController = {
  getAllRateByProductId: async (req, res) => {
    try {
      console.log(req.params.productId);
      const data = await RateService.getAllRateByProductId(
        req.params.productId
      );
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
  getTopProductByRate: {},

  createRate: async (req, res) => {
    try {
      const existRate = await RateService.checkExistRating(
        req.body.productId,
        req.userId
      );
      if (existRate.length > 0)
        throw new CustomError(
          HttpStatus.METHOD_NOT_ALLOWED,
          ApiStatus.OTHER_ERR,
          `You cant re rate this product`
        );
      // orderId, productId
      // assume user ordered this product
      const order = await OrdersService.getById(req.params.orderId).then(
        (order) => {
          return order.customerId == req.userId ? order : null;
        }
      );
      if (!order)
        throw new CustomError(
          HttpStatus.NOT_FOUND,
          ApiStatus.OTHER_ERR,
          `Order not found with id: ${req.params.orderId}`
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

      const updateRatingPromise = ProductService.updateRating(
        req.body.productId,
        req.body.star
      );
      const data = RateService.ratingProduct(ratingRequest);
      if (!(await updateRatingPromise))
        throw new CustomError(
          HttpStatus.NOT_FOUND,
          ApiStatus.INVALID_PARAM,
          `Cant update product rating`
        );
      _resp(
        res,
        HttpStatus.ACCEPTED,
        ApiStatus.SUCCESS,
        MessageResponse.SUCCESS,
        await data
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
