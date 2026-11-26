import type { Metadata } from 'next';
import { PageHeader, PublicationItem } from '@/components/Cards';
import { getPublications } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Publications of Fateh Mammari.',
  alternates: { canonical: '/publications/' },
};

export default function Publications() {
  return (
    <div className="wrap max-w-3xl">
      <PageHeader eyebrow="Publications" title="Publications" />
      {getPublications().map((p) => (
        <PublicationItem key={p.slug} p={p} />
      ))}
    </div>
  );
}
