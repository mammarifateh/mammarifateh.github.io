import Link from 'next/link';
import type { ReactNode } from 'react';
import Mdx from './Mdx';
import { StatusBadge } from './Cards';
import { type Entry, formatDate, slugify } from '@/lib/content';

/** Shared layout for an article, a research project or a lab experiment. */
export default function EntryPage({ entry, back, aside, footer }: { entry: Entry; back: { href: string; label: string }; aside?: ReactNode; footer?: ReactNode }) {
  return (
    <article className="wrap">
      <header className="mx-auto max-w-3xl pt-12 pb-8 sm:pt-16">
        <Link href={back.href} className="text-sm faint hover:text-accent dark:hover:text-night-accent">
          ← {back.label}
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm faint">
          {entry.category && (
            <Link href={`/blog/category/${slugify(entry.category)}/`} className="font-medium text-accent hover:underline dark:text-night-accent">
              {entry.category}
            </Link>
          )}
          {entry.date && entry.status !== 'draft' && <span>· {formatDate(entry.date)}</span>}
          <StatusBadge status={entry.status} />
        </div>
        <h1 className="mt-3 font-serif text-3xl leading-tight font-semibold tracking-tight sm:text-[2.6rem]">{entry.title}</h1>
        {entry.summary && <p className="mt-4 text-lg leading-relaxed muted">{entry.summary}</p>}
        {aside}
      </header>
      <div className="mx-auto max-w-3xl">
        <Mdx source={entry.body} />
        {entry.tags.length > 0 && entry.collection === 'blog' && (
          <div className="mt-10 flex flex-wrap gap-1.5 border-t rule pt-6">
            {entry.tags.map((t) => (
              <Link key={t} href={`/blog/tag/${slugify(t)}/`} className="chip">
                {t}
              </Link>
            ))}
          </div>
        )}
        {footer}
      </div>
    </article>
  );
}
