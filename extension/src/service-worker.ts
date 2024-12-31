async function analyzeWithGroq(text: string, tweetId: string) {
  try {
    console.log("Analyzing tweet:", { tweetId, text });

    // Get the stored API key and prompt
    const { groqApiKey, systemPrompt } = await chrome.storage.local.get(['groqApiKey', 'systemPrompt']);
    
    if (!groqApiKey) {
      throw new Error('Groq API key not found. Please set it in the extension settings.');
    }

    const prompt = systemPrompt || `You are a tweet analyzer...`; // Your default prompt here

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
  console.log(sendResponse);
  if (request.action === "newTweet") {
    // console.log("=== New Tweet ===");
    const tweetId = request.content.id;  // Use the ID from the content script

    // Analyze tweet with Groq
    analyzeWithGroq(request.content.text, tweetId).then(result => {
      console.log("Analysis result:", result);
      if (sender.tab && sender.tab.id) {
        chrome.tabs.sendMessage(sender.tab.id, {
          action: "analysisResult",
          result: { tweetId, isBait: result.isBait, error: null }
        });
      }
    });
    // if (sender.tab && sender.tab.id) {
    //   chrome.tabs.sendMessage(sender.tab.id, {
    //     action: "analysisResult",
    //     result: { tweetId, isPolitical: true, error: null }
    //   });
    // }
  }
});
