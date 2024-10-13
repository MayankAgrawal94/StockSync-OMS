const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    skuId: { type: String, required: true },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
