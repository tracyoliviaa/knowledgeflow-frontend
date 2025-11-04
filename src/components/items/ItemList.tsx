// src/components/items/ItemList.tsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import { ItemCard } from './ItemCard';

interface Item {
  id: number;
  title: string;
  content: string;
  type: string;
  createdAt: string;
}

export const ItemList: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const response = await api.get('/items');
      return response.data.data as Item[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        Fehler beim Laden der Items
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};