import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EntryPage from '@/components/EntryPage';
import { getDemos, getEntry } from '@/lib/content';

export const dynamicParams = false;
export const generateStaticParams = () => getDemos().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getEntry('lab', (await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, alternates: { canonical: `/lab/${p.slug}/` }, openGraph: { title: p.title, description: p.summary } };
}

export default async function Demo({ params }: { params: Promise<{ slug: string }> }) {
  const p = getEntry('lab', (await params).slug);
  if (!p) notFound();
  const tools = (p.meta.tools as string[] | undefined) ?? [];
  return (
    <EntryPage
      entry={p}
      back={{ href: '/lab/', label: 'Computational Lab' }}
      aside={
        tools.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {tools.map((m) => (
              <span key={m} className="chip">
                {m}
              </span>
            ))}
          </div>
        ) : null
      }
    />
  );
}
