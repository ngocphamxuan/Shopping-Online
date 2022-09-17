const { Schema, default: mongoose } = require("mongoose");

const RateSchema = new Schema({
    ratingStart: {
        type: Number,
        required: true,
        default: 0,
    },
    ratingCount: {
        type: Number,
        required: true,
        default: 0,
    }
})

const Rate = mongoose.model('Rate', RateSchema);
module.exports = Rate;