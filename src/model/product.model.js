const { Schema, default: mongoose } = require("mongoose");
const { DISCOUNT } = require("../constant/EntityConstant");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  media_URL_IDs: {
    type: Schema.Types.Array,
    default: ["product_default.png"],
  },
  category_IDs: {
    type: Schema.Types.Array,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
    maxLength: 50,
  },
  longDescription: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 1,
  },
  onTheTop: {
    type: Boolean,
    default: false,
  },
  // rateId: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: "Rate",
  // },
  // discountId: {
  //   type: Schema.Types.ObjectId,
  //   default: DISCOUNT.ID_DEFAULT,
  //   ref: "Discount",
  // },
}, {
  collection: 'products',
  timestamps: true,
});

const _product = mongoose.model("products", ProductSchema);
module.exports = _product;
