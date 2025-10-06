// models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  type: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Disapproved'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', requestSchema);
