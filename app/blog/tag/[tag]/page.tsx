import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader, PostCard } from '@/components/Cards';
import { allTags, getPosts, slugify } from '@/lib/content';

export const dynamicParams = false;
export const generateStaticParams = () => allTags().map((t) => ({ tag: t.slug }));

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const t = allTags().find((x) => x.slug === tag);
  return { title: t ? `Tag: ${t.label}` : 'Tag', alternates: { canonical: `/blog/tag/${tag}/` } };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const t = allTags().find((x) => x.slug === tag);
  if (!t) notFound();
  const posts = getPosts().filter((p) => p.tags.some((x) => slugify(x) === tag));
  return (
    <div className="wrap max-w-3xl">
      <PageHeader eyebrow="Tag" title={t.label} intro={`${posts.length} ${posts.length === 1 ? 'entry' : 'entries'}`} />
      {posts.map((p) => (
        <PostCard key={p.slug} post={p} />
      ))}
    </div>
  );
}
