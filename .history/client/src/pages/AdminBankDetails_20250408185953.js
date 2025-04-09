// client/src/pages/AdminBankDetails.js
import React, { useState } from 'react';
import '../styles/AdminBankDetails.css';
import { useNavigate } from 'react-router-dom';

const AdminBankDetails = () => {
  const [adminAuth, setAdminAuth] = useState({ username: '', password: '' });
  const [authenticated, setAuthenticated] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    bankName: "FNB BANK",
    beneficiaryName: "Mama pty",
    reference: "0672626266",
    accountNumber: "62509963139",
    paymentType: "Immediate Payment (Just Once)"
  });
  // Removed error and setError since they were unused
  const navigate = useNavigate();

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleUpdate = () => {
    // Simulate update (in a real app, call an API endpoint to update global banking settings)
    alert('Banking details updated successfully (simulation)');
  };

  return (
    <div className="admin-bank-details">
      <h2>Edit Banking Details</h2>
      {!authenticated ? (
        <div className="admin-login">
          <input
            type="text"
            placeholder="Admin Username"
            value={adminAuth.username}
            onChange={(e) => setAdminAuth({ ...adminAuth, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={adminAuth.password}
            onChange={(e) => setAdminAuth({ ...adminAuth, password: e.target.value })}
          />
          <button onClick={handleLogin}>Login as Admin</button>
        </div>
      ) : (
        <div className="bank-details-form">
          <label>Bank Name</label>
          <input
            type="text"
            value={bankDetails.bankName}
            onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
          />
          <label>Beneficiary Name</label>
          <input
            type="text"
            value={bankDetails.beneficiaryName}
            onChange={(e) => setBankDetails({ ...bankDetails, beneficiaryName: e.target.value })}
          />
          <label>Beneficiary Reference</label>
          <input
            type="text"
            value={bankDetails.reference}
            onChange={(e) => setBankDetails({ ...bankDetails, reference: e.target.value })}
          />
          <label>Account Number</label>
          <input
            type="text"
            value={bankDetails.accountNumber}
            onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
          />
          <label>Payment Type</label>
          <input
            type="text"
            value={bankDetails.paymentType}
            onChange={(e) => setBankDetails({ ...bankDetails, paymentType: e.target.value })}
          />
          <button onClick={handleUpdate}>Update Banking Details</button>
        </div>
      )}
      <button onClick={() => navigate('/admin')}>Back to Admin Dashboard</button>
    </div>
  );
};

export default AdminBankDetails;
