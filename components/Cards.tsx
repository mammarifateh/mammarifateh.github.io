import type { Entry } from '@/lib/content';
import CopyButton from './CopyButton';

export function PageHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: React.ReactNode }) {
  return (
    <header className="pt-14 pb-8 sm:pt-20">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h1 className="h-page">{title}</h1>
      {intro && <div className="mt-4 text-lg leading-relaxed muted">{intro}</div>}
    </header>
  );
}

/** One publication: title, authors, venue, DOI link, optional PDF and BibTeX. */
export function PublicationItem({ p, compact = false }: { p: Entry; compact?: boolean }) {
  const m = p.meta as Record<string, string | null | undefined>;
  const doiUrl = m.doi ? `https://doi.org/${m.doi}` : null;
  const bibtex = String(m.bibtex ?? '').trim();
  return (
    <article id={p.slug} className="scroll-mt-24 border-t rule py-6 first:border-t-0">
      <p className="text-xs font-medium tracking-wide uppercase faint">{m.kind}</p>
      <h3 className="mt-1.5 font-serif text-lg leading-snug font-semibold">
        {doiUrl ? (
          <a href={doiUrl} target="_blank" rel="noopener" className="hover:text-accent dark:hover:text-night-accent">
            {p.title}
          </a>
        ) : (
          p.title
        )}
      </h3>
      <p className="mt-1 text-[15px] muted">{m.authors}</p>
      <p className="text-[15px] italic muted">{m.venue}</p>
      {!compact && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          {doiUrl && (
            <a href={doiUrl} className="chip" target="_blank" rel="noopener">
              DOI: {m.doi}
            </a>
          )}
          {m.pdf && (
            <a href={m.pdf} className="chip">
              PDF
            </a>
          )}
          {bibtex && <CopyButton text={bibtex} label="Copy BibTeX" />}
        </div>
      )}
    </article>
  );
}
