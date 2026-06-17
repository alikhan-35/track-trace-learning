import type { LucideIcon } from 'lucide-react';

export type AudienceType = 'new' | 'current' | 'all';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Базовый' | 'Средний' | 'Продвинутый';
  audience: AudienceType;
  icon: LucideIcon;
  lessons: string[];
  scenarioSteps: string[];
  checklist: ChecklistItem[];
  quiz: QuizQuestion[];
}

export interface Role {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  responsibilities: string[];
  accent: string;
  icon: LucideIcon;
  modules: Module[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SupportChannel {
  id: string;
  title: string;
  description: string;
  contact: string;
  icon: LucideIcon;
}
