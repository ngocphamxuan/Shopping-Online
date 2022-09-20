const CartService = require("../service/cart.service");

const CartController = {
  getCartByID: async (req, res, next) => {
    try {
      const cart = await CartService.getCartByID(req.params.id);
      cart.total = cart.listCartItems.reduce((preValue, curValue) => preValue.total + curValue.total, 0)
      return res.status(200).json({cart})
    } catch (error) {
        return res.status(400).json({error})
    }
  },
  updateCart: {},
  addToCart: async (req, res, next) => {
    /*
    request: {
      productID,
      customerID,
      quantity,
    }
    */
    try {
      const quantity = req.body.quantity
      const productId = req.body.productId
      const customerId = req.body.customerId
      const data = await CartService.addProductToCart(productId, customerId, quantity)
      
    } catch (error) {
      
    }
  }
};

module.exports = CartController;
