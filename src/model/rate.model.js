const { Schema, default: mongoose } = require("mongoose");

const RateSchema = new Schema(
  {
    ratingStart: {
      type: Number,
      required: true,
      default: 0,
    },
    ratingCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    collection: "rates",
    timestamps: true,
  }
);

const _rate = mongoose.model("rates", RateSchema);
module.exports = _rate;
