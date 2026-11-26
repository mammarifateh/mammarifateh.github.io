import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EntryPage from '@/components/EntryPage';
import { getEntry, getProjects } from '@/lib/content';

export const dynamicParams = false;
export const generateStaticParams = () => getProjects().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getEntry('research', (await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, alternates: { canonical: `/research/${p.slug}/` }, openGraph: { title: p.title, description: p.summary, type: 'article' } };
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const p = getEntry('research', (await params).slug);
  if (!p) notFound();
  const methods = (p.meta.methods as string[] | undefined) ?? [];
  return (
    <EntryPage
      entry={p}
      back={{ href: '/research/', label: 'Research' }}
      aside={
        methods.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {methods.map((m) => (
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
