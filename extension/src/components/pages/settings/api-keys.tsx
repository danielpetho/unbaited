import React, { useEffect, useState } from 'react';

export function ApiKeys() {
  const [groqKey, setGroqKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load saved API key when component mounts
    chrome.storage.local.get(['groqApiKey'], (result) => {
      if (result.groqApiKey) {
        setGroqKey(result.groqApiKey);
      }
    });
  }, []);

  const handleSave = async () => {
    await chrome.storage.local.set({ groqApiKey: groqKey });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleClear = () => {
    setGroqKey('');
    chrome.storage.local.remove('groqApiKey');
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-4 font-mono lowercase">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">API Keys</h2>
        <div className="space-x-2">
          <button
            onClick={handleClear}
            className="px-3 lowercase py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 text-sm bg-black text-white hover:bg-gray-800 rounded-md transition-colors lowercase"
          >
            Save Changes
          </button>
        </div>
      </div>

      {isSaved && (
        <div className="text-sm text-green-600">
          ✓ Changes saved successfully
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="groq-key" className="block text-sm font-medium mb-2">
            Groq API Key
          </label>
          <input
            id="groq-key"
            type="password"
            value={groqKey}
            onChange={(e) => setGroqKey(e.target.value)}
            className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your Groq API key"
          />
        </div>
      </div>

      <div className="text-sm text-muted-foreground mt-5">
        <p>You can find your API key in the Groq Console:</p>
        <a 
          href="https://console.groq.com/keys" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-black hover:underline"
        >
          https://console.groq.com/keys
        </a>
      </div>
    </div>
  );
}
