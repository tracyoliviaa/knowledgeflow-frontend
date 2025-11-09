// src/components/items/ItemCard.tsx

import React from 'react';

interface Item {
  id: number;
  title: string;
  content: string;
  type: string;
  createdAt: string;
}

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      article: 'bg-blue-100 text-blue-800',
      video: 'bg-red-100 text-red-800',
      note: 'bg-green-100 text-green-800',
      email: 'bg-yellow-100 text-yellow-800',
      podcast: 'bg-purple-100 text-purple-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
        <span className={`px-2 py-1 rounded text-xs ${getTypeColor(item.type)}`}>
          {item.type}
        </span>
      </div>
      
      {item.content && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {item.content}
        </p>
      )}
      
      <div className="text-xs text-gray-500">
        {new Date(item.createdAt).toLocaleDateString('de-DE')}
      </div>
    </div>
  );
};