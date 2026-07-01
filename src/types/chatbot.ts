import type { UserRole } from '@/types';

export type ChatContext = 'home' | 'login' | 'register' | UserRole | 'guest';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface QuickQuestion {
  id: string;
  label: string;
  question: string;
  category?: string;
}

export interface KnowledgeEntry {
  keywords: string[];
  answer: string;
  category: 'system' | 'role' | 'general' | 'hr' | 'education' | 'world';
  roles?: UserRole[];
  context?: ChatContext[];
}
