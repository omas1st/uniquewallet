import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Buy.css';

const Buy = () => {
  const [asset, setAsset] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    navigate('/payment', { state: { asset, amount } });
  };

  return (
    <div className="container">
      <h2 className="page-title">Buy Crypto</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-msg">{error}</div>}

        <div className="form-group">
          <label htmlFor="asset">Select Asset</label>
          <select 
            id="asset"
            value={asset} 
            onChange={(e) => setAsset(e.target.value)}
            className="form-control"
          >
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="usdt">USDT</option>
            <option value="xrp">XRP</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount to Buy</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in crypto units"
            className="form-control"
            step="0.00000001"
            min="0"
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn-primary">
            Continue to Payment
          </button>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Buy;