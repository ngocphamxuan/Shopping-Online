const { Schema, default: mongoose } = require("mongoose");

const OrderItemsSchema = new Schema({
  orderID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Orders",
  },
  productID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const OrderItems = mongoose.model("OrderItems", OrderItemsSchema);
module.exports = OrderItems;