import React, { useEffect, useState } from 'react';

const defaultPrompt = `You are a tweet analyzer. Your job is to decide if the content of a tweet is met with the following criteria:

1. The tweet is political in nature. It discusses politics, government, political issues, parties, candidates, elections, or any other political topic, be it related to any country or region.
2. The tweet discusses ideologies in relation of politics. Topics such as racism, communism, fascism, nationalism, anti-immigration, DEI, woke-ism, far-left, far-right, etc.
3. The tweet is deliberately crafted to induce negative feelings or emotions. It is designed to provoke strong emotions, such as anger, fear, or sadness.
4. The tweet is designed to be an "engagement bait" to attract attention and increase engagement. Words related to this are "breaking", "it's over", "rip",  etc.
5. The tweet is designed to be a "political bait" to attract attention and increase engagement. Words related to this are "vote", "election", "candidate", "party", "politics", "government", "policy", etc.

If any of the above criteria are met, you should respond with "true". Otherwise, respond with "false". Only respond with "true" or "false" and nothing else. Use lowercase for the response.`;

export function PromptsSettings() {
  const [systemPrompt, setSystemPrompt] = useState(defaultPrompt);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load saved prompt when component mounts
    chrome.storage.local.get(['systemPrompt'], (result) => {
      if (result.systemPrompt) {
        setSystemPrompt(result.systemPrompt);
      }
    });
  }, []);

  const handleSave = async () => {
    await chrome.storage.local.set({ systemPrompt });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    setSystemPrompt(defaultPrompt);
    chrome.storage.local.remove('systemPrompt');
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-4 font-mono lowercase">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">System Prompt</h2>
        <div className="space-x-2">
          <button
            onClick={handleReset}
            className="px-3 py-1 text-sm lowercase bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Reset to Default
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 lowercase text-sm bg-black text-white hover:bg-gray-800 rounded-md transition-colors"
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

      <textarea
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
        className="w-full h-[400px] p-4 border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Enter your system prompt here..."
      />

      <div className="text-sm text-muted-foreground mt-5">
        <p>This prompt will be used to analyze tweets and determine if they should be hidden.</p>
        <br/>
        <p className="text-red-600">IMPORTANT! Make sure your prompt always results in a "true" or "false" response, nothing else. Force the model to respond in lowercase ideally. Otherwise the extension might not work as expected.</p>
      </div>
    </div>
  );
}
