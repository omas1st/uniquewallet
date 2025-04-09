import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Send.css';

const Send = () => {
  const [asset, setAsset] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0 || !recipientAddress.trim()) {
      setError('Please fill all required fields correctly');
      return;
    }
    navigate('/send-payment', { state: { type: 'send', asset, amount } });
  };

  return (
    <div className="container">
      <h2 className="page-title">Send Crypto</h2>
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
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="form-control"
            step="0.00000001"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="recipient">Recipient Address</label>
          <input
            id="recipient"
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="Enter recipient wallet address"
            className="form-control"
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn-primary">
            Verify Transaction
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

export default Send;