const { OrderStatus } = require("../constant/EntityConstant");
const HttpStatus = require("../constant/HttpStatus");
const ApiStatus = require("../constant/ApiStatus");
const CustomError = require("../error/CustomError");
const _cart = require("../model/cart.model");
const _orders = require("../model/order.model");
const _product = require("../model/product.model");

const OrdersService = {
  getById: async (id) => {
    const order = await _orders.findById(id);
    if (!order)
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        ApiStatus.INVALID_PARAM,
        `Cant found order with id: ${id}`
      );
    return order
  },
  save: async (orderSave) => {
    return orderSave.save();
  },
  create: async (newOrder) => {
    try {
      const listProductPromise = newOrder.products.map((item) =>
        _product.findById(item.productId).then((product) => {
          // update sold quantity
          product.soldQuantity += item.quantity;
          return product.price * item.quantity;
        })
      );
      const listProductPrice = await Promise.all(listProductPromise);
      //caculate total order
      newOrder.total = listProductPrice.reduce((preValue, curValue) => {
        return preValue + curValue;
      }, 0);
      //delete item order in cart of customer
      const customerCartPromise = _cart.findOneAndUpdate(
        {
          customerId: newOrder.customerId,
        },
        {
          $pullAll: {
            products: newOrder.products,
          },
        },
        {
          new: true,
        }
      );
      const createOrderPromise = _orders.create(newOrder);
      const customerCart = await customerCartPromise;
      console.log(customerCart);

      return await createOrderPromise;
    } catch (error) {
      throw error;
    }
  },
  getListOrdersByCustomerID: async (customerId) => {
    return await _orders.find({
      customerId: customerId,
    });
  },
  updateStatusOrder: async (orderId, status) => {
    const order = await _orders.findById(orderId);
    if (!order)
      throw new CustomError(404, 3, `Not found order with id: ${orderId}`);
    order.status = status;
    return await order.save();
  },
  cancelOrder: async (orderId, reason) => {
    return await _orders.findOneAndUpdate(
      {
        id: orderId,
      },
      {
        status: OrderStatus.CUSTOMERCANCEL,
        note: reason,
      }
    );
  },
  getAllOrders: async (filter) => {
    console.log(filter);
    return await _orders
      .find({
        status: filter.status,
        orderDate: {
          $gte: filter.startDate,
          $lte: filter.endDate,
        },
      })
      .skip(filter.skip - 1)
      .limit(filter.limit * filter.skip);
  },
};

module.exports = OrdersService;
