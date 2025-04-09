// client/src/pages/PaymentPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  // Destructure the values from location.state; asset and amount are now used to display details
  const { type, asset, amount } = location.state || {};
  const [error, setError] = useState('');

  // Hardcoded bank details per requirements.
  const bankDetails = {
    bankName: "FNB BANK",
    beneficiaryName: "Mama pty",
    reference: "0672626266",
    accountNumber: "62509963139",
    paymentType: "Immediate Payment (Just Once)"
  };

  const handleConfirmPayment = () => {
    // For demonstration, we simulate a failed payment confirmation.
    setError('Payment failed, please try again.');
  };

  return (
    <div className="payment-container">
      <h2>{type ? type.charAt(0).toUpperCase() + type.slice(1) : ''} Payment Confirmation</h2>
      {asset && amount && (
        <div className="transaction-summary">
          <p><strong>Asset:</strong> {asset.toUpperCase()}</p>
          <p><strong>Amount:</strong> {amount}</p>
        </div>
      )}
      <div className="bank-details">
        <p><strong>Bank:</strong> {bankDetails.bankName}</p>
        <p><strong>Beneficiary Name:</strong> {bankDetails.beneficiaryName}</p>
        <p><strong>Beneficiary Reference (Our Reference):</strong> {bankDetails.reference}</p>
        <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
        <p><strong>Payment Type:</strong> {bankDetails.paymentType}</p>
        <p>
          <strong>Note:</strong> Don't forget to add the “{bankDetails.reference}” as reference when you are making the payment or else your payment won’t be processed.
        </p>
      </div>
      <div className="payment-confirmation">
        <input type="checkbox" id="confirmPayment" />
        <label htmlFor="confirmPayment">I confirm that I have sent the required payment.</label>
      </div>
      <button onClick={handleConfirmPayment}>Confirm Payment</button>
      {error && <p className="error-msg">{error}</p>}
      <button onClick={() => window.location.href='/dashboard'}>Back to Dashboard</button>
    </div>
  );
};

export default PaymentPage;
