// src/hooks/useAuth.ts

import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated()
  );

  useEffect(() => {
    // Check authentication status on mount
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const login = async (email: string, password: string) => {
    await authService.login({ email, password });
    setIsAuthenticated(true);
  };

  const register = async (email: string, password: string) => {
    await authService.register({ email, password });
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return { isAuthenticated, login, register, logout };
};