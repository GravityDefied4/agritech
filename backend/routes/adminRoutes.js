const express = require('express');
const { getAnalytics, getAllUsers, deleteUser, updateUser } = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/analytics', authMiddleware, adminMiddleware, getAnalytics);
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);
router.put('/users/:id', authMiddleware, adminMiddleware, updateUser);

module.exports = router;