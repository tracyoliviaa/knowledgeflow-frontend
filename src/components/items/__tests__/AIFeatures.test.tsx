// src/components/items/__tests__/AIFeatures.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AIFeatures } from '../AIFeatures';
import { aiService } from '../../../services/aiService';

// Mock des AI-Service
jest.mock('../../../services/aiService');

describe('AIFeatures Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sollte Zusammenfassung anzeigen nach erfolgreicher Anfrage', async () => {
    const mockSummary = 'Dies ist eine Test-Zusammenfassung';
    
    (aiService.summarizeItem as jest.Mock).mockResolvedValue({
      summary: mockSummary,
      cost: 0.0012
    });

    render(<AIFeatures itemId={1} />);

    // Klick auf "Zusammenfassen"-Button
    const summarizeBtn = screen.getByText(/Zusammenfassen/i);
    fireEvent.click(summarizeBtn);

    // Warten auf Ergebnis
    await waitFor(() => {
      expect(screen.getByText(mockSummary)).toBeInTheDocument();
    });

    // Service wurde mit korrekter ID aufgerufen
    expect(aiService.summarizeItem).toHaveBeenCalledWith(1);
  });

  it('sollte Fehler anzeigen bei fehlgeschlagener Anfrage', async () => {
    (aiService.summarizeItem as jest.Mock).mockRejectedValue(
      new Error('API Error')
    );

    render(<AIFeatures itemId={1} />);

    const summarizeBtn = screen.getByText(/Zusammenfassen/i);
    fireEvent.click(summarizeBtn);

    await waitFor(() => {
      expect(screen.getByText(/Zusammenfassung fehlgeschlagen/i)).toBeInTheDocument();
    });
  });

  it('sollte Loading-State während Anfrage anzeigen', async () => {
    (aiService.summarizeItem as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 1000))
    );

    render(<AIFeatures itemId={1} />);

    const summarizeBtn = screen.getByText(/Zusammenfassen/i);
    fireEvent.click(summarizeBtn);

    // Loading-State prüfen
    expect(screen.getByText(/Lädt.../i)).toBeInTheDocument();
  });
});