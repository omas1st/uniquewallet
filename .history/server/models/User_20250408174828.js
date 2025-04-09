// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  portfolio: {
    bitcoin: { type: Number, default: 0 },
    ethereum: { type: Number, default: 0 },
    usdt: { type: Number, default: 0 },
    xrp: { type: Number, default: 0 }
  },
  uniqueAddresses: {
    bitcoin: { type: String, default: null },
    ethereum: { type: String, default: null },
    usdt: { type: String, default: null },
    xrp: { type: String, default: null }
  },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  notifications: { type: [String], default: [] }
});

module.exports = mongoose.model('User', userSchema);
