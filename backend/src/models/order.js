const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'mentors' },
    mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    day: { type: String, default: 0 }, //1-sunday
    slot: { type: String, default: 0 }, //00:00-00:30 - 1

})

module.exports = mongoose.model('orders', OrderSchema);