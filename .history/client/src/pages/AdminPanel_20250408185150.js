// client/src/pages/AdminPanel.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-panel">
      <h2>Admin Dashboard</h2>
      <div className="admin-links">
        <button onClick={() => navigate('/admin/users')}>Manage Users</button>
        <button onClick={() => navigate('/admin/search')}>Search/Edit Users</button>
        <button onClick={() => navigate('/admin/bank')}>Edit Banking Details</button>
        <button onClick={() => navigate('/admin/notifications')}>Manage Notifications</button>
      </div>
    </div>
  );
};

export default AdminPanel;
