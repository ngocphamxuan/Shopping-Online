const ApiStatus = require("../constant/ApiStatus");
const HttpStatus = require("../constant/HttpStatus");
const MessageResponse = require("../constant/MessageResponse");
const { resp, _resp } = require("../payload/response");
const CartService = require("../service/cart.service");

const CartController = {
  // getCartByID: async (req, res, next) => {
  //   try {
  //     const cart = await CartService.getCartByID(req.params.id);
  //     cart.total = cart.listCartItems.reduce(
  //       (preValue, curValue) => preValue.total + curValue.total,
  //       0
  //     );
  //     return res.status(200).json({ cart });
  //   } catch (error) {
  //     return res.status(400).json({ error });
  //   }
  // },
  deleteCartItem: async (req, res, next) => {
    /* request: {
      productId,
      cartId,
    } */

  },
  updateCart: async (req, res, next) => {
    /* 
      request: {
        cartId,
        productID,
        quantity,
      }
    */
  },
  addToCart: async (req, res, next) => {
    /*
    request: {
      productID,
      customerID,
      quantity,
    }
    */
    try {
      const quantity = req.body.quantity;
      const productId = req.body.productId;
      const customerId = req.body.customerId;
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
