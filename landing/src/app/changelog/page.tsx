export default function Changelog() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 font-mono lowercase">
      <h1 className="text-4xl font-bold mb-8">Changelog</h1>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">12 January 2025</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold">System Prompts & Model Updates</h3>
              <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-600">
                <li>Refined system prompts for more accurate tweet classification</li>
                <li>Improved prompt editing interface with better validation</li>
                <li>Reduced likelihood of unprocessable model responses</li>
                <li>Added model selection with support for multiple LLMs</li>
                <li>Switched to more cost-effective default model (Gemma 2 9B)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold">Display Options</h3>
              <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-600">
                <li>New display mode options: blur or hide detected tweets</li>
                <li>Blur mode shows tweets with a blur effect and reveal button</li>
                <li>Hide mode completely removes detected tweets from view</li>
              </ul>
            </div>

            {/* <div>
              <h3 className="text-lg font-bold">Performance Improvements</h3>
              <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-600">
                <li>Tweet analysis results are now cached for 24 hours</li>
                <li>Cached results persist until tweet ID changes</li>
                <li>Significantly reduced API calls for frequently viewed tweets</li>
              </ul>
            </div> */}
          </div>
        </section>
      </div>
    </main>
  );
}
