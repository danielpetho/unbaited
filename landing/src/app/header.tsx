import Link from 'next/link';

export function Header() {
  return (
    <header className="w-full border-b border-gray-200 py-4">
      <nav className="max-w-2xl mx-auto px-4">
        <ul className="flex gap-4 justify-end text-sm">
          <li>
            <Link href="/" className="hover:underline">
              about
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:underline">
              privacy
            </Link>
          </li>
          <li>
            <a href="https://github.com/danielpetho/unbaited" target="_blank" rel="noopener noreferrer" className="hover:underline">
              github
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}