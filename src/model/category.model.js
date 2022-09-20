const { Schema, default: mongoose, model } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mediaURLs: {
    type: String,
    required: true,
    default: "category_default.png",
  },
}, {
  collection: 'categories'
});

const _category = mongoose.model("categories", CategorySchema);
module.exports = _category;
