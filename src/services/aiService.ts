// src/services/aiService.ts

import { api } from './api';
import { authService } from './authService';
import { demoDataService } from './demoData';

export interface SummaryResponse {
  summary: string;
}

export interface Flashcard {
  question: string;
  answer: string;
}

export interface UsageStats {
  current_month: {
    total_cost: number;
    operations: Array<{
      operation: string;
      count: string;
      cost: string;
    }>;
  };
  all_time: {
    total_requests: number;
    total_input_tokens: number;
    total_output_tokens: number;
    total_tokens: number;
    total_cost: number;
  };
}

class AIService {
  /**
   * Summarizes an item's content
   */
  async summarizeItem(itemId: number): Promise<SummaryResponse> {
    if (authService.isDemoMode()) {
      return demoDataService.summarizeItem(itemId);
    }

    const response = await api.post(`/ai/summarize/${itemId}`);
    return response.data;
  }

  /**
   * Generates flashcards from an item
   */
  async generateFlashcards(itemId: number, count: number = 5): Promise<Flashcard[]> {
    if (authService.isDemoMode()) {
      return demoDataService.generateFlashcards(itemId, count);
    }

    const response = await api.post(`/ai/flashcards/${itemId}`, { count });
    return response.data.flashcards || [];
  }

  /**
   * Suggests topics for an item
   */
  async suggestTopics(itemId: number): Promise<string[]> {
    if (authService.isDemoMode()) {
      return demoDataService.suggestTopics(itemId);
    }

    const response = await api.post(`/ai/topics/${itemId}`);
    return response.data.topics || [];
  }

  /**
   * Extracts key insights from an item
   */
  async extractInsights(itemId: number): Promise<string[]> {
    if (authService.isDemoMode()) {
      return demoDataService.extractInsights(itemId);
    }

    const response = await api.post(`/ai/insights/${itemId}`);
    return response.data.insights || [];
  }

  /**
   * Gets AI usage statistics for the current user
   */
  async getUsageStats(): Promise<UsageStats> {
    if (authService.isDemoMode()) {
      return demoDataService.getUsageStats();
    }

    const response = await api.get('/ai/usage-stats');
    return response.data;
  }
}

export const aiService = new AIService();
