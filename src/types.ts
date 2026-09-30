export interface Project {
  slug: string;
  id: string; // "01", "02", etc.
  title: string;
  category: string;
  tags: string[];
  year: string;
  type: string;
  role: string;
  link: string;
  description: string;
  image: string;
  mockups: string[];
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  logoText: string;
}

export interface BlogPost {
  slug: string;
  date: string;
  title: string;
  subtitle: string;
  content: string;
  readTime: string;
  image: string;
}
