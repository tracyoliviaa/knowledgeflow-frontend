// src/types/index.ts

export interface User {
  id: number;
  email: string;
}

export interface Item {
  id: number;
  title: string;
  content: string | null;
  url: string | null;
  type: 'article' | 'video' | 'note' | 'email' | 'podcast';
  source: string | null;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export {};