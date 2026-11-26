import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/Cards';
import BlogExplorer from '@/components/BlogExplorer';
import { allTags, getPosts } from '@/lib/content';
import { categoryList, toLite } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Essays and notes on mechanics, applied mathematics, computational science and AI for science.',
  alternates: { canonical: '/blog/' },
};

export default function Blog() {
  const posts = getPosts();
  const tags = allTags();
  return (
    <div className="wrap">
      <PageHeader
        eyebrow="Blog"
        title="Notes on mechanics, mathematics and computation"
        intro="Essays, short scientific notes and research ideas. Entries marked “Draft · idea” are articles in preparation: their pages describe the planned scope, not finished results."
      />
      <BlogExplorer posts={posts.map(toLite)} categories={categoryList()} />
      <section className="mt-14 border-t rule pt-8">
        <h2 className="eyebrow mb-4">All tags</h2>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <Link key={t.slug} href={`/blog/tag/${t.slug}/`} className="chip">
              {t.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
