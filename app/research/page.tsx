import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/Cards';
import { directions, tools } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Research',
  description: 'Research directions: nonlinear bending of thin plates, surface elasticity, stability of shells, analytical and numerical methods.',
  alternates: { canonical: '/research/' },
};

export default function Research() {
  return (
    <div className="wrap max-w-3xl">
      <PageHeader eyebrow="Research" title="Research directions" />
      <dl className="grid gap-6">
        {directions.map((d) => (
          <div key={d.title} className="border-t rule pt-5">
            <dt className="font-serif text-lg font-semibold">{d.title}</dt>
            <dd className="mt-1 muted">{d.text}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-10 border-t rule pt-6 text-[15px] muted">
        Tools: {tools.join(', ')}. Published work is listed on the <Link href="/publications/" className="link">Publications</Link> page.
      </p>
    </div>
  );
}
