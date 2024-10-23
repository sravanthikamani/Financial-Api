const express = require('express');
const router = express.Router();
const { getSummary } = require('../controllers/summary');

// Define your summary route
router.get('/', getSummary);

// Export the router
module.exports = router;
