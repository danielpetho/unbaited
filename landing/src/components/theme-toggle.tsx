'use client';

import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-md w-[34px] h-[34px]"
        aria-label="Toggle theme"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="text-foreground"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '[dark mode]' : '[light mode]'}
    </button>
  );
}
