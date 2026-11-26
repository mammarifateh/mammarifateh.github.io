'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/site';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const norm = (s: string) => (s.endsWith('/') ? s : s + '/');
  const isActive = (href: string) => norm(pathname ?? '/').startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b rule bg-paper/85 backdrop-blur-md dark:bg-night/85">
      <div className="wrap flex h-16 items-center gap-6">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name}, home`}>
          <Mark />
          <span className="whitespace-nowrap font-serif text-lg font-semibold tracking-tight">{site.name}</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? 'page' : undefined}
              className={`whitespace-nowrap rounded-md px-2.5 py-1.5 text-[13.5px] transition-colors ${
                isActive(n.href)
                  ? 'text-accent dark:text-night-accent'
                  : 'text-ink-2 hover:text-ink dark:text-night-ink-2 dark:hover:text-night-ink'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 xl:ml-2">
          <Link
            href="/search/"
            aria-label="Search"
            className="grid h-9 w-9 place-items-center rounded-md text-ink-2 hover:text-ink dark:text-night-ink-2 dark:hover:text-night-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-md xl:hidden"
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
        <nav id="mobile-nav" className="border-t rule xl:hidden" aria-label="Main">
          <ul className="wrap grid gap-0.5 py-3">
            <li>
              <Link href="/" className="block rounded-md px-2 py-2.5 text-[15px]">Home</Link>
            </li>
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? 'page' : undefined}
                  className={`block rounded-md px-2 py-2.5 text-[15px] ${isActive(n.href) ? 'text-accent dark:text-night-accent' : ''}`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

/** Monogram: a deflected plate line under a load arrow. */
function Mark() {
  return (
    <span className="grid h-8 w-8 place-items-center rounded-md border border-ink/80 dark:border-night-ink/70" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M12 3v6" />
        <path d="m9.5 7 2.5 2.5L14.5 7" />
        <path d="M3 13c3 0 5 4 9 4s6-4 9-4" className="text-accent dark:text-night-accent" stroke="currentColor" />
        <path d="M3 19h18" opacity=".4" />
      </svg>
    </span>
  );
}
