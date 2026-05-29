import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { authService } from '../services/authService';
import { demoDataService } from '../services/demoData';
import { AIFeatures } from '../components/items/AIFeatures';

export const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isDemo = authService.isDemoMode();

  const { data: item, refetch, isLoading } = useQuery({
    queryKey: ['item', id],
    queryFn: async () => {
      if (isDemo) {
        return demoDataService.getItem(Number(id));
      }

      const response = await api.get(`/items/${id}`);
      return response.data.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg border border-slate-200">
        <h1 className="text-2xl font-bold mb-2">Item nicht gefunden</h1>
        <p className="text-slate-600">Dieses Item ist nicht mehr verfuegbar.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>

      <div className="bg-gray-50 p-4 rounded mb-6">
        <p className="text-gray-700 whitespace-pre-wrap">{item.content}</p>
      </div>

      <AIFeatures itemId={item.id} onUpdate={refetch} />
    </div>
  );
};
