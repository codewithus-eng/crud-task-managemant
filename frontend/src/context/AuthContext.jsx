import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = async (email, password) => {
    const res = await client.post('/auth/login', { email, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    setUser(user);
    return user;
  };

  const register = async (payload) => {
    const res = await client.post('/auth/register', payload);
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}
