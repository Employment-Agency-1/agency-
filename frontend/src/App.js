

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import CompanyPage from './pages/CompanyPage';
import ProfilePage from './pages/ProfilePage';
import AddProfile from './pages/AddProfile'
import AllUsers from './pages/AllUsers';
import Home from './pages/Home';
import ApplyList from './pages/ApplyList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/allusers" element={<AllUsers />} />
          <Route path="/add-profile" element={<AddProfile />} />
          <Route path="/applylist" element={<ApplyList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
