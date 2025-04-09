// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Receive from './pages/Receive';
import Send from './pages/Send';
import Withdraw from './pages/Withdraw';
import Buy from './pages/Buy';
import PaymentPage from './pages/PaymentPage';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Register from './pages/Register';

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
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
