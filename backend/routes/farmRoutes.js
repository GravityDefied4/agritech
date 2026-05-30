const express = require('express');
const { getFarms, createFarm } = require('../controllers/farmController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/', authMiddleware, getFarms);
router.post('/', authMiddleware, createFarm);
module.exports = router;