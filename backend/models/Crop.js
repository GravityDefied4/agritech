const mongoose = require('mongoose');
module.exports = mongoose.model('Crop', new mongoose.Schema({
  name: String, type: String, sowingDate: Date, status: { type: String, default: 'planted' },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true }));