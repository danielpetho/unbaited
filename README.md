# unbaited

Control your X feed with LLama 3.3. A browser extension that helps you filter out engagement bait and inflammatory content from your X (formerly Twitter) feed.

## How it works

The extension uses Groq's ultra-fast API to analyze tweets using the Llama 3.3 model. When you scroll through X, it:

1. Detects new tweets as they appear in your viewport
2. Sends the tweet content (only text as of now) to Groq's API for analysis
3. Blurs tweets that are identified as engagement bait, political tweets, etc.
4. Gives you the option to reveal hidden tweets with a single click

## Installation

### Chrome/Safari
1. Install the extension from the Chrome Web Store
2. Get your API key from [Groq](https://console.groq.com)
3. Open the extension settings and enter your API key
4. Optionally customize the system prompt to adjust how tweets are analyzed

### Firefox
1. Install the extension from Firefox Add-ons (coming soon)
2. Get your API key from [Groq](https://console.groq.com) 
3. Open the extension settings and enter your API key
4. Optionally customize the system prompt to adjust how tweets are analyzed

## Browser Support

- Chrome: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support

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

#### Loading in browsers

##### Chrome/Safari
Load the `extension/dist` directory as an unpacked extension:
1. Open Chrome/Safari
2. Go to Extensions page
3. Enable Developer Mode
4. Click "Load unpacked" and select the `extension/dist` directory

##### Firefox
Load the extension temporarily:
1. Open Firefox
2. Go to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select any file in the `extension/dist` directory

### Implementation Notes

The extension uses different approaches for background processing:
- Chrome/Safari: Uses Service Workers (MV3)
- Firefox: Uses Background Scripts (MV3 with scripts fallback)

This is handled automatically in the code, but when testing make sure to verify functionality in both environments.
