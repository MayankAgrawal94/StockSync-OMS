const SKU = require('../models/SKU');

// Retrieve SKUs by starting letter
exports.getSkusByName = async (req, res) => {
    const letter = req.query.name || '';
    try {
        const skus = await SKU.find({ name: new RegExp(`^${letter}`, 'i') });
        res.json(skus);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving SKUs', error });
    }
};

// Add stock to SKU
exports.addStock = async (req, res) => {
    const { skuId, quantity } = req.body;
    try {
        const sku = await SKU.findOne({ skuId });
        if (!sku) return res.status(404).json({ message: 'SKU not found' });

        sku.quantity += quantity;
        await sku.save();
        res.json({ message: 'Stock added successfully', sku });
    } catch (error) {
        res.status(500).json({ message: 'Error adding stock', error });
    }
};
