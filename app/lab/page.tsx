import type { Metadata } from 'next';
import { DemoCard, PageHeader } from '@/components/Cards';
import { getDemos } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Computational Lab',
  description: 'Computational experiments, numerical simulations and interactive mathematical demonstrations.',
  alternates: { canonical: '/lab/' },
};

export default function Lab() {
  const demos = getDemos();
  const live = demos.filter((d) => d.status === 'live');
  const planned = demos.filter((d) => d.status !== 'live');
  return (
    <div className="wrap">
      <PageHeader
        eyebrow="Computational Lab"
        title="Experiments you can run in the browser"
        intro="Interactive demonstrations, numerical experiments and, later, MATLAB and Python projects with their code. Each entry states the model it is based on and what it does not show."
      />
      <section className="border-t rule py-10">
        <h2 className="h-section mb-6">Interactive demonstrations</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {live.map((d) => (
            <DemoCard key={d.slug} d={d} />
          ))}
        </div>
      </section>
      {planned.length > 0 && (
        <section className="border-t rule py-10">
          <h2 className="h-section mb-1">Planned</h2>
          <p className="mb-6 text-sm faint">Projects that are not built yet.</p>
          <div className="grid gap-4 md:grid-cols-2">
            {planned.map((d) => (
              <DemoCard key={d.slug} d={d} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
