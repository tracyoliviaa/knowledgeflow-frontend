// src/components/layout/Header.tsx

import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export const Header: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">KnowledgeFlow</h1>
        
        <nav className="flex items-center gap-4">
          <a href="/dashboard" className="text-gray-600 hover:text-gray-800">
            Dashboard
          </a>
          <a href="/items" className="text-gray-600 hover:text-gray-800">
            Items
          </a>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Ausloggen
          </button>
        </nav>
      </div>
    </header>
  );
};