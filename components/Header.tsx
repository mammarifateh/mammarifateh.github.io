'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/site';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const current = pathname.endsWith('/') ? pathname : pathname + '/';
  const isActive = (href: string) => current.startsWith(href);
  const linkCls = (href: string) =>
    isActive(href) ? 'text-accent dark:text-night-accent' : 'text-ink-2 hover:text-ink dark:text-night-ink-2 dark:hover:text-night-ink';

  return (
    <header className="sticky top-0 z-40 border-b rule bg-paper/85 backdrop-blur-md dark:bg-night/85">
      <div className="wrap flex h-16 max-w-3xl items-center gap-6">
        <Link href="/" className="font-serif text-lg font-semibold tracking-tight whitespace-nowrap">
          {site.name}
        </Link>
        <nav className="ml-auto hidden items-center gap-1 sm:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? 'page' : undefined} className={`rounded-md px-2.5 py-1.5 text-sm ${linkCls(n.href)}`}>
              {n.label}
            </Link>
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
                <Link href={n.href} aria-current={isActive(n.href) ? 'page' : undefined} className={`block rounded-md px-2 py-2.5 text-[15px] ${linkCls(n.href)}`}>
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
