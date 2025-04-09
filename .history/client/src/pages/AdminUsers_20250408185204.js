// client/src/pages/AdminUsers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminUsers.css';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [adminAuth, setAdminAuth] = useState({ username: '', password: '' });
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    setAuthenticated(true);
    fetchUsers();
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/user/${userId}`, {
        headers: { username: adminAuth.username, password: adminAuth.password }
      });
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="admin-users">
      <h2>Manage Users</h2>
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
          {error && <p className="error-msg">{error}</p>}
        </div>
      ) : (
        <div className="users-list">
          {users.map((user) => (
            <div key={user._id} className="user-item">
              <p><strong>{user.username}</strong></p>
              <p>Portfolio: {JSON.stringify(user.portfolio)}</p>
              <p>Unique Addresses: {JSON.stringify(user.uniqueAddresses)}</p>
              <button onClick={() => handleDelete(user._id)}>Delete User</button>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => navigate('/admin')}>Back to Admin Dashboard</button>
    </div>
  );
};

export default AdminUsers;
