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
    axios
      .get('http://localhost:5000/api/dashboard', { headers: { authorization: token } })
      .then(response => {
        setUserData(response.data);
      })
      .catch(err => console.error(err));
  }, []);

  const calculateTotalBalance = () => {
    if (!userData || !userData.portfolio || !userData.assetPrices) return 0;
    
    return Object.entries(userData.portfolio).reduce((total, [asset, amount]) => {
      const price = userData.assetPrices[asset] || 0;
      return total + (parseFloat(amount) * parseFloat(price));
    }, 0);
  };

  const totalBalance = calculateTotalBalance();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {userData ? userData.username : 'User'}</h1>
      </header>
      <section className="balance-section">
        <h2>Portfolio Balance: R {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
      </section>
      <section className="actions-section">
        <button onClick={() => navigate('/buy')}>Buy</button>
        <button onClick={() => navigate('/withdraw')}>Withdraw</button>
        <button onClick={() => navigate('/receive')}>Receive</button>
        <button onClick={() => navigate('/send')}>Send</button>
      </section>
      <section className="assets-section">
        <h3>Your Assets</h3>
        {userData &&
          userData.portfolio &&
          Object.entries(userData.portfolio).map(([asset, amount]) => (
            <div key={asset} className="asset-item">
              <img src={`/icons/${asset}.png`} alt={asset} className="asset-icon" />
              <span className="asset-name">{asset.toUpperCase()}</span>
              <span className="asset-amount">
                {parseFloat(amount).toFixed(4)}
              </span>
            </div>
          ))}
      </section>
      <footer className="dashboard-footer">
        <a href="mailto:omas7th@gmail.com">Chat with Customer Service</a>
      </footer>
    </div>
  );
};

export default Dashboard;