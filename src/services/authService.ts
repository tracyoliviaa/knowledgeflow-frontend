// src/services/authService.ts

import { api } from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {}

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post('/login', credentials);
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  },

  async register(data: RegisterData) {
    const response = await api.post('/register', data);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};