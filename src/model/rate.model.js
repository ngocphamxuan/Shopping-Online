const { Schema, default: mongoose } = require("mongoose");

const RateSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: '_product'
    },
    customerId: {
      type: Schema.Types.ObjectId,
    },
    star: {
      type: Number,
      required: true,
    },
    comment: {
      type: Schema.Types.String,
      required: false
    },
  },
  {
    collection: "_rate",
    timestamps: true,
  }
);

const _rate = mongoose.model("_rate", RateSchema);
module.exports = _rate;
