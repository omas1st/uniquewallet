// server/models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['send', 'receive', 'withdraw', 'buy', 'sell', 'transfer'], required: true },
  asset: { type: String, enum: ['bitcoin', 'ethereum', 'usdt', 'xrp'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  details: { type: Object, default: {} }
});

module.exports = mongoose.model('Transaction', transactionSchema);
