// server/routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const dotenv = require('dotenv');

dotenv.config();

const adminAuthMiddleware = (req, res, next) => {
  // Basic admin auth via headers (for demo purposes)
  const { username, password } = req.headers;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Get all users
router.get('/users', adminAuthMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update a user's asset balance
router.put('/user/:id', adminAuthMiddleware, async (req, res) => {
  const { portfolio } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { portfolio },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a user
router.delete('/user/:id', adminAuthMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add notification to a user
router.post('/notify/:id', adminAuthMiddleware, async (req, res) => {
  const { notification } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user.notifications) user.notifications = [];
    user.notifications.push(notification);
    await user.save();
    res.json({ message: 'Notification sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Transfer assets between users
router.post('/transfer', adminAuthMiddleware, async (req, res) => {
  const { senderId, receiverId, asset, amount } = req.body;
  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (sender.portfolio[asset] < amount)
      return res.status(400).json({ message: 'Sender has insufficient funds' });
    sender.portfolio[asset] -= amount;
    receiver.portfolio[asset] += amount;
    await sender.save();
    await receiver.save();
    const transaction = new Transaction({
      user: sender._id,
      type: 'transfer',
      asset,
      amount,
      details: { receiverId }
    });
    await transaction.save();
    res.json({ message: 'Transfer completed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
