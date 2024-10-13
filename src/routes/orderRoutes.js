const express = require('express');
const { allocateSku } = require('../controllers/orderController');
const router = express.Router();

// Order Routes
router.post('/allocate', allocateSku);

module.exports = router;
