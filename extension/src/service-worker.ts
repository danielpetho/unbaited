const defaultPrompt = `You are a tweet analyzer. Your job is to decide if the content of a tweet is met with the following criteria:

1. The tweet is political in nature. It discusses politics, government, political issues, parties, candidates, elections, or any other political topic, be it related to any country or region.
2. The tweet discusses ideologies in relation of politics. Topics such as racism, communism, fascism, nationalism, anti-immigration, DEI, woke-ism, far-left, far-right, etc.
3. The tweet is deliberately crafted to induce negative feelings or emotions. It is designed to provoke strong emotions, such as anger, fear, or sadness.
4. The tweet is designed to be an "engagement bait" to attract attention and increase engagement. Words related to this are "breaking", "it's over", "rip",  etc.
5. The tweet is designed to be a "political bait" to attract attention and increase engagement. Words related to this are "vote", "election", "candidate", "party", "politics", "government", "policy", etc.

If any of the above criteria are met, you should respond with "true". Otherwise, respond with "false". Only respond with "true" or "false" and nothing else. Use lowercase for the response.`;

async function analyzeWithGroq(text: string, tweetId: string) {
  try {
    console.log("Analyzing tweet:", { tweetId, text });

    // Get the stored API key and prompt
    const { groqApiKey, systemPrompt } = await chrome.storage.local.get(['groqApiKey', 'systemPrompt']);
    
    if (!groqApiKey) {
      throw new Error('Groq API key not found. Please set it in the extension settings.');
    }

    // Use the stored prompt or fall back to default
    const prompt = systemPrompt || defaultPrompt;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: prompt
            },
            {
              role: "user",
              content: text,
            },
          ],
          temperature: 0,
          max_tokens: 10,
        }),
      }
    );

    const data = await response.json();
    console.log("Groq API response:", data);

    if (
      !data ||
      !data.choices ||
      !data.choices[0] ||
      !data.choices[0].message
    ) {
      console.error("Invalid response from Groq:", data);
      return {
        tweetId,
        isBait: false,
        error: "Invalid API response",
      };
    }

    const responseContent = data.choices[0].message.content
      .toLowerCase()
      .trim();
    // console.log("Raw response content:", responseContent);

    const isBait = responseContent === "true";
    // console.log("Analysis result:", { tweetId, isPolitical, responseContent });

    return {
      tweetId,
      isBait,
    };
  } catch (error) {
    console.error("Error analyzing tweet:", error);
    return {
      tweetId,
      isBait: false,
      error: (error as Error).message || "Unknown error",
    };
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "newTweet") {
    // First check if extension is enabled
    chrome.storage.local.get(['isEnabled'], async (result) => {
      // Default to enabled if not set
      const isEnabled = result.isEnabled ?? true;
      
      if (!isEnabled) {
        return; // Don't analyze if disabled
      }

      const tweetId = request.content.id;
      
      // Continue with analysis...
      analyzeWithGroq(request.content.text, tweetId).then(result => {
        console.log("Analysis result:", result);
        if (sender.tab && sender.tab.id) {
          chrome.tabs.sendMessage(sender.tab.id, {
            action: "analysisResult",
            result: { tweetId, isBait: result.isBait, error: null }
          });
        }
      });
    });
  }
});

// When the service worker starts, ensure the default prompt is set if none exists
chrome.runtime.onInstalled.addListener(async () => {
  const { systemPrompt } = await chrome.storage.local.get(['systemPrompt']);
  if (!systemPrompt) {
    await chrome.storage.local.set({ systemPrompt: defaultPrompt });
    console.log('Default prompt set');
  }
});
