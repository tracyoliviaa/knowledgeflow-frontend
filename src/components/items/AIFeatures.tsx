import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import { Sparkles, FileText, Tags, Lightbulb, PanelsTopLeft } from 'lucide-react';

interface AIFeaturesProps {
  itemId: number;
  onUpdate?: () => void;
}

const aiActions = [
  {
    id: 'summary',
    label: 'Zusammenfassen',
    purpose: 'Nutzt KI, um lange Inhalte schnell lesbar zu machen.',
    icon: FileText,
    className: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    id: 'flashcards',
    label: 'Lernkarten',
    purpose: 'Erstellt Fragen und Antworten zum Wiederholen.',
    icon: PanelsTopLeft,
    className: 'bg-green-600 hover:bg-green-700',
  },
  {
    id: 'topics',
    label: 'Themen',
    purpose: 'Schlaegt Tags und Kategorien fuer bessere Ordnung vor.',
    icon: Tags,
    className: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    id: 'insights',
    label: 'Insights',
    purpose: 'Extrahiert zentrale Aussagen und naechste Lernpunkte.',
    icon: Lightbulb,
    className: 'bg-orange-600 hover:bg-orange-700',
  },
];

export const AIFeatures: React.FC<AIFeaturesProps> = ({ itemId, onUpdate }) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const runAction = async (actionId: string) => {
    setLoading(actionId);
    setError('');

    try {
      if (actionId === 'summary') {
        const result = await aiService.summarizeItem(itemId);
        setSummary(result.summary);
        onUpdate?.();
      }

      if (actionId === 'flashcards') {
        const cards = await aiService.generateFlashcards(itemId, 5);
        setFlashcards(cards);
        onUpdate?.();
      }

      if (actionId === 'topics') {
        const suggestions = await aiService.suggestTopics(itemId);
        setTopics(suggestions);
      }

      if (actionId === 'insights') {
        const takeaways = await aiService.extractInsights(itemId);
        setInsights(takeaways);
      }
    } catch (err) {
      setError('KI-Aktion fehlgeschlagen. Bitte pruefe Backend, Login und OpenAI-Konfiguration.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            KI-Assistenz
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Diese Aktionen organisieren dein Item automatisch und machen den Inhalt schneller nutzbar.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {aiActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => runAction(action.id)}
              disabled={loading !== null}
              className={`text-left text-white rounded-lg p-4 disabled:opacity-50 disabled:cursor-not-allowed transition ${action.className}`}
            >
              <div className="flex items-center gap-2 font-semibold mb-1">
                <Icon className="w-4 h-4" />
                {loading === action.id ? 'Laedt...' : action.label}
              </div>
              <p className="text-xs text-white/85 leading-relaxed">{action.purpose}</p>
            </button>
          );
        })}
      </div>

      {summary && (
        <div className="mb-4 p-4 bg-blue-50 rounded border border-blue-100">
          <h4 className="font-semibold mb-2">Zusammenfassung</h4>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      {flashcards.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Lernkarten ({flashcards.length})</h4>
          <div className="space-y-2">
            {flashcards.map((card, index) => (
              <div key={index} className="p-3 bg-green-50 rounded border border-green-100">
                <p className="font-medium text-sm">F: {card.question}</p>
                <p className="text-sm text-gray-600 mt-1">A: {card.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {topics.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Vorgeschlagene Themen</h4>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {insights.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Wichtigste Erkenntnisse</h4>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">-</span>
                <span className="text-gray-700">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
