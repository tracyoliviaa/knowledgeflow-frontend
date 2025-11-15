// src/pages/ItemDetail.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { AIFeatures } from '../components/items/AIFeatures';

export const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: item, refetch } = useQuery({
    queryKey: ['item', id],
    queryFn: async () => {
      const response = await api.get(`/items/${id}`);
      return response.data.data;
    },
  });

  if (!item) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
      
      <div className="bg-gray-50 p-4 rounded mb-6">
        <p className="text-gray-700 whitespace-pre-wrap">{item.content}</p>
      </div>

      {/* KI-Features */}
      <AIFeatures itemId={item.id} onUpdate={refetch} />
    </div>
  );
};