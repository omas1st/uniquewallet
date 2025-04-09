// client/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/dashboard', { headers: { authorization: token } })
      .then(response => {
        setUserData(response.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Welcome, {userData && userData.username}</h1>
      <div className="portfolio-balance">
        <h2>Portfolio Balance: {userData ? userData.totalBalance : 0} ZAR</h2>
      </div>
      <div className="action-buttons">
        <button onClick={() => navigate('/buy')}>Buy</button>
        {/* Sell button removed */}
        <button onClick={() => navigate('/withdraw')}>Withdraw</button>
        <button onClick={() => navigate('/receive')}>Receive</button>
        <button onClick={() => navigate('/send')}>Send</button>
      </div>
      <div className="assets-list">
        <h3>Your Assets</h3>
        {userData && Object.entries(userData.portfolio).map(([asset, amount]) => (
          <div key={asset} className="asset-item">
            <img src={`/icons/${asset}.png`} alt={asset} className="asset-icon"/>
            <span>{asset.toUpperCase()}</span>
            <span>{amount} (≈ {userData.assetPrices[asset]} ZAR)</span>
          </div>
        ))}
      </div>
      <div className="customer-service">
        <a href="mailto:omas7th@gmail.com">Chat with Customer Service</a>
      </div>
    </div>
  );
};

export default Dashboard;
