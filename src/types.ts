export type NavTab = 'home' | 'research' | 'code' | 'about' | 'archive';

export interface MarkdownFrontmatter {
  title?: string;
  date?: string;
  category?: string;
  tags?: string[];
  readTime?: string;
  excerpt?: string;
}

export interface Post {
  id: string;
  slug: string;
  filename: string;
  title: string;
  date: string;
  formattedDate: string;
  category: string;
  tags: string[];
  readTime: string;
  excerpt: string;
  content: string; // The raw markdown body
}

export interface CodeRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  lastUpdated: string;
  githubUrl: string;
}

export interface Publication {
  year: number;
  title: string;
  venue: string;
  authors: string;
  doiUrl?: string;
}
