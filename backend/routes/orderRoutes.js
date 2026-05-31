const express = require('express');
const { getMyOrders, createOrder, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/my-orders', authMiddleware, getMyOrders);
router.post('/', authMiddleware, createOrder);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, getAllOrders);
router.put('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;