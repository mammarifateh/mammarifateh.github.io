'use client';

import Link from 'next/link';
import { useState } from 'react';
import { nav, site } from '@/lib/site';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b rule bg-paper/85 backdrop-blur-md dark:bg-night/85">
      <div className="wrap flex h-16 items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight whitespace-nowrap">
          <span className="avatar h-7 w-7 text-[14px]" aria-hidden="true">∑</span>
          {site.name}
        </Link>
        <nav className="ml-auto hidden items-center gap-1 sm:flex" aria-label="Main">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="rounded-md px-2.5 py-1.5 text-sm text-ink-2 hover:text-ink dark:text-night-ink-2 dark:hover:text-night-ink">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center sm:ml-0">
          <ThemeToggle />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-md sm:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t rule sm:hidden" aria-label="Main">
          <ul className="wrap grid gap-0.5 py-3">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block rounded-md px-2 py-2.5 text-[15px] text-ink-2 dark:text-night-ink-2">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
