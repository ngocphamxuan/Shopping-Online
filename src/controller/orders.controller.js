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
      const order = await OrdersService.getById(req.body.id);
      if (req.userId && order.customerId === req.userId) {
        order.status = OrderStatus.CUSTOMERCANCEL;
        order.note = {
          reason: req.body.reason,
          cancelBy: req.userId,
        };
      } else if(req.adminId) {
        order.status = OrderStatus.STAFFCANCEL;
        order.note = {
          reason: req.body.reason,
          cancelBy: req.adminId,
        };
      }
      else{
        throw new Error(`You dont have permisson cancel orderId: ${req.body.id}`)
      }
      const data = await OrdersService.save(order);
      _resp(
        res,
        HttpStatus.SUCCESS,
        ApiStatus.SUCCESS,
        MessageResponse.SUCCESS,
        data
      );
    } catch (error) {}
  },

  //admin update status of order
  updateStatusOrder: async (req, res, next) => {
    const data = await OrdersService.updateStatusOrder(
      req.body.orderId,
      req.body.status
    );
    _resp(
      res,
      HttpStatus.SUCCESS,
      ApiStatus.SUCCESS,
      MessageResponse.SUCCESS,
      data
    );
  },

  //admin filter all orders
  getAllOrders: async (req, res, next) => {
    const filter = {
      startDate: req.body.startDate || null,
      endDate: req.body.endDate || new Date().getDay,
      status: req.body.status || OrderStatus.PENDING,
      skip: req.body.skip || 1,
      limit: req.body.limit || 10,
    };
    const data = await OrdersService.getAllOrders(filter);
    _resp(
      res,
      HttpStatus.ACCEPTED,
      ApiStatus.SUCCESS,
      MessageResponse.SUCCESS,
      data
    );
  },

  //customer view history order || admin query orders by customerId
  getListOrdersByCustomerID: async (req, res) => {
    const customerID = req.userId || req.params.customerID;
    const data = OrdersService.getListOrdersByCustomerID(customerID);
    _resp(
      res,
      HttpStatus.SUCCESS,
      ApiStatus.SUCCESS,
      MessageResponse.SUCCESS,
      data
    );
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
        customerId: req.body.customerId,
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
  getOrderByID: async () => {},
};

module.exports = OrdersController;
