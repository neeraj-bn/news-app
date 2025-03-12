import React from 'react';
import { X } from 'lucide-react';
import { UserPreferences } from '../types';

interface PreferencesModalProps {
  preferences: UserPreferences;
  onSave: (preferences: UserPreferences) => void;
  onClose: () => void;
}

const AVAILABLE_TOPICS = [
  'technology',
  'business',
  'sports',
  'entertainment',
  'science',
  'health',
];

const AVAILABLE_SOURCES = [
  'bbc-news',
  'cnn',
  'reuters',
  'the-verge',
  'wired',
  'techcrunch',
];

export function PreferencesModal({ preferences, onSave, onClose }: PreferencesModalProps) {
  const [tempPreferences, setTempPreferences] = React.useState(preferences);

  const handleTopicToggle = (topic: string) => {
    setTempPreferences(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic],
    }));
  };

  const handleSourceToggle = (source: string) => {
    setTempPreferences(prev => ({
      ...prev,
      sources: prev.sources.includes(source)
        ? prev.sources.filter(s => s !== source)
        : [...prev.sources, source],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">News Preferences</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Topics</h3>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_TOPICS.map(topic => (
              <button
                key={topic}
                onClick={() => handleTopicToggle(topic)}
                className={`px-3 py-1 rounded-full text-sm ${
                  tempPreferences.topics.includes(topic)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Sources</h3>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_SOURCES.map(source => (
              <button
                key={source}
                onClick={() => handleSourceToggle(source)}
                className={`px-3 py-1 rounded-full text-sm ${
                  tempPreferences.sources.includes(source)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {source}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(tempPreferences);
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}