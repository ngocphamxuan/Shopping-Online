const { Schema, default: mongoose } = require("mongoose");

const CartItemsSchema = new Schema({
  cartId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Cart",
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: [1],
  },
});

const CartItems = mongoose.model("CartItems", CartItemsSchema);
module.exports = CartItems;
