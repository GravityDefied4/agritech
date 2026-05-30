const express = require('express');
const { getCrops, createCrop } = require('../controllers/cropController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/', authMiddleware, getCrops);
router.post('/', authMiddleware, createCrop);
module.exports = router;