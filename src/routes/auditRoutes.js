const express = require('express');
const { audit } = require('../controllers/auditController');
const router = express.Router();

// Audit Route
router.get('/', audit);

module.exports = router;
