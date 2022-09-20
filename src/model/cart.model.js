const { Schema, default: mongoose } = require("mongoose");

const CartSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
  },
  {
    collection: "carts",
    timestamps: true,
  }
);

const _cart = mongoose.model("carts", CartSchema);
module.exports = _cart;
