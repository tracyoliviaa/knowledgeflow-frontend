// src/hooks/useItems.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

interface Item {
  id: number;
  title: string;
  content: string | null;
  url: string | null;
  type: string;
  createdAt: string;
}

export const useItems = () => {
  const queryClient = useQueryClient();

  const { data: items, isLoading, error } = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const response = await api.get('/items');
      return response.data.data as Item[];
    },
  });

  const createItem = useMutation({
    mutationFn: async (data: Partial<Item>) => {
      const response = await api.post('/items', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  const deleteItem = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/items/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  return {
    items,
    isLoading,
    error,
    createItem,
    deleteItem,
  };
};