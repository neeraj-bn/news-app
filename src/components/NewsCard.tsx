import React from 'react';
import { NewsArticle } from '../types';
import { Newspaper, ThumbsUp, ThumbsDown } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const getSentimentColor = (score: number) => {
    if (score > 0) return 'bg-green-100 text-green-800';
    if (score < 0) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getSentimentIcon = (score: number) => {
    if (score > 0) return <ThumbsUp className="w-4 h-4" />;
    if (score < 0) return <ThumbsDown className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Newspaper className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">{article.source.name}</span>
          <span className="text-sm text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
        <p className="text-gray-600 mb-4">{article.description}</p>
        <div className="flex items-center justify-between">
          <div
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${getSentimentColor(
              article.sentiment.score
            )}`}
          >
            {getSentimentIcon(article.sentiment.score)}
            <span>
              Sentiment: {article.sentiment.score > 0 ? 'Positive' : article.sentiment.score < 0 ? 'Negative' : 'Neutral'}
            </span>
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
}