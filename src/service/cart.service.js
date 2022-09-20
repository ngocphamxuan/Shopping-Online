const _cart = require("../model/cart.model");
const Cart = require("../model/cart.model");
const CartItems = require("../model/cartItem");
const _inventory = require("../model/inventory.model");

const CartService = {
  saveCart: async (cart) => {

  },
  getCartByID: async (id) => {
    try {
      const cart = await Cart.findById(id);
      const listCartItems = await CartItems.find({
        cartId: cart.id,
      });

      cart.listCartItems = listCartItems;
      console.log(cart);
      return {
        ...cart._doc,
        listCartItems,
      };
    } catch (error) {
      return error;
    }
  },
  addProductToCart: async (productId, customerId, quantity) => {
    try {
      // check quantity inventory valid
      // if valid => make new quantity
      const stock = await _inventory.updateOne(
        {
          productId: productId,
          quantity: {
            $gt: quantity,
          },
        },
        {
          $inc: {
            quantity: -quantity,
          },
          $push: {
            reversation: {
              customerId,
              quantity,
              productId,
            },
          },
        }
      );
      if (!stock.modifiedCount) {
        throw new Error('Cant make stock');
      }

      // Update cart
      const addToCart = await _cart.findOneAndUpdate(
        {
          customerId: customerId,
        },
        {
          $push: {
            products: {
              productId,
              quantity,
            },
          },
        },
        {
          upsert: true,
        }
      );
      if (!addToCart) {
        throw new Error('Cant add to Cart');
      }
      return addToCart
    } catch (error) {
      return error;
    }
  },
};
module.exports = CartService;
