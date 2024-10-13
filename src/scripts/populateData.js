require('dotenv').config();
const mongoose = require('mongoose');
const { MongoDbConfig } = require('../config/env.constant');
const SKU = require('../models/SKU');

const skus = [
    { skuId: 'SKU001', name: 'Apple', quantity: 50 },
    { skuId: 'SKU002', name: 'Banana', quantity: 100 },
    { skuId: 'SKU003', name: 'Orange', quantity: 75 },
    { skuId: 'SKU004', name: 'Avocado', quantity: 60 },
    { skuId: 'SKU005', name: 'Blueberry', quantity: 30 },
    { skuId: 'SKU006', name: 'Grapes', quantity: 120 },
    { skuId: 'SKU007', name: 'Peach', quantity: 45 },
    { skuId: 'SKU008', name: 'Plum', quantity: 40 },
    { skuId: 'SKU009', name: 'Kiwi', quantity: 90 },
    { skuId: 'SKU010', name: 'Mango', quantity: 110 }
];

const populateData = async () => {
    try {
        // Check if the environment variable is loaded properly
        if (!MongoDbConfig.connOptions) {
            throw new Error('DB_CONNECTION_STRING is not defined in .env file');
        }

        await mongoose.connect(MongoDbConfig.connString, MongoDbConfig.connOptions);
        console.log('Connected to MongoDB');

        await SKU.deleteMany();  // Clear any existing SKUs in the collection

        const result = await SKU.insertMany(skus);
        console.log(`${result.length} SKUs have been successfully added to the database!`);
    } catch (error) {
        console.error('Error populating data:', error);
    } finally {
        mongoose.connection.close();
    }
};

populateData();
