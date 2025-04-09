// client/src/pages/PaymentPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Only extract asset and amount from location.state
  const { asset, amount } = location.state || {};
  const [error, setError] = useState('');

  const bankDetails = {
    bankName: "FNB BANK",
    beneficiaryName: "Mama pty",
    reference: "0672626266",
    accountNumber: "62509963139",
    paymentType: "Immediate Payment (Just Once)"
  };

  const handleConfirmPayment = () => {
    // Simulate a failed payment confirmation for demonstration purposes
    setError('Payment failed, please try again.');
  };

  return (
    <div className="payment-container">
      {/* Section 1: Payment Summary */}
      <div className="payment-section summary-section">
        <h3>Payment Summary</h3>
        {asset && amount && (
          <div>
            <p><strong>Asset:</strong> {asset.toUpperCase()}</p>
            <p><strong>Amount:</strong> {amount}</p>
          </div>
        )}
      </div>
      {/* Section 2: Banking Details */}
      <div className="payment-section bank-details">
        <h3>Banking Details</h3>
        <p><strong>Bank:</strong> {bankDetails.bankName}</p>
        <p><strong>Beneficiary Name:</strong> {bankDetails.beneficiaryName}</p>
        <p><strong>Beneficiary Reference:</strong> {bankDetails.reference}</p>
        <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
        <p><strong>Payment Type:</strong> {bankDetails.paymentType}</p>
        <p>
          <strong>Note:</strong> Don't forget to add the “{bankDetails.reference}” as reference when making the payment.
        </p>
      </div>
      {/* Section 3: Confirmation Checkbox */}
      <div className="payment-section confirmation-section">
        <input 
          type="checkbox" 
          id="confirmPayment" 
        />
        <label htmlFor="confirmPayment">I confirm that I have sent the required payment.</label>
      </div>
      {/* Section 4: Confirm Payment Button */}
      <div className="payment-section button-section">
        <button onClick={handleConfirmPayment}>Confirm Payment</button>
      </div>
      {/* Section 5: Message Display */}
      <div className="payment-section message-section">
        {error && <p className="error-msg">{error}</p>}
      </div>
      <button className="back-button" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default PaymentPage;
