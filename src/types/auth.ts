// src/types/auth.ts
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name?: string;
  email: string;
  password: string;
}