import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { aiService } from '../../services/aiService';

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
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const result = await aiService.summarizeItem(item.id);
      setSummary(result.summary);
    } catch (error) {
      console.error('Summarization failed:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="flex justify-between items-start gap-3 mb-2">
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

      {summary && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-3">
          <p className="text-sm font-semibold text-blue-900 mb-1">KI-Zusammenfassung</p>
          <p className="text-sm text-blue-800">{summary}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={handleSummarize}
          disabled={loading}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 disabled:bg-gray-400 transition"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Laedt...
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Zusammenfassen
            </>
          )}
        </button>
        <Link
          to={`/items/${item.id}`}
          className="flex items-center px-3 py-1.5 bg-slate-100 text-slate-700 text-xs rounded hover:bg-slate-200 transition"
        >
          KI-Details
        </Link>
      </div>

      <div className="text-xs text-gray-500">
        {new Date(item.createdAt).toLocaleDateString('de-DE')}
      </div>
    </div>
  );
};
