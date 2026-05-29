import type { Item } from '../types/Item';
import type { Flashcard, SummaryResponse, UsageStats } from './aiService';

const DEMO_ITEMS_KEY = 'knowledgeflow-demo-items';

export const DEMO_LOGIN = {
  email: 'demo@knowledgeflow.app',
  password: 'demo123',
};

const DEFAULT_DEMO_ITEMS: Item[] = [
  {
    id: 1,
    title: 'React Best Practices',
    content: 'Komponenten klein halten, Props klar definieren, useEffect gezielt nutzen und UI-Zustand nahe an der Oberflaeche halten.',
    type: 'article',
    createdAt: '2026-04-01',
  },
  {
    id: 2,
    title: 'TypeScript Grundlagen',
    content: 'Interfaces, Generics, Union Types und Type Guards machen React-Code robuster und leichter wartbar.',
    type: 'note',
    createdAt: '2026-04-02',
  },
  {
    id: 3,
    title: 'Node.js REST API Tutorial',
    content: 'Express Setup, Routen, Middleware, Auth Guards, Error Handling und Deployment fuer eine produktionsnahe API.',
    type: 'video',
    createdAt: '2026-04-03',
  },
  {
    id: 4,
    title: 'PostgreSQL fuer Produktivsysteme',
    content: 'Schema-Design, Migrationen, Indizes und Backups sind die Basis fuer verlaessliche Daten in echten Anwendungen.',
    type: 'article',
    createdAt: '2026-04-04',
  },
  {
    id: 5,
    title: 'CSS Grid Masterclass',
    content: 'Grid Template Areas, Auto-Flow und responsive Breakpoints helfen bei stabilen Layouts ohne fragile Workarounds.',
    type: 'video',
    createdAt: '2026-04-05',
  },
  {
    id: 6,
    title: 'KI-gestuetzte Lernkarten',
    content: 'Aus langen Notizen lassen sich mit KI kompakte Lernkarten, Zusammenfassungen und Themenvorschlaege erzeugen.',
    type: 'note',
    createdAt: '2026-04-06',
  },
];

const getStoredDemoItems = (): Item[] | null => {
  const stored = localStorage.getItem(DEMO_ITEMS_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const demoDataService = {
  listItems(filter = 'all'): Item[] {
    const items = getStoredDemoItems() || DEFAULT_DEMO_ITEMS;
    if (filter === 'all') return items;
    return items.filter((item) => item.type === filter);
  },

  searchItems(searchTerm: string): Item[] {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];

    return this.listItems().filter((item) =>
      item.title.toLowerCase().includes(term) ||
      item.content.toLowerCase().includes(term) ||
      item.type.toLowerCase().includes(term)
    );
  },

  getItem(id: number): Item | undefined {
    return this.listItems().find((item) => item.id === id);
  },

  createItem(data: Partial<Item>): Item {
    const items = this.listItems();
    const nextId = Math.max(0, ...items.map((item) => item.id)) + 1;
    const item: Item = {
      id: nextId,
      title: data.title || 'Unbenanntes Item',
      content: data.content || '',
      type: data.type || 'note',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(DEMO_ITEMS_KEY, JSON.stringify([item, ...items]));
    return item;
  },

  summarizeItem(itemId: number): SummaryResponse {
    const item = this.getItem(itemId);
    const title = item?.title || 'dieses Item';
    const content = item?.content || 'Der Inhalt wurde in der Demo lokal verarbeitet.';

    return {
      summary: `${title}: ${content.slice(0, 140)}${content.length > 140 ? '...' : ''} Die wichtigsten Punkte sind klar strukturiert und sofort weiterverwendbar.`,
    };
  },

  generateFlashcards(itemId: number, count = 5): Flashcard[] {
    const item = this.getItem(itemId);
    const title = item?.title || 'Demo-Item';
    const cards = [
      { question: `Was ist die Kernaussage von "${title}"?`, answer: 'Das Wissen wird in kurze, wiederholbare Lernpunkte verdichtet.' },
      { question: 'Warum ist Struktur wichtig?', answer: 'Sie macht Inhalte schneller auffindbar und leichter verstaendlich.' },
      { question: 'Welche Rolle spielt KI?', answer: 'KI erzeugt Zusammenfassungen, Lernkarten und Themenvorschlaege aus vorhandenen Notizen.' },
      { question: 'Was zeigt der Demo-Modus?', answer: 'Die wichtigsten Produktablaeufe funktionieren ohne Registrierung und ohne echte API-Kosten.' },
      { question: 'Wie koennte man das Item weiter nutzen?', answer: 'Als Lernnotiz, Suchtreffer, Zusammenfassung oder Grundlage fuer neue Inhalte.' },
    ];

    return cards.slice(0, count);
  },

  suggestTopics(itemId: number): string[] {
    const item = this.getItem(itemId);
    const baseTopics = item?.type === 'video'
      ? ['Video Notes', 'Learning Path', 'Tutorial']
      : ['Knowledge Base', 'Productivity', 'AI Summary'];

    return [...baseTopics, 'Recruiter Demo', 'Fullstack App'];
  },

  extractInsights(itemId: number): string[] {
    const item = this.getItem(itemId);
    return [
      `${item?.title || 'Das Item'} kann als strukturierter Wissensbaustein genutzt werden.`,
      'KI-Funktionen reduzieren manuellen Aufwand beim Zusammenfassen und Lernen.',
      'Der Demo-Modus zeigt den Produktwert auch ohne Account-Erstellung.',
    ];
  },

  getUsageStats(): UsageStats {
    return {
      current_month: {
        total_cost: 0.0234,
        operations: [
          { operation: 'summarize', count: '12', cost: '0.0120' },
          { operation: 'flashcards', count: '8', cost: '0.0080' },
          { operation: 'insights', count: '4', cost: '0.0034' },
        ],
      },
      all_time: {
        total_requests: 147,
        total_tokens: 84320,
        total_input_tokens: 61200,
        total_output_tokens: 23120,
        total_cost: 0.1823,
      },
    };
  },
};
