// server/routes/transactions.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const dotenv = require('dotenv');

dotenv.config();
const secret = process.env.secret_key;

// Middleware for authentication
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token)
    return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
};

// Generate or return a unique receive address for a given asset
router.post('/generate-address', authMiddleware, async (req, res) => {
  const { asset, addressName } = req.body;
  if (!asset)
    return res.status(400).json({ message: 'Asset is required' });
  try {
    const user = await User.findById(req.userId);
    if (user.uniqueAddresses[asset]) {
      return res.json({ address: user.uniqueAddresses[asset] });
    }
    // Generate a unique address (using crypto for simulation)
    const generatedAddress = crypto.randomBytes(20).toString('hex');
    user.uniqueAddresses[asset] = generatedAddress;
    await user.save();
    res.json({ address: generatedAddress });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Endpoint for sending crypto
router.post('/send', authMiddleware, async (req, res) => {
  const { asset, amount, recipientAddress } = req.body;
  if (!asset || !amount || !recipientAddress)
    return res.status(400).json({ message: 'Missing fields' });
  try {
    const user = await User.findById(req.userId);
    if (user.portfolio[asset] < amount) {
      return res.status(400).json({
        message: `Insufficient ${asset} balance`,
        maxAmount: user.portfolio[asset]
      });
    }
    user.portfolio[asset] -= amount;
    const transaction = new Transaction({
      user: user._id,
      type: 'send',
      asset,
      amount,
      details: { recipientAddress }
    });
    await transaction.save();
    user.transactions.push(transaction._id);
    await user.save();
    res.json({
      message: 'Send transaction initiated. Please proceed with payment confirmation.'
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Withdrawal endpoint
router.post('/withdraw', authMiddleware, async (req, res) => {
  const { asset, amount, bankDetails } = req.body;
  if (!asset || !amount || !bankDetails)
    return res.status(400).json({ message: 'Missing fields' });
  try {
    const user = await User.findById(req.userId);
    if (user.portfolio[asset] < amount) {
      return res.status(400).json({
        message: `Insufficient ${asset} balance`,
        maxAmount: user.portfolio[asset]
      });
    }
    user.portfolio[asset] -= amount;
    const transaction = new Transaction({
      user: user._id,
      type: 'withdraw',
      asset,
      amount,
      details: { bankDetails }
    });
    await transaction.save();
    user.transactions.push(transaction._id);
    await user.save();
    res.json({
      message: 'Withdrawal initiated. Please proceed with payment confirmation.'
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Buy endpoint
router.post('/buy', authMiddleware, async (req, res) => {
  const { asset, amount, paymentDetails } = req.body;
  if (!asset || !amount || !paymentDetails)
    return res.status(400).json({ message: 'Missing fields' });
  try {
    const user = await User.findById(req.userId);
    user.portfolio[asset] += amount;
    const transaction = new Transaction({
      user: user._id,
      type: 'buy',
      asset,
      amount,
      details: { paymentDetails }
    });
    await transaction.save();
    user.transactions.push(transaction._id);
    await user.save();
    res.json({
      message: 'Buy transaction initiated. Please proceed with payment confirmation.'
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Sell endpoint (works similarly to withdrawal)
router.post('/sell', authMiddleware, async (req, res) => {
  const { asset, amount, bankDetails } = req.body;
  if (!asset || !amount || !bankDetails)
    return res.status(400).json({ message: 'Missing fields' });
  try {
    const user = await User.findById(req.userId);
    if (user.portfolio[asset] < amount) {
      return res.status(400).json({
        message: `Insufficient ${asset} balance`,
        maxAmount: user.portfolio[asset]
      });
    }
    user.portfolio[asset] -= amount;
    const transaction = new Transaction({
      user: user._id,
      type: 'sell',
      asset,
      amount,
      details: { bankDetails }
    });
    await transaction.save();
    user.transactions.push(transaction._id);
    await user.save();
    res.json({
      message: 'Sell transaction initiated. Please proceed with payment confirmation.'
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
