const SKU = require('../models/SKU');
const Order = require('../models/Order');

// Perform audit on the system, with an optional skuId
exports.audit = async (req, res) => {
    const { skuId } = req.query;  // Get skuId from query parameters

    try {
        // If skuId is provided, audit only that particular SKU
        if (skuId) {
            const sku = await SKU.findOne({ skuId });
            if (!sku) {
                return res.status(404).json({ message: 'SKU not found' });
            }

            // Get the total number of units allocated to orders for this SKU
            const totalAllocated = await Order.aggregate([
                { $match: { skuId } },
                { $group: { _id: '$skuId', total: { $sum: '$quantity' } } }
            ]);

            const totalAllocatedCount = totalAllocated[0]?.total || 0;

            return res.json({
                skuId: sku.skuId,
                skuName: sku.name,
                totalInwarded: sku.quantity + totalAllocatedCount,  // Total inwarded is current quantity + allocated
                totalAllocated: totalAllocatedCount,
                availableStock: sku.quantity
            });
        }

        // If no skuId is provided, audit all SKUs
        const totalInwarded = await SKU.aggregate([{ $group: { _id: null, total: { $sum: "$quantity" } } }]);
        const totalAllocated = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$quantity" } } }]);

        const totalInwardedCount = totalInwarded[0]?.total || 0;
        const totalAllocatedCount = totalAllocated[0]?.total || 0;

        return res.json({
            totalInwarded: totalInwardedCount,
            totalAllocated: totalAllocatedCount,
            availableStock: totalInwardedCount - totalAllocatedCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Audit failed', error });
    }
};
