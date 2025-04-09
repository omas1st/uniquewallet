// client/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from your API (e.g., GET /api/dashboard)
    fetch('http://localhost:5000/api/dashboard', { credentials: 'include' })
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Welcome, {userData && userData.username}</h1>
      <div className="portfolio-balance">
        <h2>Portfolio Balance: {userData && userData.totalBalance} ZAR</h2>
      </div>
      <div className="action-buttons">
        <button onClick={() => window.location.href='/buy'}>
          {/* Icon can be inserted as <img src='...' alt='buy'/> */}
          Buy
        </button>
        <button onClick={() => window.location.href='/sell'}>
          Sell
        </button>
        <button onClick={() => window.location.href='/withdraw'}>
          Withdraw
        </button>
        <button onClick={() => window.location.href='/receive'}>
          Receive
        </button>
        <button onClick={() => window.location.href='/send'}>
          Send
        </button>
      </div>
      <div className="assets-list">
        <h3>Your Assets</h3>
        {userData && Object.entries(userData.portfolio).map(([asset, amount]) => (
          <div key={asset} className="asset-item" onClick={() => {
            // Redirect or show extra buttons if amount > 0.0001
            if(amount > 0.0001) {
              window.location.href=`/asset/${asset}`;
            }
          }}>
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
