const { Schema, default: mongoose } = require("mongoose");

const ShippingAddressSchema = new Schema({
  phone: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  subStreet: {
    type: String,
  },
});

const ShippingAddress = mongoose.model(
  "ShippingAddress",
  ShippingAddressSchema
);
module.exports = ShippingAddress;
