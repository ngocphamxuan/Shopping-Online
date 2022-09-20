const { Schema, default: mongoose } = require("mongoose");

const InventorySchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "products",
    },
    quantity: {
      type: Number,
      required: true,
    },
    reversation: {
        type: Array,
        default: [],
    }
  },
  {
    collection: "inventories",
    timestamps: true,
  }
);

const _inventory = mongoose.model("inventories", InventorySchema);
module.exports = _inventory;
