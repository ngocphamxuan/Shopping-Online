const { Schema, default: mongoose } = require("mongoose");

const ProductInventorySchema = new Schema({
  quantity: {
    type: Number,
    required: true,
    min: [0, "Must be in negotive"],
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
});
const ProductInventory = mongoose.model(
  "ProductInventory",
  ProductInventorySchema
);
module.exports = ProductInventory;
