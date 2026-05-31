const Order = require('../models/Order');
const Product = require('../models/Product');

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('product', 'name imageUrl')
      .sort({ orderDate: -1 });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ message: 'Insufficient stock' });
    
    const totalAmount = product.price * quantity;
    
    const order = await Order.create({
      user: req.user._id,
      product: productId,
      productName: product.name,
      quantity,
      price: product.price,
      totalAmount
    });
    
    // Update stock
    product.stock -= quantity;
    await product.save();
    
    res.status(201).json(order);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Admin: Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('product', 'name')
      .sort({ orderDate: -1 });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Admin: Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};