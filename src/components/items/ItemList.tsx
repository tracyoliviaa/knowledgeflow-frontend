// src/components/items/ItemList.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import { authService } from '../../services/authService';
import { ItemCard } from './ItemCard';

export interface Item {
  id: number;
  title: string;
  content: string;
  type: 'article' | 'note' | 'video';
  createdAt: string;
}

// 🟢 Demo Daten (6 Items)
const DEMO_ITEMS: Item[] = [
  { 
    id: 1, 
    title: 'React Best Practices', 
    content: 'Komponenten klein halten, Props klar definieren, useEffect richtig nutzen...', 
    type: 'article', 
    createdAt: '2026-04-01' 
  },
  { 
    id: 2, 
    title: 'TypeScript Grundlagen', 
    content: 'Interfaces, Generics, Union Types, Type Guards...', 
    type: 'note', 
    createdAt: '2026-04-02' 
  },
  { 
    id: 3, 
    title: 'Node.js REST API Tutorial', 
    content: 'Express Setup, Routen definieren, Middleware, Error Handling...', 
    type: 'video', 
    createdAt: '2026-04-03' 
  },
  { 
    id: 4, 
    title: 'SQLite vs PostgreSQL', 
    content: 'SQLite für lokale Projekte, Postgres für Produktion, Migration...', 
    type: 'article', 
    createdAt: '2026-04-04' 
  },
  { 
    id: 5, 
    title: 'CSS Grid Masterclass', 
    content: 'Grid-Template-Areas, Auto-Flow, Responsive Layouts...', 
    type: 'video', 
    createdAt: '2026-04-05' 
  },
  { 
    id: 6, 
    title: 'Investing Basics', 
    content: 'ETFs, Diversifikation, Sparrate, Compound Interest...', 
    type: 'note', 
    createdAt: '2026-04-05' 
  },
];

interface ItemListProps {
  filter?: string;  // 'all' | 'article' | 'video' | 'note'
}

export const ItemList: React.FC<ItemListProps> = ({ filter = 'all' }) => {
  const isDemo = authService.isDemoMode();

  const { data, isLoading, error } = useQuery<Item[]>({
    queryKey: ['items', filter],  // Filter in Cache Key
    queryFn: async () => {
      if (isDemo) {
        // 🟢 Demo: Filter lokal
        let filteredItems = DEMO_ITEMS;
        if (filter !== 'all') {
          filteredItems = filteredItems.filter(item => item.type === filter);
        }
        return filteredItems;
      }
      
      // 🔴 Real API
      const response = await api.get(`/items?type=${filter}`);
      return response.data.data as Item[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <span>Fehler beim Laden der Items</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Noch keine Items</h3>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          Erstelle dein erstes Item, um deine Wissenssammlung zu starten!
        </p>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Erstes Item erstellen
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* 🟢 Demo Banner */}
      {isDemo && (
        <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          🎭 Demo-Modus: {data.length} Beispiel-Items geladen ({filter})
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item: Item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};