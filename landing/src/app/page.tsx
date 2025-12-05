'use client';

import Image from "next/image";
import Link from "next/link";
import TweetEmbed from "@/components/tweet-embed";
import useDetectBrowser from "@/hooks/use-detect-browser";

const CHROME_STORE_URL = "https://chromewebstore.google.com/detail/unbaited-prototype/bpbnggihcaknipcgbpgjgfhgmdgcokcg";
const FIREFOX_STORE_URL = "https://addons.mozilla.org/en-US/firefox/addon/unbaited-prototype";

export default function Home() {
  const browserName = useDetectBrowser()
  const isFirefox = browserName === 'Firefox'

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 font-mono lowercase">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center gap-x-2 ">
          <Image
            src="/logo128.png"
            alt="Unbaited Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <h1 className="text-4xl font-bold">unbaited</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center mt-4">
          Control your feed with LLMs on X
        </p>
      </div>

      <div className="flex justify-center mt-8">
        <a
          href={isFirefox ? FIREFOX_STORE_URL : CHROME_STORE_URL}
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Add to {isFirefox ? 'Firefox' : 'Chrome'}
        </a>
      </div>

      <div className="space-y-8 mb-12 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is this?</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Unbaited is a browser extension that helps you filter out engagement
            bait and inflammatory content from your X (formerly Twitter) feed.
            It uses AI to analyze tweets in real-time and hides content designed
            to provoke emotional responses or increase engagement through
            controversial topics.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How it works</h2>
          <div className="aspect-video w-full bg-transparent mb-12 flex justify-center">
            <TweetEmbed />
          </div>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              The extension uses Groq&apos;s ultra-fast API to analyze tweets using
              an llm of your choice. When you scroll through X, it:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Detects new tweets as they appear in your viewport</li>
              <li>Sends the tweet content to Groq&apos;s API for analysis</li>
              <li>Blurs tweets that are identified as engagement bait</li>
              <li>
                Gives you the option to reveal hidden tweets with a single click
              </li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Important Notes</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              This is a prototype and thought-provoker. The goal is to
              demonstrate how social media platforms could integrate more user
              controls natively, giving people more agency over their feed
              content.
            </p>
            <p>To use the extension, you&apos;ll need:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Your own{" "}
                <a
                  href="https://console.groq.com"
                  className="text-black dark:text-white underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Groq API key
                </a>
              </li>
            </ul>
            <p>
              You can customize the system prompts to adjust how tweets are
              analyzed, making the extension work according to your preferences.
            </p>
          </div>
        </section>

        <p className="text-sm text-gray-500 dark:text-gray-500 text-center">
          Read the{" "}
          <Link href="/privacy" className="underline">
            privacy policy
          </Link>{" "}
          to learn how your data is handled.
        </p>
      </div>
    </main>
  );
}
