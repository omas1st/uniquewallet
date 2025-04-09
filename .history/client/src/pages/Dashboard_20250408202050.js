// client/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

// Hardcoded current prices (in ZAR)
const CRYPTO_PRICES = {
  btc: 1540000,
  eth: 29275,
  usdt: 20.21,
  xrp: 36.56
};

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/dashboard', { 
          headers: { authorization: token } 
        });
        
        if (!response.data.portfolio) {
          throw new Error('Invalid data structure from server');
        }

        // Merge server data with local prices
        setUserData({
          ...response.data,
          assetPrices: CRYPTO_PRICES
        });
        setError('');
      } catch (err) {
        setError('Failed to load portfolio data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateTotalBalance = () => {
    if (!userData || !userData.portfolio) return 0;

    return Object.entries(userData.portfolio).reduce((total, [asset, amount]) => {
      const amountNum = Number(amount);
      const priceNum = CRYPTO_PRICES[asset] || 0;
      return total + (amountNum * priceNum);
    }, 0);
  };

  const totalBalance = calculateTotalBalance().toFixed(2);

  if (loading) {
    return <div className="dashboard-loading">Loading Portfolio...</div>;
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome back, {userData?.username || 'User'}</h1>
        <button className="logout-btn" onClick={() => navigate('/logout')}>
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        <section className="balance-card">
          <div className="balance-content">
            <h2>Portfolio Value</h2>
            <div className="balance-amount">
              R {Number(totalBalance).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="balance-subtext">Current Total Valuation</div>
          </div>
        </section>

        <section className="actions-section">
          <button className="action-btn primary" onClick={() => navigate('/buy')}>
            Buy Crypto
          </button>
          <button className="action-btn" onClick={() => navigate('/send')}>
            Send Assets
          </button>
          <button className="action-btn" onClick={() => navigate('/receive')}>
            Receive
          </button>
          <button className="action-btn" onClick={() => navigate('/withdraw')}>
            Withdraw
          </button>
        </section>

        <section className="assets-section">
          <h3 className="section-title">Your Digital Assets</h3>
          <div className="assets-grid">
            {userData?.portfolio && Object.entries(userData.portfolio).map(([asset, amount]) => {
              const price = CRYPTO_PRICES[asset] || 0;
              const value = (Number(amount) * price).toFixed(2);

              return (
                <div key={asset} className="asset-card">
                  <div className="asset-header">
                    <img 
                      src={`/icons/${asset}.png`} 
                      alt={asset} 
                      className="asset-icon" 
                    />
                    <div className="asset-info">
                      <span className="asset-symbol">{asset.toUpperCase()}</span>
                      <span className="asset-name">{getAssetName(asset)}</span>
                    </div>
                  </div>
                  
                  <div className="asset-details">
                    <div className="asset-amount">
                      <span className="label">Holding:</span>
                      <span className="value">{Number(amount).toFixed(4)}</span>
                    </div>
                    <div className="asset-value">
                      <span className="label">Current Value:</span>
                      <span className="value">R {Number(value).toLocaleString('en-ZA')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <footer className="dashboard-footer">
        <p>Need assistance? <a href="mailto:omas7th@gmail.com">Contact Support</a></p>
        <p className="disclaimer">Crypto assets are subject to market risk. Past performance is not indicative of future results.</p>
      </footer>
    </div>
  );
};

// Helper function for asset names
const getAssetName = (symbol) => {
  const names = {
    btc: 'Bitcoin',
    eth: 'Ethereum',
    usdt: 'Tether',
    xrp: 'XRP',
    // Add more mappings as needed
  };
  return names[symbol.toLowerCase()] || 'Crypto Asset';
};

export default Dashboard;