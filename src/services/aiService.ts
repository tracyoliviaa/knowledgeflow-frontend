
import { api } from './api';

export interface Flashcard {
  question: string;
  answer: string;
}

export interface SummaryResponse {
  summary: string;
  cost: number;
}

export const aiService = {
  async summarizeItem(itemId: number): Promise<SummaryResponse> {
    const response = await api.post('/ai/summarize', { itemId });
    return response.data;
  },

  async generateFlashcards(itemId: number, count: number = 5): Promise<Flashcard[]> {
    const response = await api.post('/ai/generate-flashcards', { itemId, count });
    return response.data.flashcards;
  },

  async suggestTopics(itemId: number): Promise<string[]> {
    const response = await api.post('/ai/suggest-topics', { itemId });
    return response.data.suggestions;
  },

  async extractInsights(itemId: number): Promise<string[]> {
    const response = await api.post('/ai/extract-insights', { itemId });
    return response.data.takeaways;
  },

  async getUsageStats() {
    const response = await api.get('/ai/usage-stats');
    return response.data;
  }
};