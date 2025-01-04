import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import HomePage from './components/Auth/HomePage';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestRoute><HomePage /></GuestRoute>} />
        <Route path="/signin" element={<GuestRoute><SignIn /></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><SignUp /></GuestRoute>} />
         <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;