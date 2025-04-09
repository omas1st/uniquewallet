// client/src/pages/Buy.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Buy.css';
import { useNavigate } from 'react-router-dom';

const Buy = () => {
  const [asset, setAsset] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleBuy = async () => {
    try {
      const paymentDetails = { note: 'Buy crypto payment' };
      await axios.post(
        'http://localhost:5000/api/transactions/buy',
        { asset, amount: Number(amount), paymentDetails },
        { headers: { authorization: token } }
      );
      navigate('/payment', { state: { type: 'buy', asset, amount } });
    } catch(err) {
      setError(err.response.data.message || 'Buy failed');
    }
  };

  return (
    <div className="buy-container">
      <h2>Buy Crypto</h2>
      {error && <p className="error-msg">{error}</p>}
      <div className="form-group">
        <label>Select Asset</label>
        <select value={asset} onChange={e => setAsset(e.target.value)}>
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="usdt">USDT</option>
          <option value="xrp">XRP</option>
        </select>
      </div>
      <div className="form-group">
        <label>Amount to Buy</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount" />
      </div>
      <button onClick={handleBuy}>Confirm Buy</button>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default Buy;
