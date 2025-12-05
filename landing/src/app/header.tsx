'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 py-4">
      <nav className="max-w-2xl mx-auto px-4">
        <ul className="flex gap-6 justify-end text-sm items-center">
          <li>
            <Link href="/" className="hover:underline">
              about
            </Link>
          </li>
          <li>
            <Link href="/changelog" className="hover:underline">
              changelog
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
          <li className="">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}