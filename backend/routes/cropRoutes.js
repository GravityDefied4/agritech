const express = require('express');
const { getCrops, createCrop, updateCropStatus } = require('../controllers/cropController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getCrops);
router.post('/', authMiddleware, createCrop);
router.put('/:id/status', authMiddleware, updateCropStatus); // ✅ NEW

module.exports = router;