// client/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const CRYPTO_PRICES = {
  btc: 1541750,
  eth: 29518,
  usdt: 19.98,
  xrp: 36.42
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
    if (!userData?.portfolio) return 0;

    return Object.entries(userData.portfolio).reduce((total, [asset, amount]) => {
      const normalizedAsset = asset.toLowerCase();
      const amountNum = Number(amount);
      const priceNum = CRYPTO_PRICES[normalizedAsset] || 0;
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
              R {Number(totalBalance).toLocaleString('en-ZA', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
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
              const normalizedAsset = asset.toLowerCase();
              const price = CRYPTO_PRICES[normalizedAsset] || 0;
              const value = (Number(amount) * price).toFixed(2); // Fixed line

              return (
                <div key={normalizedAsset} className="asset-card">
                  <div className="asset-header">
                    <img 
                      src={`/icons/${normalizedAsset}.png`} 
                      alt={normalizedAsset} 
                      className="asset-icon" 
                    />
                    <div className="asset-info">
                      <span className="asset-symbol">{normalizedAsset.toUpperCase()}</span>
                      <span className="asset-name">{getAssetName(normalizedAsset)}</span>
                    </div>
                  </div>
                  
                  <div className="asset-details">
                    <div className="asset-amount">
                      <span className="label">Holding:</span>
                      <span className="value">{Number(amount).toFixed(4)}</span>
                    </div>
                    <div className="asset-value">
                      <span className="label">Current Value:</span>
                      <span className="value">
                        R {value.toLocaleString('en-ZA', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </span>
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

const getAssetName = (symbol) => {
  const names = {
    btc: 'Bitcoin',
    eth: 'Ethereum',
    usdt: 'Tether',
    xrp: 'XRP'
  };
  return names[symbol] || 'Crypto Asset';
};

export default Dashboard;