import React, { useState, useEffect } from "react";
import axios from "axios";
import Sentiment from "sentiment";
import { Settings, Loader } from "lucide-react";
import { NewsCard } from "./components/NewsCard";
import { PreferencesModal } from "./components/PreferencesModal";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { NewsArticle, UserPreferences } from "./types";

// Replace with your actual API key from NewsAPI
const NEWS_API_KEY = import.meta.env.VITE_API_KEY;
const NEWS_API_BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    "newsPreferences",
    {
      topics: [],
      sources: [],
    }
  );

  const sentiment = new Sentiment();

  const fetchNews = async () => {
    try {
      setLoading(true);
      let endpoint = `${NEWS_API_BASE_URL}/top-headlines`;
      let params: any = {
        apiKey: NEWS_API_KEY,
        language: "en",
        pageSize: 12,
      };

      // If preferences are set, use them to filter news
      if (preferences.topics.length > 0 || preferences.sources.length > 0) {
        endpoint = `${NEWS_API_BASE_URL}/everything`;
        if (preferences.topics.length > 0) {
          params.q = preferences.topics.join(" OR ");
        }
        if (preferences.sources.length > 0) {
          params.sources = preferences.sources.join(",");
        }
      } else {
        // Default to top headlines from all categories
        params.country = "us"; // You can change this to any country code
      }

      const response = await axios.get(endpoint, { params });

      const articlesWithSentiment = response.data.articles.map(
        (article: NewsArticle) => ({
          ...article,
          sentiment: sentiment.analyze(article.description || article.title),
        })
      );

      setArticles(articlesWithSentiment);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [preferences]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Personal News Digest
            </h1>
            <button
              onClick={() => setShowPreferences(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              <Settings className="w-5 h-5" />
              Preferences
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        )}
      </main>

      {showPreferences && (
        <PreferencesModal
          preferences={preferences}
          onSave={setPreferences}
          onClose={() => setShowPreferences(false)}
        />
      )}
    </div>
  );
}

export default App;
