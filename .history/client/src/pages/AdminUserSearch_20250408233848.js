// client/src/pages/AdminUserSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AdminUserSearch.css';
import { useNavigate } from 'react-router-dom';

const AdminUserSearch = () => {
  const [adminAuth, setAdminAuth] = useState({ username: '', password: '' });
  const [authenticated, setAuthenticated] = useState(false);
  const [searchUsername, setSearchUsername] = useState('');
  const [user, setUser] = useState(null);
  const [newPortfolio, setNewPortfolio] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/users`, {
        headers: { username: adminAuth.username, password: adminAuth.password }
      });
      const foundUser = response.data.find(u => u.username === searchUsername);
      if (foundUser) {
        setUser(foundUser);
        setNewPortfolio({...foundUser.portfolio});
      } else {
        setError('User not found');
      }
    } catch (err) {
      setError('Error searching for user');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/user/${user._id}`, {
        portfolio: newPortfolio
      }, {
        headers: { username: adminAuth.username, password: adminAuth.password }
      });
      alert('User portfolio updated successfully');
      setUser({...user, portfolio: newPortfolio});
    } catch (err) {
      setError('Failed to update user portfolio');
    }
  };

  const handleAssetChange = (asset, value) => {
    setNewPortfolio(prev => ({
      ...prev,
      [asset]: value === '' ? 0 : parseFloat(value)
    }));
  };

  const handleAddAsset = () => {
    const newAsset = prompt('Enter new asset symbol (e.g., BTC):');
    if (newAsset) {
      setNewPortfolio(prev => ({
        ...prev,
        [newAsset.toLowerCase()]: 0
      }));
    }
  };

  return (
    <div className="admin-user-search">
      <h2>User Portfolio Management</h2>
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
          <button onClick={handleLogin}>Admin Login</button>
          {error && <p className="error-msg">{error}</p>}
        </div>
      ) : (
        <>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter username to search"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
            />
            <button onClick={handleSearch}>Search User</button>
          </div>
          {user && (
            <div className="user-edit">
              <h3>Editing: {user.username}</h3>
              <div className="portfolio-editor">
                <h4>Asset Management</h4>
                {Object.entries(newPortfolio).map(([asset, amount]) => (
                  <div key={asset} className="asset-edit-item">
                    <label>{asset.toUpperCase()}</label>
                    <div className="input-group">
                      <span className="currency">R</span>
                      <input
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) => handleAssetChange(asset, e.target.value)}
                        placeholder="ZAR Amount"
                      />
                    </div>
                  </div>
                ))}
                <button onClick={handleAddAsset} className="add-asset-btn">
                  + Add New Asset
                </button>
              </div>
              <button onClick={handleUpdate} className="update-btn">
                Save Changes
              </button>
            </div>
          )}
        </>
      )}
      <button className="back-btn" onClick={() => navigate('/admin')}>Back to Dashboard</button>
    </div>
  );
};

export default AdminUserSearch;