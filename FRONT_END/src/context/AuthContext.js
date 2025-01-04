// import React, { createContext, useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom'; 
// export const AuthContext = createContext(); // Ensure this is exported

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   // Login Function
//   const login = async (email, password) => {
//     const response = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include", // Include cookies in request
//       body: JSON.stringify({ email, password }),
//     });

//     if (response.ok) {
//       // Fetch user info after successful login
//       const userInfoResponse = await fetch("http://localhost:5000/api/auth/check-token", {
//         method: "GET",
//         credentials: "include", // Include cookies in request
//       });

//       if (userInfoResponse.ok) {
//         const userData = await userInfoResponse.json();
//         setUser(userData.user);  // Set the user info from backend response
//         return { success: true };
//       } else {
//         return { success: false, message: "Could not fetch user information." };
//       }
//     } else {
//       const errorData = await response.json();
//       return { success: false, message: errorData.message || "Login failed. Please try again." };
//     }
//   };

//   // Logout Function
//   const logout = async () => {
//     await fetch("http://localhost:5000/api/auth/logout", {
//       method: "POST",
//       credentials: "include",
//     });
//     setUser(null); // Clear the user on logout
//   };

//   // Signup Function
//   const signup = async (username, email, password, confirmPassword) => {
//     if (password !== confirmPassword) {
//       return { success: false, message: "Passwords do not match" };
//     }

//     const response = await fetch("http://localhost:5000/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, email, password }),
//     });

//     if (response.ok) {
//       return { success: true, message: "User registered successfully. Please log in." };
//     } else {
//       const errorData = await response.json();
//       return { success: false, message: errorData.message || "Signup failed. Please try again." };
//     }
//   };

//   // Check if token is valid on app load
//   const checkToken = async () => {
//     const response = await fetch("http://localhost:5000/api/auth/check-token", {
//       method: "GET",
//       credentials: "include", // Include cookies in request
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setUser(data.user);
//     } else {
//       setUser(null);  // If token is invalid or expired, clear the user
//     }
//   };

//   useEffect(() => {
//     checkToken();  // Check token when the app loads
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout, signup }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();  // Export AuthContext


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
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
