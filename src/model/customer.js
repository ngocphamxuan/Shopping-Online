const { Schema, default: mongoose } = require("mongoose");
const validator = require("validator");
const { GENDER, CustomerStatus } = require("../constant/EntityConstant");

const CustomerSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error(`Invalid Email: ${value}`);
    },
  },
  fullname: {
    type: String,
    required: true,
    minLength: 7,
  },
  gender: {
    type: String,
    required: true,
    validate(value) {
      if (!GENDER.includes(value)) throw new Error(`Invalid gender: ${value}`);
    },
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    validate(value) {
      if (!validator.isMobilePhone(value, "vi-VN"))
        throw new Error(`Invalid phone number: ${value}`);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  avatarUrl: {
    type: String,
    default: "avt_default.png",
  },
  status: {
    type: Number,
    required: true,
    default: CustomerStatus.ACTIVE,
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
