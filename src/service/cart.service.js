const _cart = require("../model/cart.model");
const Cart = require("../model/cart.model");
const _inventory = require("../model/inventory.model");

const CartService = {
  saveCart: async (cart) => {},
  //   getCartByID: async (id) => {
  //     try {
  //       const cart = await Cart.findById(id);
  //       const listCartItems = await CartItems.find({
  //         cartId: cart.id,
  //       });

  //       cart.listCartItems = listCartItems;
  //       console.log(cart);
  //       return {
  //         ...cart._doc,
  //         listCartItems,
  //       };
  //     } catch (error) {
  //       return error;
  //     }
  //   },
  addProductToCart: async (productId, customerId, quantity) => {
    try {
      const oldCartPromise = _cart.findOne({
        customerId: customerId,
      });
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
        throw new Error("out of stock");
      }
      //check if productId is exist in cart, only increase its field quantity
      const oldCart = await oldCartPromise;
      if (
        oldCart &&
        oldCart.products.filter((item) => item.productId == productId).length >
          0
      ) {
        console.log("before update: ", oldCart);
        for (let i = 0; i < oldCart.products.length; i++) {
          if (oldCart.products[i].productId === productId) {
            oldCart.products[i].quantity += quantity;
          }
        }
        const res = await _cart.updateOne(
          {
            customerId: customerId,
          },
          oldCart
        );
        if(!res.modifiedCount) throw new Error('Cant add to cart')
        return oldCart;
      } else {
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
            new: true,
          }
        );
        if (!addToCart) {
          throw new Error("Cant add to Cart");
        }
        return addToCart;
      }
    } catch (error) {
      throw error;
    }
  },
};
module.exports = CartService;
