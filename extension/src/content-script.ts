import "./index.css";

const style = document.createElement("style");
style.textContent = `
  #unbaited * {
    all: unset;
  }

  #unbaited ul {
    list-style-type: disc !important;
    margin: 0 !important;
    padding-left: 20px !important;
  }

  #unbaited li {
  display: list-item !important;
    margin: 0.5em 0 !important;
  }

  #unbaited a {
    cursor: pointer;
  }
    
  #unbaited hr {
    height: 1px !important;
    border: none !important;
    padding: 0 !important;
    background-color: var(--black) !important;
  }
`;
document.head.appendChild(style);

const link = document.createElement("link");
link.type = "text/css";
link.rel = "stylesheet";
document.head.appendChild(link);

const showButtonStyle = document.createElement("style");
showButtonStyle.textContent = `
  .unbaited-show-tweet-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    color: black;
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    z-index: 1000;
    font-family: system-ui;
  }

  .unbaited-tweet-container {
    position: relative;
  }
`;
document.head.appendChild(showButtonStyle);

// Function to extract tweet content
function getTweetContent(tweetElement: Element): {
  text: string;
  author: string;
  images: string[];
  videos: string[];
  urls: string[];
  timestamp: string;
  metrics: {
    replies: string;
    reposts: string;
    likes: string;
    views: string;
  };
  id: string;
} {
  // console.log("Getting content for tweet element:", tweetElement);

  // Helper function to recursively find elements by data-testid
  function findElementsByTestId(element: Element, testId: string): Element[] {
    const results: Element[] = [];
    
    // Check current element
    if (element.getAttribute('data-testid') === testId) {
      results.push(element);
    }
    
    // Check children recursively
    element.childNodes.forEach(child => {
      if (child instanceof Element) {
        results.push(...findElementsByTestId(child, testId));
      }
    });
    
    return results;
  }

  // Helper function to get text content from an element and its children
  function getTextContent(element: Element): string {
    let text = '';
    element.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent?.trim() + ' ';
      } else if (node instanceof Element) {
        text += getTextContent(node) + ' ';
      }
    });
    return text.trim();
  }

  // Find text content
  const textElements = findElementsByTestId(tweetElement, "tweetText");
  const text = textElements.map(el => getTextContent(el)).join(' ').trim();

  // Find author
  const authorElements = findElementsByTestId(tweetElement, "User-Name");
  const authorText = authorElements.map(el => getTextContent(el)).join(' ');
  const author = authorText.split(/[·\n]/)
                          .map(part => part.trim())
                          .filter(part => part)[0] || '';

  // Find images - look for tweetPhoto containers first
  const images: string[] = [];
  const photoContainers = findElementsByTestId(tweetElement, "tweetPhoto");
  // console.log("Found photo containers:", photoContainers);

  photoContainers.forEach(container => {
    // Recursively find all img elements within the photo container
    const findImages = (element: Element) => {
      element.childNodes.forEach(child => {
        if (child instanceof Element) {
          if (child.tagName === 'IMG') {
            const src = child.getAttribute('src');
            // console.log("Found image in photo container:", { src });
            if (src && !src.includes('profile')) {
              const highQualitySrc = src.replace(/\?format=\w+&name=\w+/, '?format=jpg&name=large');
              images.push(highQualitySrc);
            }
          }
          findImages(child);
        }
      });
    };
    
    findImages(container);
  });

  // Find videos - look for video player containers
  const videos: string[] = [];
  const videoContainers = findElementsByTestId(tweetElement, "videoPlayer");
  // console.log("Found video containers:", videoContainers);

  videoContainers.forEach(container => {
    // Recursively find all video elements and sources
    const findVideos = (element: Element) => {
      element.childNodes.forEach(child => {
        if (child instanceof Element) {
          if (child.tagName === 'VIDEO') {
            const src = child.getAttribute('src');
            // console.log("Found video source:", { src });
            if (src) videos.push(src);
          }
          // Also check for source elements within video
          if (child.tagName === 'SOURCE') {
            const src = child.getAttribute('src');
            // console.log("Found video source element:", { src });
            if (src) videos.push(src);
          }
          findVideos(child);
        }
      });
    };
    
    findVideos(container);
  });

  // Find URLs
  const urls: string[] = [];
  const allLinks = tweetElement.getElementsByTagName('a');
  Array.from(allLinks).forEach(link => {
    const href = link.getAttribute('href');
    if (href?.startsWith('https://') && !href.includes('twitter.com')) {
      urls.push(href);
    }
  });

  // Find timestamp
  const timeElements = tweetElement.getElementsByTagName('time');
  const timestamp = timeElements[0]?.getAttribute('datetime') || '';

  // Find metrics
  const metrics = {
    replies: '0',
    reposts: '0',
    likes: '0',
    views: '0'
  };

  // Process metrics recursively
  const metricsMap = {
    'reply': 'replies',
    'retweet': 'reposts',
    'like': 'likes',
    'analytics': 'views'
  };

  Object.entries(metricsMap).forEach(([testId, metricKey]) => {
    const elements = findElementsByTestId(tweetElement, testId);
    if (elements.length > 0) {
      const value = getTextContent(elements[0]);
      if (value) {
        metrics[metricKey as keyof typeof metrics] = value;
      }
    }
  });

  const id = Math.random().toString(36).substring(7);
  tweetElement.setAttribute('data-tweet-id', id);

  const result = {
    text,
    author,
    images,
    videos,
    urls,
    timestamp,
    metrics,
    id
  };

  // console.log("Final extracted content:", result);
  return result;
}

// Add this near the top of your content script
const tweetObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const tweetElement = entry.target;
    
    // Only process tweets that are becoming visible
    if (entry.isIntersecting) {
      // Check if we've already processed this tweet
      if (!tweetElement.hasAttribute('data-processed')) {
        const tweetContent = getTweetContent(tweetElement);
        
        chrome.runtime.sendMessage({
          action: "newTweet",
          content: tweetContent
        });
        
        // Mark as processed to avoid duplicate analysis
        tweetElement.setAttribute('data-processed', 'true');
      }
      
      // Optionally, stop observing once processed
      tweetObserver.unobserve(tweetElement);
    }
  });
}, {
  // Configure the observer:
  threshold: 0.3, // Trigger when at least 30% of the tweet is visible
  rootMargin: '100px' // Start loading slightly before the tweet enters viewport
});

// Modify your existing observer to just set up the intersection observer
const mutationObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        const tweets = node.querySelectorAll('[data-testid="tweet"]:not([data-processed])');
        tweets.forEach((tweet) => {
          // Instead of analyzing immediately, start observing for visibility
          tweetObserver.observe(tweet);
        });
      }
    });
  });
});

// Update your initialization code
if (window.location.hostname === "twitter.com" || window.location.hostname === "x.com") {
  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Handle existing tweets
  const existingTweets = document.querySelectorAll('[data-testid="tweet"]:not([data-processed])');
  existingTweets.forEach((tweet) => {
    tweetObserver.observe(tweet);
  });
}

// Listen for responses from background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "result") {
 
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "analysisResult") {
    const { tweetId, isBait, error } = message.result;
    console.log("Received analysis result:", { tweetId, isBait, error });
    
    if (error) {
      console.error(`Error analyzing tweet ${tweetId}:`, error);
      return;
    }

    const tweetElement = document.querySelector(`[data-tweet-id="${tweetId}"]`);
    // console.log("Found tweet element:", tweetElement);
    
    if (tweetElement && isBait) {
      // Add container for relative positioning
      const container = document.createElement('div');
      container.className = 'unbaited-tweet-container';
      tweetElement.parentNode?.insertBefore(container, tweetElement);
      container.appendChild(tweetElement);

      // Add the show button
      const showButton = document.createElement('button');
      showButton.className = 'unbaited-show-tweet-button';
      showButton.textContent = 'Show';
      container.appendChild(showButton);

      // Apply blur effect and political class
      tweetElement.classList.add('unbaited-tweet');
      (tweetElement as HTMLElement).style.filter = 'blur(12px)';

      // Add click handler for the show button
      showButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Remove blur effect
        (tweetElement as HTMLElement).style.filter = 'none';
        tweetElement.classList.remove('unbaited-tweet');
        
        // Remove the show button
        showButton.remove();
      });

    }
  }
});

// Add this to your existing message listeners
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggleExtension") {
    if (!message.isEnabled) {
      // Remove all blur effects and show buttons when disabled
      document.querySelectorAll('.unbaited-tweet').forEach(tweet => {
        (tweet as HTMLElement).style.filter = 'none';
        tweet.classList.remove('unbaited-tweet');
      });
      document.querySelectorAll('.unbaited-show-tweet-button').forEach(button => {
        button.remove();
      });
    }
  }
});

