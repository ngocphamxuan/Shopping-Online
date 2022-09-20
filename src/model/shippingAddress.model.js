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
},{
  collection: 'shippingAddress',
  timestamps: true,
});

const _shippingAddress = mongoose.model(
  "shippingAddress",
  ShippingAddressSchema
);
module.exports = _shippingAddress;
