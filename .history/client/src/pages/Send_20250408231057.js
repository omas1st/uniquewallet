// client/src/pages/Send.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Send.css';
import { useNavigate } from 'react-router-dom';

const Send = () => {
  const [asset, setAsset] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');

  const handleSend = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/transactions/send',
        { asset, amount: Number(amount), recipientAddress },
        { headers: { authorization: token } }
      );
      // Redirect to payment page for confirmation
      navigate('/Send', { state: { type: 'send', asset, amount } });
    } catch(err) {
      setError(err.response.data.message || 'Send failed');
    }
  };

  return (
    <div className="send-container">
      <h2>Send Crypto</h2>
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
        <label>Amount</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount" />
      </div>
      <div className="form-group">
        <label>Recipient Address</label>
        <input type="text" value={recipientAddress} onChange={e => setRecipientAddress(e.target.value)} placeholder="Enter recipient address" />
      </div>
      <button onClick={handleSend}>Confirm Send</button>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default Send;
