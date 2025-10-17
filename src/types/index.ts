export interface BlogPost {
  _id?: string;
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  readTime: number;
  publishedAt: string;
  author: string;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ThoughtExperiment {
  id: string;
  question: string;
  choices: Choice[];
  analysis: Record<string, string>;
}

export interface Choice {
  id: string;
  text: string;
}

export interface DeepDive {
  id: string;
  title: string;
  content: string;
  isExpanded: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  philosophy: string;
}

export interface QuizResult {
  philosophy: string;
  description: string;
  alignment: number;
}

export {};