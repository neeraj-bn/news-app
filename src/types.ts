export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  sentiment: {
    score: number;
    comparative: number;
  };
}

export interface UserPreferences {
  topics: string[];
  sources: string[];
}