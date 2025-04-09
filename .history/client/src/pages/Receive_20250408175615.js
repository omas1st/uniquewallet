// client/src/pages/Receive.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Receive.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Receive = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedAsset = queryParams.get('asset');
  const [addressName, setAddressName] = useState('');
  const [generatedAddress, setGeneratedAddress] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const handleGenerateAddress = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/transactions/generate-address',
        { asset: selectedAsset, addressName },
        { headers: { authorization: token } }
      );
      setGeneratedAddress(response.data.address);
    } catch (err) {
      setError('Error generating address');
    }
  };

  return (
    <div className="receive-container">
      <h2>Receive {selectedAsset ? selectedAsset.toUpperCase() : 'Asset'}</h2>
      {!generatedAddress ? (
        <>
          <input type="text" placeholder="Enter address name" value={addressName} onChange={e => setAddressName(e.target.value)} />
          <button onClick={handleGenerateAddress}>Create Receive Address</button>
        </>
      ) : (
        <div className="address-display">
          <input type="text" value={generatedAddress} readOnly />
          <button onClick={() => { navigator.clipboard.writeText(generatedAddress); }}>Copy</button>
        </div>
      )}
      {error && <p className="error-msg">{error}</p>}
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default Receive;
