const { Schema, default: mongoose } = require("mongoose");
const { OrderStatus } = require("../constant/EntityConstant");

const OrdersSchema = new Schema(
  {
    customerID: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    orderDate: {
      type: Date,
      required: true,
      default: Date(),
    },
    completeDate: {
      type: Date,
      required: false,
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
      ref: "ShippingAddress",
    },
    payment: {
      type: String,
      required: true,
      default: PaymentType.COD,
    },
    products: {
      type: Schema.Types.Array,
      required: true,
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

const _orders = mongoose.model("orders", OrdersSchema);
module.exports = _orders;
