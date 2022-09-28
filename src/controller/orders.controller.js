const ApiStatus = require("../constant/ApiStatus");
const { OrderStatus } = require("../constant/EntityConstant");
const HttpStatus = require("../constant/HttpStatus");
const MessageResponse = require("../constant/MessageResponse");
const CustomError = require("../error/CustomError");
const _orders = require("../model/order.model");
const { _resp } = require("../payload/response");
const OrdersService = require("../service/orders.service");
const ShippingAddressService = require("../service/shippingAddress.service");

const OrdersController = {
  //admin cancel order || customer cancel order
  cancelOrder: async (req, res, next) => {
    try {
      const order = await OrdersService.getById(req.params.id);
      req.adminId = order.customerId;
      if (req.userId && order.customerId == req.userId) {
        order.status = OrderStatus.CUSTOMERCANCEL;
        order.note = {
          reason: req.body.reason,
          cancelBy: req.userId,
        };
      } else if (req.adminId) {
        order.status = OrderStatus.STAFFCANCEL;
        order.note = {
          reason: req.body.reason,
          cancelBy: req.adminId,
        };
      } else {
        throw new Error(
          `You dont have permisson cancel orderId: ${req.body.id}`
        );
      }
      const data = await OrdersService.save(order);
      _resp(
        res,
        HttpStatus.OK,
        ApiStatus.SUCCESS,
        MessageResponse.SUCCESS,
        data
      );
    } catch (error) {
      _resp(
        res,
        HttpStatus.BAD_REQUEST,
        ApiStatus.INVALID_PARAM,
        error.message
      );
    }
  },

  //admin update status of order
  updateStatusOrder: async (req, res, next) => {
    try {
      const data = await OrdersService.updateStatusOrder(
        req.params.id,
        req.body.status
      );
      _resp(
        res,
        HttpStatus.OK,
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
        MessageResponse.OTHER_ERR,
        {}
      );
    }
  },

  //admin filter all orders
  getAllOrders: async (req, res, next) => {
    console.log(req.query);
    const filter = {
      startDate: req.query.startDate
        ? new Date(req.query.startDate)
        : new Date(),
      endDate: req.query.endDate ? new Date(req.query.endDate) : new Date(),
      status: req.query.status || OrderStatus.PENDING,
      skip: req.query.skip || 1,
      limit: req.query.limit || 10,
    };
    const data = await OrdersService.getAllOrders(filter);
    _resp(
      res,
      HttpStatus.ACCEPTED,
      ApiStatus.SUCCESS,
      MessageResponse.SUCCESS,
      {
        skip: filter.skip,
        limit: filter.limit,
        orders: data,
      }
    );
  },

  //customer view history order || admin query orders by customerId
  getListOrdersByCustomerID: async (req, res) => {
    const customerID = req.userId || req.params.customerId;
    const data = await OrdersService.getListOrdersByCustomerID(customerID);
    _resp(res, HttpStatus.OK, ApiStatus.SUCCESS, MessageResponse.SUCCESS, data);
    // res.status(200).json(data)
  },

  /*
   * request: {
   * customerID,
   * orderDate,
   * total,
   * shippingAddress,
   * products}
   */
  createOrders: async (req, res) => {
    try {
      //create ShippingAddress
      const shippingAddress = await ShippingAddressService.create(
        req.body.shippingAdrress
      );
      //make orders all items in cart?
      const newOrder = new _orders({
        customerId: req.userId,
        products: req.body.products,
        shippingAddress: shippingAddress.id,
      });
      const data = await OrdersService.create(newOrder);
      _resp(
        res,
        HttpStatus.ACCEPTED,
        ApiStatus.SUCCESS,
        MessageResponse.SUCCESS,
        data
      );
    } catch (error) {
      if (error instanceof CustomError) {
        _resp(
          res,
          HttpStatus.BAD_REQUEST,
          ApiStatus.INVALID_PARAM,
          error.message
        );
      }
    }
  },
  getOrderByID: async (req, res, next) => {
    try {
      const data = await OrdersService.getById(req.params.id);
      if (req.userId && data.customerId != req.userId) {
        throw new CustomError(
          HttpStatus.BAD_REQUEST,
          ApiStatus.OTHER_ERR,
          `Cant access this order`
        );
      }
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

module.exports = OrdersController;
