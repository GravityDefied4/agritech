const User = require('../models/User');
const Farm = require('../models/Farm');
const Product = require('../models/Product');
const Order = require('../models/Order');

exports.getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalFarms = await Farm.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    // Get users by role
    const farmers = await User.countDocuments({ role: 'farmer' });
    const admins = await User.countDocuments({ role: 'admin' });
    
    // Get recent orders
    const recentOrders = await Order.find()
      .populate('user', 'name')
      .sort({ orderDate: -1 })
      .limit(5);
    
    res.json({
      totalUsers,
      totalFarms,
      totalProducts,
      totalOrders,
      farmers,
      admins,
      recentOrders
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, role, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, phone, address },
      { returnDocument: 'after', runValidators: true }
    ).select('-password');
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};