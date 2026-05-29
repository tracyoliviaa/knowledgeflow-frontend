import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { api } from '../services/api';
import { demoDataService } from '../services/demoData';
import { aiService } from '../services/aiService';
import { Item } from '../types/Item';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSummary, setSearchSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState('');
  const isDemo = authService.isDemoMode();

  const { data: items, isLoading } = useQuery<Item[]>({
    queryKey: ['search', searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return [];

      if (isDemo) {
        return demoDataService.searchItems(searchTerm);
      }

      const response = await api.get(`/items/search?q=${encodeURIComponent(searchTerm)}`);
      return response.data.data;
    },
    enabled: !!searchTerm.trim(),
  });

  const handleSummarize = async () => {
    setSummaryLoading(true);
    setSummaryError('');
    setSearchSummary('');

    if (isDemo) {
      const firstResult = items?.[0];
      if (!firstResult) {
        setSummaryError('Keine passenden Inhalte zum Zusammenfassen gefunden.');
        setSummaryLoading(false);
        return;
      }

      const result = demoDataService.summarizeItem(firstResult.id);
      setSearchSummary(result.summary);
      setSummaryLoading(false);
      return;
    }

    try {
      const firstResult = items?.[0];
      if (!firstResult) {
        setSummaryError('Keine passenden Inhalte zum Zusammenfassen gefunden.');
        return;
      }

      const result = await aiService.summarizeItem(firstResult.id);
      setSearchSummary(result.summary);
    } catch {
      setSummaryError('KI-Zusammenfassung fehlgeschlagen. Bitte pruefe Backend und OpenAI-Key.');
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <h1 className="text-3xl font-bold text-slate-900 flex-1">Suche</h1>
        <p className="text-slate-600 text-sm">Finde Items in deiner Wissensbasis</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-3">
          <input
            type="text"
            placeholder="z.B. React oder TypeScript"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSummarize}
            disabled={!searchTerm.trim() || summaryLoading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {summaryLoading ? 'KI arbeitet...' : 'Zusammenfassen'}
          </button>
        </div>

        {isDemo && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            Demo-Modus: Suche und KI-Zusammenfassung laufen lokal mit Beispieldaten.
          </div>
        )}
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      )}

      {searchTerm.trim() && !isLoading && items && items.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">
              {items.length} Ergebnis{items.length !== 1 ? 'se' : ''} fuer "{searchTerm}"
            </h2>
            <span className="text-sm text-slate-500">Neueste zuerst</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-medium text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 mt-1 line-clamp-2">{item.content}</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                  <span className={`px-2 py-1 rounded-full bg-slate-100 capitalize ${item.type === 'video' ? 'text-blue-600' : item.type === 'article' ? 'text-green-600' : 'text-purple-600'}`}>
                    {item.type}
                  </span>
                  <span>{new Date(item.createdAt).toLocaleDateString('de-DE')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchTerm.trim() && items?.length === 0 && !isLoading && (
        <div className="text-center py-16 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
          <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-medium text-slate-900 mb-2">Keine Ergebnisse</h3>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">
            Keine Items gefunden fuer "<strong>{searchTerm}</strong>". Versuche andere Begriffe.
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition font-medium"
          >
            Suche zuruecksetzen
          </button>
        </div>
      )}

      {summaryError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {summaryError}
        </div>
      )}

      {searchSummary && searchTerm.trim() && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-slate-900 mb-3">KI-Zusammenfassung</h3>
          <p className="text-slate-700 leading-relaxed">
            {searchSummary}
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
