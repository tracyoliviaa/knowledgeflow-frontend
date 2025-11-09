import React from 'react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <nav className="space-y-2">
        <a
          href="/dashboard"
          className="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Dashboard
        </a>
        <a
          href="/items"
          className="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Alle Items
        </a>
        <a
          href="/items/new"
          className="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Neues Item
        </a>
        <a
          href="/search"
          className="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Suche
        </a>
      </nav>
    </aside>
  );
};
