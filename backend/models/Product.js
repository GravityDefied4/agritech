const mongoose = require('mongoose');
module.exports = mongoose.model('Product', new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['seed', 'fertilizer', 'pesticide', 'equipment'] },
  price: Number, description: String
}, { timestamps: true }));