'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

export type PostLite = {
  slug: string;
  title: string;
  summary: string;
  category?: string;
  categorySlug?: string;
  tags: { label: string; slug: string }[];
  status: string;
  type?: string;
  date: string;
  dateLabel: string;
};

/** Blog index with live search and category filter (all client-side, works on a static host). */
export default function BlogExplorer({ posts, categories }: { posts: PostLite[]; categories: { label: string; slug: string; count: number }[] }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string | null>(null);

  const shown = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter((p) => {
      if (cat && p.categorySlug !== cat) return false;
      const hay = `${p.title} ${p.summary} ${p.category} ${p.tags.map((t) => t.label).join(' ')}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [q, cat, posts]);

  return (
    <div className="grid gap-10 md:grid-cols-[1fr_230px]">
      <div>
        <label className="relative block">
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles, topics, tags…"
            className="w-full rounded-lg border rule bg-white/70 px-4 py-2.5 text-[15px] outline-none placeholder:text-ink-3 focus:border-accent dark:bg-night-2/70 dark:placeholder:text-night-ink-3 dark:focus:border-night-accent"
          />
        </label>
        <p className="mt-3 text-sm faint" aria-live="polite">
          {shown.length} {shown.length === 1 ? 'entry' : 'entries'}
          {cat && (
            <>
              {' '}
              in <strong>{categories.find((c) => c.slug === cat)?.label}</strong>{' '}
              <button type="button" className="link" onClick={() => setCat(null)}>
                show all
              </button>
            </>
          )}
        </p>
        <div className="mt-4">
          {shown.map((p) => (
            <article key={p.slug} className="group relative flex flex-col gap-2 border-t rule py-6">
              <div className="flex flex-wrap items-center gap-2 text-xs faint">
                {p.category && <span className="font-medium text-accent dark:text-night-accent">{p.category}</span>}
                {p.type === 'note' && <span>· Note</span>}
                {p.status !== 'draft' && p.dateLabel && <span>· {p.dateLabel}</span>}
                {p.status === 'draft' && <span className="badge badge-draft">Draft · idea</span>}
              </div>
              <h2 className="font-serif text-xl leading-snug font-semibold tracking-tight">
                <Link href={`/blog/${p.slug}/`} className="after:absolute after:inset-0 group-hover:text-accent dark:group-hover:text-night-accent">
                  {p.title}
                </Link>
              </h2>
              <p className="text-[15px] leading-relaxed muted">{p.summary}</p>
              <div className="relative z-10 mt-1 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Link key={t.slug} href={`/blog/tag/${t.slug}/`} className="chip">
                    {t.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
          {shown.length === 0 && <p className="border-t rule py-8 muted">Nothing matches this search yet.</p>}
        </div>
      </div>

      <aside className="order-first md:order-none">
        <h2 className="eyebrow mb-3">Categories</h2>
        <ul className="flex flex-wrap gap-1.5 md:grid md:gap-1">
          {categories.map((c) => (
            <li key={c.slug}>
              <button
                type="button"
                onClick={() => setCat(cat === c.slug ? null : c.slug)}
                aria-pressed={cat === c.slug}
                className={`flex w-full items-center justify-between gap-3 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors ${
                  cat === c.slug ? 'bg-accent-soft text-accent dark:bg-night-accent-soft dark:text-night-accent' : 'muted hover:text-ink dark:hover:text-night-ink'
                }`}
              >
                <span>{c.label}</span>
                <span className="text-xs faint tabular-nums">{c.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
