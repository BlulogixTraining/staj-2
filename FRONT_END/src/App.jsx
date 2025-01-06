import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import HomePage from './components/Auth/HomePage';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import Dashboard from './components/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Unauthorized from './components/Unauthorized';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/admin" element={<AdminDashboard />}></Route>
         <Route path="/unauthorized" element={<Unauthorized />}></Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;