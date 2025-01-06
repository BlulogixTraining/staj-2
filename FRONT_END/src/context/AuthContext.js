import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const userInfoResponse = await fetch("http://localhost:5000/api/auth/check-token", {
        method: "GET",
        credentials: "include",
      });

      if (userInfoResponse.ok) {
        const userData = await userInfoResponse.json();
        setUser(userData.user);
        return { success: true };
      } else {
        return { success: false, message: "Could not fetch user information." };
      }
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Login failed. Please try again." };
    }
  };

  const signup = async (username, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    }

    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      return { success: true, message: "User registered successfully. Please log in." };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Signup failed. Please try again." };
    }
  };

  const logout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  const checkToken = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:5000/api/auth/check-token", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
