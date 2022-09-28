const { OrderStatus } = require("../constant/EntityConstant");
const _cart = require("../model/cart.model");
const _orders = require("../model/order.model");
const _product = require("../model/product.model");

const OrdersService = {
  getById: async (id) => {
    return await _orders.findById(id)
  },
  save: async (orderSave) => {
    return orderSave.save()
  },
  create: async (newOrder) => {
    try {
      const listProductPromise = newOrder.products.map((item) =>
        _product.findById(item.productId).then((product) => {
          // update sold quantity
          product.soldQuantity += item.quantity
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
    return await _orders.findOneAndUpdate(
      {
        id: orderId,
      },
      {
        status: status,
      }
    );
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
};

module.exports = OrdersService;
