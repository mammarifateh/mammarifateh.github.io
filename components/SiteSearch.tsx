'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { SearchItem } from '@/lib/content';

/** Full-site search over a prebuilt index (titles weigh most, then summaries, tags and body). */
export default function SiteSearch({ index }: { index: SearchItem[] }) {
  const [q, setQ] = useState('');

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('q');
    if (p) setQ(p);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (q) url.searchParams.set('q', q);
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', url);
  }, [q]);

  const results = useMemo(() => {
    const terms = q
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .split(/\s+/)
      .filter(Boolean);
    if (!terms.length) return [];
    const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    return index
      .map((it) => {
        const t = norm(it.title);
        const s = norm(it.summary);
        const g = norm(it.tags.join(' '));
        const b = norm(it.text);
        let score = 0;
        for (const term of terms) {
          const hit = (t.includes(term) ? 6 : 0) + (s.includes(term) ? 3 : 0) + (g.includes(term) ? 3 : 0) + (b.includes(term) ? 1 : 0);
          if (!hit) return null;
          score += hit;
        }
        return { it, score };
      })
      .filter((x): x is { it: SearchItem; score: number } => x !== null)
      .sort((a, b) => b.score - a.score);
  }, [q, index]);

  return (
    <div>
      <label className="block">
        <span className="sr-only">Search the site</span>
        <input
          type="search"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try “snap-through”, “surface elasticity”, “Fourier”…"
          className="w-full rounded-lg border rule bg-white/70 px-4 py-3 text-lg outline-none placeholder:text-ink-3 focus:border-accent dark:bg-night-2/70 dark:placeholder:text-night-ink-3 dark:focus:border-night-accent"
        />
      </label>
      <p className="mt-3 text-sm faint" aria-live="polite">
        {q ? `${results.length} result${results.length === 1 ? '' : 's'}` : `${index.length} pages, articles, projects and experiments indexed`}
      </p>
      <ul className="mt-4">
        {results.map(({ it }) => (
          <li key={it.href} className="border-t rule py-5">
            <p className="text-xs faint">{it.kind}</p>
            <Link href={it.href} className="font-serif text-xl font-semibold hover:text-accent dark:hover:text-night-accent">
              {it.title}
            </Link>
            <p className="mt-1 text-[15px] muted">{it.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
