import type { Metadata } from 'next';
import { PageHeader } from '@/components/Cards';

export const metadata: Metadata = {
  title: 'Teaching',
  description: 'Teaching material: Analyse mathématique, course notes and corrected exercises in French.',
  alternates: { canonical: '/teaching/' },
};

export default function Teaching() {
  return (
    <div className="wrap max-w-3xl">
      <PageHeader eyebrow="Teaching" title="Teaching" />
      <a href="/analyse/" className="card block p-6">
        <p className="text-xs font-medium tracking-wide uppercase faint">In French</p>
        <h2 className="mt-1.5 font-serif text-xl font-semibold">Analyse mathématique</h2>
        <p className="mt-2 muted">Course notes and corrected exercises: numerical series, power series, Fourier series and the Fourier transform.</p>
        <p className="mt-4 text-sm text-accent dark:text-night-accent">Open →</p>
      </a>
    </div>
  );
}
