// client/src/pages/AdminPanel.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [adminAuth, setAdminAuth] = useState({ username: '', password: '' });
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { username: adminAuth.username, password: adminAuth.password }
      });
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  const handleLogin = () => {
    // For demonstration, assume credentials are valid.
    setAuthenticated(true);
    fetchUsers();
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      {!authenticated ? (
        <div className="admin-login">
          <input
            type="text"
            placeholder="Admin Username"
            value={adminAuth.username}
            onChange={(e) =>
              setAdminAuth({ ...adminAuth, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={adminAuth.password}
            onChange={(e) =>
              setAdminAuth({ ...adminAuth, password: e.target.value })
            }
          />
          <button onClick={handleLogin}>Login as Admin</button>
          {error && <p className="error-msg">{error}</p>}
        </div>
      ) : (
        <div className="users-list">
          <h3>Registered Users</h3>
          {users.map((user) => (
            <div key={user._id} className="user-item">
              <p><strong>{user.username}</strong></p>
              <p>Portfolio: {JSON.stringify(user.portfolio)}</p>
              <p>Unique Addresses: {JSON.stringify(user.uniqueAddresses)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
