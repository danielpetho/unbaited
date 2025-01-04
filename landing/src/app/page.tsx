import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
        <p className="text-lg text-gray-600 text-center mt-4">
          Control your feed with LLMs on X
        </p>
      </div>

      <div className="flex justify-center mt-4">
        <a
          href="https://chromewebstore.google.com/detail/unbaited-prototype/bpbnggihcaknipcgbpgjgfhgmdgcokcg?authuser=2&hl=en"
          className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Add to Chrome
        </a>
      </div>

      <div className="space-y-8 mb-12 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is this?</h2>
          <p className="text-gray-600 leading-relaxed">
            Unbaited is a browser extension that helps you filter out engagement
            bait and inflammatory content from your X (formerly Twitter) feed.
            It uses AI to analyze tweets in real-time and hides content designed
            to provoke emotional responses or increase engagement through
            controversial topics.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How it works</h2>
          <div className="aspect-video w-full bg-gray-100 mb-6">
            {/* Embedded tweet video will go here */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Demo video coming soon
            </div>
          </div>
          <div className="space-y-4 text-gray-600">
            <p>
              The extension uses Groq&apos;s ultra-fast API to analyze tweets using
              the Llama 3.3 model. When you scroll through X, it:
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
          <div className="space-y-4 text-gray-600">
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
                  className="text-black underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Groq API key
                </a>
              </li>
              <li>Chrome or a Chromium-based browser</li>
            </ul>
            <p>
              You can customize the system prompts to adjust how tweets are
              analyzed, making the extension work according to your preferences.
            </p>
          </div>
        </section>

        <p className="text-sm text-gray-500 text-center">
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
