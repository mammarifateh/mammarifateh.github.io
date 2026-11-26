import StreamingText from '@/components/StreamingText';
import CopyButton from '@/components/CopyButton';
import Mdx from '@/components/Mdx';
import { getPublications } from '@/lib/content';
import { bio, contacts, directions, site, tools } from '@/lib/site';

const accents = ['tag-teal', 'tag-blue', 'tag-rose', 'tag-amber'];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t rule py-10">
      <h2 className="h-section mb-5">{title}</h2>
      {children}
    </section>
  );
}

export default function Home() {
  const pubs = getPublications();
  const links = contacts.filter((c) => c.href);

  return (
    <div className="wrap pb-6">
      <header className="pt-14 pb-10 sm:pt-20">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{site.name}</h1>
        <p className="mt-2 muted">
          {site.position} · {site.institution}
        </p>
        <StreamingText className="mt-6 grid gap-3 text-[16.5px] leading-[1.75]">
          {bio.map((p) => (
            <p key={p.slice(0, 16)}>{p}</p>
          ))}
        </StreamingText>
      </header>

      <Section id="research" title="Research directions">
        <ul className="grid gap-3">
          {directions.map((d, i) => (
            <li key={d.title}>
              <span className={`font-semibold ${accents[i % accents.length]}`}>{d.title}.</span> <span className="muted">{d.text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[15px] muted">Tools: {tools.join(', ')}.</p>
      </Section>

      <Section id="publications" title="Publications">
        <div className="grid gap-5">
          {pubs.map((p, i) => {
            const m = p.meta as Record<string, string | null | undefined>;
            return (
              <article key={p.slug} id={p.slug} className="scroll-mt-20 rounded-2xl border rule p-5 sm:p-6">
                <p className={`text-xs font-semibold tracking-wide uppercase ${i % 2 ? 'tag-teal' : 'tag-blue'}`}>{m.kind}</p>
                <h3 className="mt-1.5 text-[17px] leading-snug font-semibold">
                  <a href={`https://doi.org/${m.doi}`} target="_blank" rel="noopener" className="hover:text-accent dark:hover:text-night-accent">
                    {p.title}
                  </a>
                </h3>
                <p className="mt-1.5 text-[14.5px] muted">{m.authors}</p>
                <p className="text-[14.5px] italic muted">{m.venue}</p>
                {p.body.trim() && (
                  <div className="mt-4 text-[15.5px]">
                    <Mdx source={p.body} />
                  </div>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={`https://doi.org/${m.doi}`} className="chip" target="_blank" rel="noopener">
                    DOI: {m.doi}
                  </a>
                  {m.pdf && (
                    <a href={m.pdf} className="chip">
                      PDF
                    </a>
                  )}
                  {m.bibtex && <CopyButton text={String(m.bibtex).trim()} label="Copy BibTeX" />}
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="teaching" title="Teaching">
        <a href="/analyse/" className="card block p-5 sm:p-6">
          <p className="text-xs font-semibold tracking-wide uppercase tag-rose">In French</p>
          <p className="mt-1.5 text-[17px] font-semibold">Analyse mathématique</p>
          <p className="mt-1 text-[15px] muted">Course notes and corrected exercises: numerical series, power series, Fourier series and the Fourier transform.</p>
        </a>
      </Section>

      <Section id="contact" title="Contact">
        <ul className="grid gap-2">
          {links.map((c) => (
            <li key={c.label} className="text-[15.5px]">
              <span className="inline-block w-20 muted">{c.label}</span>
              <a href={c.href!} className="link" target={c.href!.startsWith('http') ? '_blank' : undefined} rel="me noopener">
                {c.handle}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
