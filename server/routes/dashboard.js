// server/routes/dashboard.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();
const secret = process.env.secret_key;

// Middleware to verify token
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

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    // Simulated asset prices in ZAR. Replace with a live API as needed.
    const assetPrices = {
      bitcoin: 1534950,
      ethereum: 29400,
      usdt: 19.93,
      xrp: 36.50,
    };

    let totalBalance = 0;
    for (let asset in user.portfolio) {
      totalBalance += user.portfolio[asset] * (assetPrices[asset] || 0);
    }

    res.json({
      username: user.username,
      portfolio: user.portfolio,
      assetPrices,
      totalBalance
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
