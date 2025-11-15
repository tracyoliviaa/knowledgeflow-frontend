// src/components/learning/InteractiveLearning.tsx

import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  itemId: number;
}

export const InteractiveLearning: React.FC<Props> = ({ itemId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;

    setLoading(true);
    const userMessage = input;
    setInput('');

    try {
      const response = await fetch('/api/learning/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          itemId,
          question: userMessage,
          conversationHistory: messages
        })
      });

      const data = await response.json();
      setMessages(data.conversationHistory);

    } catch (error) {
      console.error('Failed to get answer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-blue-500" />
        Interaktives Lernen
      </h3>

      {/* Chat-Verlauf */}
      <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded ${
              msg.role === 'user'
                ? 'bg-blue-100 ml-8'
                : 'bg-gray-100 mr-8'
            }`}
          >
            <p className="text-sm font-semibold mb-1">
              {msg.role === 'user' ? 'Du' : 'KI-Tutor'}
            </p>
            <p className="text-gray-700">{msg.content}</p>
          </div>
        ))}
        {loading && (
          <div className="bg-gray-100 p-3 rounded mr-8">
            <p className="text-sm text-gray-500 animate-pulse">
              Denke nach...
            </p>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
          placeholder="Stelle eine Frage zum Inhalt..."
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={handleAsk}
          disabled={loading || !input.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};