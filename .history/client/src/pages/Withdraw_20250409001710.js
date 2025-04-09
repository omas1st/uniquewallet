import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Withdraw.css';

const Withdraw = () => {
  const [asset, setAsset] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('FNB BANK');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [reference, setReference] = useState(''); // Added missing state
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0 || !accountNumber.trim() || !accountName.trim()) {
      setError('Please fill all required fields correctly');
      return;
    }
    navigate('/withdraw-payment', { state: { type: 'withdraw', asset, amount } });
  };

  return (
    <div className="container">
      <h2 className="page-title">Withdraw Crypto</h2>
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
            placeholder="Enter withdrawal amount"
            className="form-control"
            step="0.00000001"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bank">Bank Name</label>
          <select
            id="bank"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="form-control"
          >
            <option value="Standard Bank">Standard Bank</option>
            <option value="Absa">Absa</option>
            <option value="FNB BANK">FNB BANK</option>
            <option value="Nedbank">Nedbank</option>
            <option value="Capitec">Capitec</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="accountNumber">Account Number</label>
          <input
            id="accountNumber"
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter account number"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="accountName">Account Holder Name</label>
          <input
            id="accountName"
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Enter account holder name"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reference">Reference (Optional)</label>
          <input
            id="reference"
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Add payment reference"
            className="form-control"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn-primary">
            Review Withdrawal
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

export default Withdraw;