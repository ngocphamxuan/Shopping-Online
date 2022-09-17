const { Schema, default: mongoose } = require("mongoose");

const CartSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    total: {
        type: Number,
        required: true,
    }
})

const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart