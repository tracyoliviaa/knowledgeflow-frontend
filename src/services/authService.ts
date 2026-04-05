// src/services/authService.ts → KOMPLETT ersetzen:
import { LoginCredentials, RegisterData } from '../types/auth';
import { api } from './api';

const DEMO_TOKEN = 'demo-token-knowledgeflow';

export interface AuthService {
  login: (credentials: LoginCredentials) => Promise<string>;
  loginAsDemo: () => void;
  isAuthenticated: () => boolean;
  isDemoMode: () => boolean;  // 🆕 TYPE DEFINITION
  logout: () => void;
  register: (data: RegisterData) => Promise<any>;
}

export const authService: AuthService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post('/login', credentials);
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  },

  loginAsDemo() {
    localStorage.setItem('token', DEMO_TOKEN);
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  isDemoMode(): boolean {  // ✅ JETZT EXPORTIERT
    return localStorage.getItem('token') === DEMO_TOKEN;
  },

  logout() {
    localStorage.removeItem('token');
  },

  async register(data: RegisterData) {
    const response = await api.post('/register', data);
    return response.data;
  },
};