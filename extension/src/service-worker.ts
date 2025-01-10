const DEFAULT_CRITERIA = `- The tweet is designed to provoke a negative emotional response, such as anger, fear
- The tweet contains inflammatory or controversial statements
- The tweet uses sensationalized language or exaggeration
- The tweet appears to be intentionally divisive
- The tweet makes extreme or absolute claims
- The tweet uses manipulative tactics to gain engagement
- The tweet is political in nature. It discusses politics, government, political issues, parties, candidates, elections, or any other political topic, be it related to any country or region.
- The tweet discusses ideologies in relation of politics. Topics such as racism, communism, fascism, nationalism, immigration, anti-immigration, DEI, woke-ism, far-left, far-right, etc.
- The tweet contains misleading or out-of-context information`;

const SYSTEM_PROMPT_PREFIX = `You are a tweet analyzer. Your job is to decide if the content of a tweet is met with the following criteria:`;

const SYSTEM_PROMPT_SUFFIX = `
If any of the above criteria are met, the tweet should be considered bait.
Respond ONLY with 'true' if the tweet is bait, or 'false' if it is not. Please respond with 'true' or 'false' and nothing else. Use lowercase for the response.`;

function constructFullPrompt(criteria: string): string {
  return `${SYSTEM_PROMPT_PREFIX}

${criteria}

${SYSTEM_PROMPT_SUFFIX}`;
}

async function analyzeWithGroq(text: string, tweetId: string) {
  try {
    console.log("Analyzing tweet:", { tweetId, text });

    // Get all settings from sync storage
    const { groqApiKey, promptCriteria, selectedModel, isEnabled } = await chrome.storage.sync.get([
      'groqApiKey', 
      'promptCriteria',
      'selectedModel',
      'isEnabled'
    ]);
    
    console.log("Retrieved settings:", { 
      hasApiKey: !!groqApiKey,
      hasCriteria: !!promptCriteria,
      model: selectedModel,
      isEnabled 
    });

    if (!groqApiKey) {
      throw new Error('Groq API key not found. Please set it in the extension settings.');
    }

    // Use the stored criteria or fall back to default
    const criteria = promptCriteria || DEFAULT_CRITERIA;
    const fullPrompt = constructFullPrompt(criteria);

    // Use selected model or fall back to default
    const model = selectedModel || 'gemma2-9b-it';

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content: fullPrompt
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
    // Check if extension is enabled from sync storage
    chrome.storage.sync.get(['isEnabled'], async (result) => {
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

// When the service worker starts, ensure defaults are set
chrome.runtime.onInstalled.addListener(async () => {
  const { promptCriteria, selectedModel } = await chrome.storage.sync.get(['promptCriteria', 'selectedModel']);
  const defaults = {
    ...(promptCriteria ? {} : { promptCriteria: DEFAULT_CRITERIA }),
    ...(selectedModel ? {} : { selectedModel: 'gemma2-9b-it' }),
    isEnabled: true
  };
  
  if (Object.keys(defaults).length > 0) {
    await chrome.storage.sync.set(defaults);
    console.log('Default settings set:', defaults);
  }
});
