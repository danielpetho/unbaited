export default function Privacy() {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12 font-mono lowercase">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-2xl font-bold mb-4">Data Collection</h2>
            <p>
              Unbaited does not collect or store any personal data. All tweet analysis happens in real-time, and no content is saved on our servers.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-bold mb-4">API Usage</h2>
            <p>
              When you use Unbaited:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Tweet content is sent to Groq&apos;s API for analysis</li>
              <li>Your API key is stored locally in your browser</li>
              <li>No data is retained after analysis</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
            <p>
              We use Groq&apos;s API for tweet analysis. Please refer to <a href="https://groq.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">Groq&apos;s privacy policy</a> for information about how they handle data.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p>
              For privacy concerns or questions, please reach out to the <a href="https://github.com/danielpetho/unbaited/issues" className="underline" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
            </p>
          </section>
        </div>
      </main>
    );
  }