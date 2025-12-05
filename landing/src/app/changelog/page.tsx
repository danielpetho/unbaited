import fs from 'fs'
import path from 'path'
import { marked } from 'marked'

export default async function Changelog() {
  const markdownContent = fs.readFileSync(
    path.join(process.cwd(), 'src/app/changelog/changelog.md'),
    'utf-8'
  )
  const content = marked(markdownContent)

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 font-mono lowercase">
      <div 
        className="[&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-8
                   [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-12
                   [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-4
                   [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:mt-2 [&>ul]:text-gray-600 dark:[&>ul]:text-gray-400
                   space-y-4"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </main>
  );
}
