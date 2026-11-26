import StreamingText from '@/components/StreamingText';
import CopyButton from '@/components/CopyButton';
import Mdx from '@/components/Mdx';
import { getPublications } from '@/lib/content';
import { bio, contacts, researchIntro, researchOutro, researchTopics, site } from '@/lib/site';

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
  const email = contacts.find((c) => c.label === 'Email');
  const profiles = contacts.filter((c) => c.label !== 'Email' && c.href);

  return (
    <div className="wrap pb-6">
      <header className="pt-14 pb-10 sm:pt-20">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{site.name}</h1>
        <p className="mt-2 muted">
          {site.position}
          <br />
          {site.institution}
        </p>
        <StreamingText className="mt-6 grid gap-3 text-[16.5px] leading-[1.75]">
          {bio.map((p) => (
            <p key={p.slice(0, 16)}>{p}</p>
          ))}
        </StreamingText>
      </header>

      <Section id="research" title="Research">
        <p className="leading-[1.75]">{researchIntro}</p>
        <ul className="my-5 grid list-disc gap-1.5 pl-5 marker:text-ink-3">
          {researchTopics.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="leading-[1.75] muted">{researchOutro}</p>
      </Section>

      <Section id="publications" title="Publications">
        <div className="grid gap-5">
          {pubs.map((p) => {
            const m = p.meta as Record<string, string | null | undefined>;
            const doiUrl = `https://doi.org/${m.doi}`;
            return (
              <article key={p.slug} id={p.slug} className="scroll-mt-20 rounded-2xl border rule p-5 sm:p-6">
                <p className="text-xs font-semibold tracking-wide uppercase faint">{m.kind}</p>
                <h3 className="mt-1.5 text-[17px] leading-snug font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-[14.5px] muted">{m.authors}.</p>
                <p className="text-[14.5px] muted">
                  <em>{m.venue}</em>.{m.online && <> Published online: {m.online}.</>}
                </p>
                {p.body.trim() && (
                  <div className="mt-4 text-[15.5px]">
                    <Mdx source={p.body} />
                  </div>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <a href={doiUrl} className="chip" target="_blank" rel="noopener">
                    {m.linkLabel ?? 'Read'} ↗
                  </a>
                  {m.pdf && (
                    <a href={m.pdf} className="chip">
                      PDF
                    </a>
                  )}
                  {m.bibtex && <CopyButton text={String(m.bibtex).trim()} label="Copy BibTeX" />}
                  <span className="text-xs faint">DOI: {m.doi}</span>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="teaching" title="Teaching">
        <p className="leading-[1.75]">
          I have teaching experience in mathematics and mechanics, including mathematical analysis, solid mechanics, and vibrations and waves. I also prepare mathematical summaries and exercises for students.
        </p>
        <a href="/analyse/" className="card mt-5 block p-5 sm:p-6">
          <p className="text-xs font-semibold tracking-wide uppercase faint">In French</p>
          <p className="mt-1.5 text-[17px] font-semibold">Analyse mathématique</p>
          <p className="mt-1 text-[15px] muted">Course summaries and worked exercises: numerical series, power series, Fourier series and the Fourier transform.</p>
        </a>
      </Section>

      <Section id="contact" title="Contact">
        <p className="leading-[1.75]">I welcome academic discussions, research collaborations, and opportunities related to mechanics and applied mathematics.</p>
        {email?.href && (
          <p className="mt-4">
            <span className="muted">Email: </span>
            <a href={email.href} className="link">
              {email.handle}
            </a>
          </p>
        )}
        <p className="mt-2">
          {profiles.map((c, i) => (
            <span key={c.label}>
              <a href={c.href!} className="link" target="_blank" rel="me noopener">
                {c.label}
              </a>
              {i < profiles.length - 1 ? <span className="faint"> · </span> : null}
            </span>
          ))}
        </p>
      </Section>
    </div>
  );
}
