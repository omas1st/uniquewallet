// client/src/pages/Withdraw.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Withdraw.css';
import { useNavigate } from 'react-router-dom';

const Withdraw = () => {
  const [asset, setAsset] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('FNB BANK');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleWithdraw = async () => {
    try {
      const bankDetails = { bankName, accountNumber, accountName, reference };
      await axios.post(
        'http://localhost:5000/api/transactions/withdraw',
        { asset, amount: Number(amount), bankDetails },
        { headers: { authorization: token } }
      );
      navigate('/withdraw-payment', { state: { type: 'withdraw', asset, amount } });
    } catch(err) {
      setError(err.response.data.message || 'Withdrawal failed');
    }
  };

  return (
    <div className="withdraw-container">
      <h2>Withdraw Crypto</h2>
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
        <label>Bank Name</label>
        <select value={bankName} onChange={e => setBankName(e.target.value)}>
          <option value="Standard Bank">Standard Bank</option>
          <option value="Absa">Absa</option>
          <option value="FNB BANK">FNB BANK</option>
          <option value="Nedbank">Nedbank</option>
          <option value="Capitec">Capitec</option>
          <option value="Nedbank Group">Nedbank Group</option>
          <option value="Investec Ltd">Investec Ltd</option>
          <option value="Bidvest Group">Bidvest Group</option>
          <option value="African Bank Holdings">African Bank Holdings</option>
          <option value="Sasfin Bank">Sasfin Bank</option>
          <option value="Albaraka Bank Lt">Albaraka Bank Lt</option>
        </select>
      </div>
      <div className="form-group">
        <label>Account Number</label>
        <input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} placeholder="Enter account number" />
      </div>
      <div className="form-group">
        <label>Account Name</label>
        <input type="text" value={accountName} onChange={e => setAccountName(e.target.value)} placeholder="Enter account name" />
      </div>
      <div className="form-group">
        <label>Reference (optional)</label>
        <input type="text" value={reference} onChange={e => setReference(e.target.value)} placeholder="Enter reference" />
      </div>
      <button onClick={handleWithdraw}>Confirm Withdrawal</button>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default Withdraw;
