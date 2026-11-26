import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Mdx from '@/components/Mdx';
import { formatDate, getEntry, getPosts } from '@/lib/content';

export const dynamicParams = false;

// A static export needs at least one path; with no articles yet, a hidden placeholder path is generated and returns 404.
const EMPTY = '_none';
export const generateStaticParams = () => {
  const posts = getPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: EMPTY }];
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getEntry('blog', (await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, alternates: { canonical: `/blog/${p.slug}/` }, openGraph: { title: p.title, description: p.summary, type: 'article' } };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const p = getEntry('blog', (await params).slug);
  if (!p) notFound();
  return (
    <article className="wrap max-w-3xl">
      <header className="pt-12 pb-8 sm:pt-16">
        <Link href="/blog/" className="text-sm faint hover:text-accent dark:hover:text-night-accent">
          ← Blog
        </Link>
        <p className="mt-6 text-sm faint">{formatDate(p.date)}</p>
        <h1 className="mt-2 font-serif text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">{p.title}</h1>
        {p.summary && <p className="mt-4 text-lg muted">{p.summary}</p>}
      </header>
      <Mdx source={p.body} />
    </article>
  );
}
