const mongoose = require('mongoose');
module.exports = mongoose.model('Product', new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['seed', 'fertilizer', 'pesticide', 'equipment'] },
  price: { type: Number, required: true },
  description: String,
  imageUrl: String,
  stock: { type: Number, default: 0 }
}, { timestamps: true }));