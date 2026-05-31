const mongoose = require('mongoose');
module.exports = mongoose.model('Farm', new mongoose.Schema({
  name: String, 
  size: Number, 
  location: String, 
  primaryCropType: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true }));