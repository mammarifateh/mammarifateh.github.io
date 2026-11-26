import type { Metadata } from 'next';
import { PageHeader, ProjectCard } from '@/components/Cards';
import { getProjects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Research',
  description: 'Research areas and projects: nonlinear bending of nanoplates, surface elasticity, shell mechanics, snap-through instability and numerical modelling.',
  alternates: { canonical: '/research/' },
};

const areas = [
  ['Nonlinear bending of nanoplates', 'Large deflections of thin plates, where membrane stretching couples to bending and the response stops being linear in the load.'],
  ['Surface elasticity', 'The Gurtin–Murdoch continuum theory, in which the surface of a body is an elastic membrane with its own stress and stiffness, bonded to the bulk.'],
  ['Shell mechanics', 'Curved thin structures, and spherical shells in particular, where curvature couples bending and stretching from the outset.'],
  ['Snap-through instability', 'Limit points on the equilibrium path, beyond which a structure jumps to a distant configuration under a small increase of load.'],
  ['Numerical modelling', 'Finite-element simulations and numerical methods, used both to solve problems without closed-form solutions and to test analytical models.'],
];

export default function Research() {
  const projects = getProjects();
  const published = projects.filter((p) => p.status === 'published');
  const ongoing = projects.filter((p) => p.status !== 'published');
  return (
    <div className="wrap">
      <PageHeader
        eyebrow="Research"
        title="Thin structures, surfaces and stability"
        intro="I study how thin structures deform and lose stability, with a focus on small scales where surface effects matter. Published work and ongoing projects are listed separately below."
      />

      <section className="border-t rule py-10">
        <h2 className="eyebrow mb-6">Areas</h2>
        <dl className="grid gap-x-12 gap-y-6 md:grid-cols-2">
          {areas.map(([t, d]) => (
            <div key={t}>
              <dt className="font-serif text-lg font-semibold">{t}</dt>
              <dd className="mt-1 text-[15px] leading-relaxed muted">{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t rule py-10">
        <h2 className="h-section mb-1">Published research</h2>
        <p className="mb-6 text-sm faint">Work that has appeared in a peer-reviewed journal.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {published.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      <section className="border-t rule py-10">
        <h2 className="h-section mb-1">Ongoing and unpublished projects</h2>
        <p className="mb-6 text-sm faint">Work in progress. Descriptions state aims and methods, not results.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {ongoing.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
