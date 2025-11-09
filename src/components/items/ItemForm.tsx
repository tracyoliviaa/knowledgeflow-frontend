// src/components/items/ItemForm.tsx

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';

interface ItemFormProps {
  onSuccess?: () => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('note');
  const [url, setUrl] = useState('');
  
  const queryClient = useQueryClient();

  const createItemMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post('/items', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      setTitle('');
      setContent('');
      setUrl('');
      setType('note');
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createItemMutation.mutate({
      title,
      content,
      type,
      url: url || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Neues Item erstellen</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Titel</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Typ</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="note">Notiz</option>
          <option value="article">Artikel</option>
          <option value="video">Video</option>
          <option value="email">E-Mail</option>
          <option value="podcast">Podcast</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">URL (optional)</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Inhalt</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
        />
      </div>

      <button
        type="submit"
        disabled={createItemMutation.isPending}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:bg-gray-400"
      >
        {createItemMutation.isPending ? 'Wird erstellt...' : 'Erstellen'}
      </button>

      {createItemMutation.isError && (
        <div className="mt-4 bg-red-100 text-red-700 p-3 rounded">
          Fehler beim Erstellen des Items
        </div>
      )}
    </form>
  );
};