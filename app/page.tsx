import StreamingText from '@/components/StreamingText';
import CopyButton from '@/components/CopyButton';
import Mdx from '@/components/Mdx';
import { getPublications } from '@/lib/content';
import { bio, contacts, directions, site, tools } from '@/lib/site';

const accents = ['tag-teal', 'tag-blue', 'tag-rose', 'tag-amber'];

/** One exchange: a question bubble on the right, a streamed answer on the left. */
function Turn({ id, q, speed = 28, children }: { id?: string; q: string; speed?: number; children: React.ReactNode }) {
  return (
    <section id={id} className="grid scroll-mt-20 gap-5 py-6">
      <h2 className="ask font-normal">{q}</h2>
      <div className="answer">
        <span className="avatar max-sm:hidden" aria-hidden="true">∑</span>
        <StreamingText wordMs={speed} className="min-w-0 flex-1 text-[16px] leading-[1.75]">{children}</StreamingText>
      </div>
    </section>
  );
}

export default function Home() {
  const pubs = getPublications();
  const links = contacts.filter((c) => c.href);

  return (
    <div className="wrap pb-6">
      <header className="pt-14 pb-4 text-center sm:pt-20">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{site.name}</h1>
        <p className="mt-2 muted">
          {site.position} · {site.institution}
        </p>
      </header>

      <Turn q="Who are you?">
        <div className="grid gap-3">
          {bio.map((p) => (
            <p key={p.slice(0, 16)}>{p}</p>
          ))}
        </div>
      </Turn>

      <Turn id="research" q="What do you work on?">
        <ul className="grid gap-2.5">
          {directions.map((d, i) => (
            <li key={d.title}>
              <span className={`font-semibold ${accents[i % accents.length]}`}>{d.title}.</span> {d.text}
            </li>
          ))}
        </ul>
        <p className="mt-3 muted">Tools I use: {tools.join(', ')}.</p>
      </Turn>

      <Turn id="publications" q="What have you published?" speed={12}>
        <div className="grid gap-7">
          {pubs.map((p, i) => {
            const m = p.meta as Record<string, string | null | undefined>;
            return (
              <article key={p.slug} id={p.slug} className="scroll-mt-20">
                <p className={`text-xs font-semibold tracking-wide uppercase ${i % 2 ? 'tag-teal' : 'tag-blue'}`}>{m.kind}</p>
                <h3 className="mt-1 leading-snug font-semibold">
                  <a href={`https://doi.org/${m.doi}`} target="_blank" rel="noopener" className="hover:text-accent dark:hover:text-night-accent">
                    {p.title}
                  </a>
                </h3>
                <p className="mt-1 text-[14.5px] leading-relaxed muted">
                  {m.authors}. <em>{m.venue}</em>.
                </p>
                {p.body.trim() && (
                  <div className="mt-2.5 text-[15.5px]">
                    <Mdx source={p.body} />
                  </div>
                )}
                <div className="stream-skip mt-3 flex flex-wrap gap-2">
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
      </Turn>

      <Turn id="teaching" q="Do you teach?">
        <p>
          I share course notes and corrected exercises, in French, on numerical series, power series, Fourier series and the Fourier transform:{' '}
          <a href="/analyse/" className="link">Analyse mathématique</a>.
        </p>
      </Turn>

      <Turn id="contact" q="How can I contact you?">
        <p>
          {links.map((c, i) => (
            <span key={c.label}>
              <a href={c.href!} className="link" target={c.href!.startsWith('http') ? '_blank' : undefined} rel="me noopener">
                {c.label === 'Email' ? c.handle : c.label}
              </a>
              {i < links.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </p>
      </Turn>
    </div>
  );
}
