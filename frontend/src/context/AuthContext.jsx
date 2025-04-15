import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("weather_token") || null);

  const login = (newToken) => {
    localStorage.setItem("weather_token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("weather_token");
    setToken(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("weather_token");
    setToken(storedToken || null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
