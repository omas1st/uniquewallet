// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Receive from './pages/Receive';
import Send from './pages/Send';
import Withdraw from './pages/Withdraw';
import Buy from './pages/Buy';
import PaymentPage from './pages/PaymentPage';
import WithdrawPaymentPage from './pages/WithdrawPaymentPage';
import SendPaymentPage from './pages/SendPaymentPage';
import AdminPanel from './pages/AdminPanel';
import AdminUsers from './pages/AdminUsers';
import AdminUserSearch from './pages/AdminUserSearch';
import AdminBankDetails from './pages/AdminBankDetails';
import AdminNotifications from './pages/AdminNotifications';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/receive" element={<Receive />} />
        <Route path="/send" element={<Send />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/withdraw-payment" element={<WithdrawPaymentPage />} />
        <Route path="/send-payment" element={<SendPaymentPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/search" element={<AdminUserSearch />} />
        <Route path="/admin/bank" element={<AdminBankDetails />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
      </Routes>
    </Router>
  );
}

export default App;
