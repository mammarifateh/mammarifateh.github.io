import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/Cards';
import { formatDate, getPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles and short notes by Fateh Mammari.',
  alternates: { canonical: '/blog/' },
};

export default function Blog() {
  const posts = getPosts();
  return (
    <div className="wrap max-w-3xl">
      <PageHeader eyebrow="Blog" title="Blog" />
      {posts.length === 0 && <p className="border-t rule pt-6 muted">No articles yet.</p>}
      {posts.map((p) => (
        <article key={p.slug} className="border-t rule py-6">
          <p className="text-xs faint">
            {formatDate(p.date)}
            {p.type === 'note' && ' · Note'}
          </p>
          <h2 className="mt-1 font-serif text-xl font-semibold">
            <Link href={`/blog/${p.slug}/`} className="hover:text-accent dark:hover:text-night-accent">
              {p.title}
            </Link>
          </h2>
          {p.summary && <p className="mt-1 muted">{p.summary}</p>}
        </article>
      ))}
    </div>
  );
}
