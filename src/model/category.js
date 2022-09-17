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
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
