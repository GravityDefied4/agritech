const express = require('express');
const { getProducts, createProduct } = require('../controllers/productController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/', getProducts);
router.post('/', authMiddleware, adminMiddleware, createProduct);
module.exports = router;