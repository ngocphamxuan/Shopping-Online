const { Schema, default: mongoose } = require("mongoose");
const { OrderStatus } = require("../constant/EntityConstant");

const OrdersSchema = new Schema({
  customerID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    default: OrderStatus.PENDING,
  },
  shippingAddress: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  payment: {
    type: String,
    required: true,
    default: PaymentType.COD,
  },
});

const Orders = mongoose.model("Orders", OrdersSchema);
module.exports = Orders;
