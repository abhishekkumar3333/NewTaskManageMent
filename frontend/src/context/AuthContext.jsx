import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); 
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/user/login', { email, password });
      if (response.data.success || response.data.sucess) {
        localStorage.setItem('token', response.data.token);
        setUser({ token: response.data.token });
        return { success: true };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
       console.error("Login error", error);
       return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/user/register', { name, email, password });
      if (response.data.success || response.data.sucess) {
        return { success: true };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
       return { success: false, message: error.response?.data?.message || "Registration failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
