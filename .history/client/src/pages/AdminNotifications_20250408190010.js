// client/src/pages/AdminNotifications.js
import React, { useState } from 'react';
import '../styles/AdminNotifications.css';
import { useNavigate } from 'react-router-dom';

const AdminNotifications = () => {
  const [adminAuth, setAdminAuth] = useState({ username: '', password: '' });
  const [authenticated, setAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationText, setNotificationText] = useState('');
  // Removed error and setError since they were unused
  const navigate = useNavigate();

  const handleLogin = () => {
    setAuthenticated(true);
    // In a real app, fetch notifications via API.
    setNotifications([]);
  };

  const handleAddNotification = () => {
    setNotifications([...notifications, notificationText]);
    setNotificationText('');
  };

  const handleRemoveNotification = (index) => {
    const newNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(newNotifications);
  };

  return (
    <div className="admin-notifications">
      <h2>Manage Notifications</h2>
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
        </div>
      ) : (
        <div className="notifications-form">
          <input
            type="text"
            placeholder="Enter notification"
            value={notificationText}
            onChange={(e) => setNotificationText(e.target.value)}
          />
          <button onClick={handleAddNotification}>Add Notification</button>
          <div className="notifications-list">
            {notifications.map((note, index) => (
              <div key={index} className="notification-item">
                <p>{note}</p>
                <button onClick={() => handleRemoveNotification(index)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}
      <button onClick={() => navigate('/admin')}>Back to Admin Dashboard</button>
    </div>
  );
};

export default AdminNotifications;
