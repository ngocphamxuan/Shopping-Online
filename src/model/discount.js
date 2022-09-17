const { Schema, default: mongoose } = require("mongoose");
const { DISCOUNT } = require("../constant/EntityConstant");

const DiscountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  unit: {
    type: Number,
    required: true,
    default: DISCOUNT.UNIT.PERCENT,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: Number,
    default: DISCOUNT.STATUS.ACTIVE,
  },
  maxValue: {
    type: Number,
  },
  fromValue: {
    type: Number,
    default: 0,
  },
});

const Discount = mongoose.model("Discount", DiscountSchema);
module.exports = Discount;
