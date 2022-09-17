const CartItems = require("../model/cartItem");
const ProductService = require('../service/product.service')
const CartItemsService = require('../service/cartitems.service')


const CartItemsController = {
  modifyQuantity: async (req, res, next) => {
    try {
      const id = req.params.id
      const quantity = req.body
      const cartItem = await CartItemsService.getByID(id)
      const product = await ProductService.getProductByID(cartItem.productId)
      //check quantity valid?
      if(quantity + cartItem.quantity > product.quantityAvailible) throw new Error() 
    } catch (error) {
      return error
    }
  },
  deleteCartItems: {},
  getAllCartItems: {},
  addCartItems: async (req, res, next) => {
    try {
      const cartItems = new CartItems({
        ...req.body,
      });
      const data =  await CartItemsService.saveCartItems(cartItems);
      res.status(200).json({data})
    } catch (error) {
      return error;
    }
  },
};


module.exports = CartItemsController