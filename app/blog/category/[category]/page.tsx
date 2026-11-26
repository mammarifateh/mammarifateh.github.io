import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeader, PostCard } from '@/components/Cards';
import { getPosts, slugify } from '@/lib/content';
import { categoryList } from '@/lib/blog';

export const dynamicParams = false;
export const generateStaticParams = () => categoryList().map((c) => ({ category: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = categoryList().find((x) => x.slug === category);
  return { title: c ? c.label : 'Category', alternates: { canonical: `/blog/category/${category}/` } };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = categoryList().find((x) => x.slug === category);
  if (!c) notFound();
  const posts = getPosts().filter((p) => p.category && slugify(p.category) === category);
  return (
    <div className="wrap max-w-3xl">
      <PageHeader eyebrow="Category" title={c.label} intro={`${posts.length} ${posts.length === 1 ? 'entry' : 'entries'}`} />
      {posts.map((p) => (
        <PostCard key={p.slug} post={p} />
      ))}
      {posts.length === 0 && (
        <p className="border-t rule py-8 muted">
          No entries in this category yet. <Link href="/blog/" className="link">Back to the blog</Link>
        </p>
      )}
    </div>
  );
}
