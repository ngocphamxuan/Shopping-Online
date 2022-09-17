const CartItems = require("../model/cartItem");

const CartItemsService = {
  saveCartItems: async (cartItem) => {
    try {
        console.log(cartItem)
        return  await cartItem.save();
       
    } catch (error) {
      return error;
    }
  },
  getByID: async (id) => {
    try {
      return await CartItems.findById(id)
    } catch (error) {
      return error
    }
  }
};

module.exports = CartItemsService