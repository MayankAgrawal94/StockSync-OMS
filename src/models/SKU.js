const mongoose = require('mongoose');

const skuSchema = new mongoose.Schema({
    skuId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('SKU', skuSchema);
