// src/components/items/AIFeatures.tsx

import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import { Sparkles, FileText, Tags, Lightbulb } from 'lucide-react';

interface AIFeaturesProps {
  itemId: number;
  onUpdate?: () => void;
}

export const AIFeatures: React.FC<AIFeaturesProps> = ({ itemId, onUpdate }) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const handleSummarize = async () => {
    setLoading('summary');
    setError('');
    try {
      const result = await aiService.summarizeItem(itemId);
      setSummary(result.summary);
      onUpdate?.();
    } catch (err) {
      setError('Zusammenfassung fehlgeschlagen');
    } finally {
      setLoading(null);
    }
  };

  const handleGenerateFlashcards = async () => {
    setLoading('flashcards');
    setError('');
    try {
      const cards = await aiService.generateFlashcards(itemId, 5);
      setFlashcards(cards);
      onUpdate?.();
    } catch (err) {
      setError('Lernkarten-Erstellung fehlgeschlagen');
    } finally {
      setLoading(null);
    }
  };

  const handleSuggestTopics = async () => {
    setLoading('topics');
    setError('');
    try {
      const suggestions = await aiService.suggestTopics(itemId);
      setTopics(suggestions);
    } catch (err) {
      setError('Themen-Vorschläge fehlgeschlagen');
    } finally {
      setLoading(null);
    }
  };

  const handleExtractInsights = async () => {
    setLoading('insights');
    setError('');
    try {
      const takeaways = await aiService.extractInsights(itemId);
      setInsights(takeaways);
    } catch (err) {
      setError('Erkenntnisse-Extraktion fehlgeschlagen');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-purple-500" />
        KI-Assistenz
      </h3>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={handleSummarize}
          disabled={loading !== null}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <FileText className="w-4 h-4" />
          {loading === 'summary' ? 'Lädt...' : 'Zusammenfassen'}
        </button>

        <button
          onClick={handleGenerateFlashcards}
          disabled={loading !== null}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <FileText className="w-4 h-4" />
          {loading === 'flashcards' ? 'Lädt...' : 'Lernkarten'}
        </button>

        <button
          onClick={handleSuggestTopics}
          disabled={loading !== null}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Tags className="w-4 h-4" />
          {loading === 'topics' ? 'Lädt...' : 'Themen-Vorschläge'}
        </button>

        <button
          onClick={handleExtractInsights}
          disabled={loading !== null}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Lightbulb className="w-4 h-4" />
          {loading === 'insights' ? 'Lädt...' : 'Erkenntnisse'}
        </button>
      </div>

      {/* Results */}
      {summary && (
        <div className="mb-4 p-4 bg-blue-50 rounded">
          <h4 className="font-semibold mb-2">Zusammenfassung:</h4>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      {flashcards.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Lernkarten ({flashcards.length}):</h4>
          <div className="space-y-2">
            {flashcards.map((card, index) => (
              <div key={index} className="p-3 bg-green-50 rounded">
                <p className="font-medium text-sm">F: {card.question}</p>
                <p className="text-sm text-gray-600 mt-1">A: {card.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {topics.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Vorgeschlagene Themen:</h4>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {insights.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Wichtigste Erkenntnisse:</h4>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-gray-700">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};