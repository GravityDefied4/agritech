const Farm = require('../models/Farm');
exports.getFarms = async (req, res) => { try { res.json(await Farm.find({ owner: req.user._id })); } catch (e) { res.status(500).json({ message: e.message }); } };
exports.createFarm = async (req, res) => { try { res.status(201).json(await Farm.create({ ...req.body, owner: req.user._id })); } catch (e) { res.status(500).json({ message: e.message }); } };