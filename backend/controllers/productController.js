const Product = require('../models/Product');
exports.getProducts = async (req, res) => { try { res.json(await Product.find()); } catch (e) { res.status(500).json({ message: e.message }); } };
exports.createProduct = async (req, res) => { try { res.status(201).json(await Product.create(req.body)); } catch (e) { res.status(500).json({ message: e.message }); } };