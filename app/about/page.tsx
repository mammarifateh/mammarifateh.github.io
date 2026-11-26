import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/Cards';
import { bio, otherInterests, researchInterests, site, tools } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `Biography, research interests and scientific interests of ${site.name}, ${site.position} at the ${site.institution}.`,
  alternates: { canonical: '/about/' },
};

export default function About() {
  return (
    <div className="wrap">
      <PageHeader eyebrow="About" title={site.name} intro={`${site.position} · ${site.institution}`} />

      <div className="grid gap-14 pb-10 md:grid-cols-[1fr_260px]">
        <div className="prose-sci">
          {bio.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
          <h2>What I work on</h2>
          <p>
            Much of my research concerns plates and shells at small scales. When a structure becomes very thin, the atoms near its surfaces behave differently
            from those in the bulk, and the surface can carry stresses of its own. The Gurtin–Murdoch theory of surface elasticity gives a continuum
            description of this effect, and I use it to study the nonlinear bending of nanoplates. A second line of work deals with stability: how spherical
            shells and similar structures reach limit points and snap through.
          </p>
          <p>
            My journal article on a closed-form model for the nonlinear bending of circular nanoplates with surface effects is listed on the{' '}
            <Link href="/publications/">Publications</Link> page. Ongoing and unpublished projects are described separately on the{' '}
            <Link href="/research/">Research</Link> page.
          </p>
          <h2>Beyond mechanics</h2>
          <p>
            I am interested in applied mathematics and computational science in general, and in what artificial intelligence can and cannot do for research.
            I write about these questions in the <Link href="/blog/">blog</Link> and in the <Link href="/ai-for-science/">AI for Science</Link> section. I also
            prepare teaching material in French, such as a set of{' '}
            <a href="/analyse/">corrected exercises in mathematical analysis</a> (series, power series, Fourier series and the Fourier transform).
          </p>
        </div>

        <aside className="grid content-start gap-8 text-sm">
          <section>
            <h2 className="eyebrow mb-3">Position</h2>
            <p>{site.position}</p>
            <p className="muted">{site.institution}</p>
          </section>
          <section>
            <h2 className="eyebrow mb-3">Research interests</h2>
            <ul className="grid gap-1.5 muted">
              {researchInterests.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="eyebrow mb-3">Tools</h2>
            <ul className="flex flex-wrap gap-1.5">
              {tools.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="eyebrow mb-3">Also interested in</h2>
            <ul className="grid gap-1.5 muted">
              {otherInterests.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="eyebrow mb-3">Academic background</h2>
            {/* Placeholder: add degrees and dates here. Nothing is shown publicly until you edit this block. */}
            <p className="muted">Details of degrees will be added here.</p>
          </section>
        </aside>
      </div>
    </div>
  );
}
