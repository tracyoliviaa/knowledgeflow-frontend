// src/types/Item.ts
export interface Item {
  id: number;
  title: string;
  content: string;
  type: 'article' | 'note' | 'video';
  createdAt: string;
}