const ApiStatus = require("../constant/ApiStatus");
const HttpStatus = require("../constant/HttpStatus");
const MessageResponse = require("../constant/MessageResponse");
const { _resp } = require("../payload/response");
const CartService = require("../service/cart.service");

const CartController = {
  getCartByCustomerID: async (req, res, next) => {
    try {
      const data = await CartService.getCartByCustomerID(req.userId);
      _resp(
        res,
        HttpStatus.ACCEPTED,
        ApiStatus.SUCCESS,
        MessageResponse.SUCCESS,
        data
      );
    } catch (error) {
      _resp(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        ApiStatus.OTHER_ERR,
        error.message,
        {}
      );
    }
  },

  //only customer cant delete products in our cart
  deleteCartItem: async (req, res, next) => {
    try {
      const data = await CartService.deleteCartItem(
        req.userId,
        req.body.products
      );
      _resp(
        res,
        HttpStatus.ACCEPTED,
        ApiStatus.SUCCESS,
        MessageResponse.SUCCESS,
        data
      );
    } catch (error) {
      _resp(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        ApiStatus.OTHER_ERR,
        error.message,
        {}
      );
    }
  },
  /* 
      request: {
        cartId,
        productID,
        quantity,
      }
    */
  updateCart: async (req, res, next) => {
    try {
      const data = await CartService.addProductToCart(
        req.body.productId,
        req.userId,
        req.body.quantity
      );
      _resp(
        res,
        HttpStatus.ACCEPTED,
        ApiStatus.SUCCESS,
        MessageResponse.SUCCESS,
        data
      );
    } catch (error) {
      _resp(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        ApiStatus.OTHER_ERR,
        error.message,
        {}
      );
    }
  },
  /*
    request: {
      productID,
      customerID,
      quantity,
    }
    */
  addToCart: async (req, res, next) => {
    try {
      const quantity = req.body.quantity;
      const productId = req.body.productId;
      const customerId = req.userId;
      const data = await CartService.addProductToCart(
        productId,
        customerId,
        quantity
      );
      _resp(
        res,
        HttpStatus.ACCEPTED,
        ApiStatus.SUCCESS,
        MessageResponse.SUCCESS,
        data
      );
    } catch (error) {
      _resp(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        ApiStatus.OTHER_ERR,
        error.message,
        {}
      );
    }
  },
};

module.exports = CartController;
