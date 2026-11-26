import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EntryPage from '@/components/EntryPage';
import { PostCard } from '@/components/Cards';
import { getEntry, getPosts, relatedPosts } from '@/lib/content';
import { site } from '@/lib/site';

export const dynamicParams = false;
export const generateStaticParams = () => getPosts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getEntry('blog', (await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/blog/${p.slug}/` },
    openGraph: { title: p.title, description: p.summary, type: 'article', authors: [site.name], tags: p.tags },
    robots: p.status === 'draft' ? { index: true, follow: true } : undefined,
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const p = getEntry('blog', (await params).slug);
  if (!p) notFound();
  const related = relatedPosts(p);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.summary,
    author: { '@type': 'Person', name: site.name, url: site.url },
    url: `${site.url}/blog/${p.slug}/`,
    keywords: p.tags.join(', '),
    ...(p.status !== 'draft' && p.date ? { datePublished: p.date } : {}),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <EntryPage
        entry={p}
        back={{ href: '/blog/', label: 'Blog' }}
        footer={
          related.length > 0 ? (
            <section className="mt-14">
              <h2 className="eyebrow mb-2">Related</h2>
              {related.map((r) => (
                <PostCard key={r.slug} post={r} compact />
              ))}
            </section>
          ) : null
        }
      />
    </>
  );
}
