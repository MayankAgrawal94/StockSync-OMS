const express = require('express');
const { getSkusByName, addStock } = require('../controllers/inventoryController');
const router = express.Router();

// Inventory Routes
router.get('/', getSkusByName);
router.post('/add', addStock);

module.exports = router;
