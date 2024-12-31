# unbaited

Control your feed with LLMs on X. A browser extension that helps you filter out engagement bait and inflammatory content from your X (formerly Twitter) feed.

## How it works

The extension uses Groq's ultra-fast API to analyze tweets using the Llama 3.3 model. When you scroll through X, it:

1. Detects new tweets as they appear in your viewport
2. Sends the tweet content to Groq's API for analysis
3. Blurs tweets that are identified as engagement bait
4. Gives you the option to reveal hidden tweets with a single click

## Installation

1. Install the extension from the Chrome Web Store
2. Get your API key from [Groq](https://console.groq.com)
3. Open the extension settings and enter your API key
4. Optionally customize the system prompt to adjust how tweets are analyzed

## Development

The project consists of two parts:
- `extension/`: The Chrome extension
- `landing/`: The landing page built with Next.js

### Extension Development

```bash
cd extension
npm i
npm build
```

Then load the `extension/dist` directory as an unpacked extension in Chrome.

