const Order = require('../models/Order');
const SKU = require('../models/SKU');

// Allocate SKU to an order
exports.allocateSku = async (req, res) => {
    const { skuId, orderNumber, quantity } = req.body;

    try {
        const sku = await SKU.findOne({ skuId });
        if (!sku) return res.status(404).json({ message: 'SKU not found' });
        if (sku.quantity < quantity) return res.status(400).json({ message: 'Insufficient stock' });

        sku.quantity -= quantity;
        await sku.save();

        const newOrder = new Order({ orderNumber, skuId, quantity });
        await newOrder.save();
        
        res.json({ message: 'SKU allocated successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error allocating SKU', error });
    }
};
