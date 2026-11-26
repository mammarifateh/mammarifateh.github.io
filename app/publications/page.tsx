import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/Cards';
import CopyButton from '@/components/CopyButton';
import Mdx from '@/components/Mdx';
import { getPublications } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Peer-reviewed publications of Fateh Mammari.',
  alternates: { canonical: '/publications/' },
};

export default function Publications() {
  const pubs = getPublications();
  return (
    <div className="wrap">
      <PageHeader eyebrow="Publications" title="Publications" intro="Peer-reviewed articles. Ongoing work is described on the Research page and is not listed here until it is published." />
      <ol className="grid gap-0">
        {pubs.map((p) => {
          const m = p.meta as Record<string, string | number | undefined>;
          const bibtex = String(m.bibtex ?? '').trim();
          return (
            <li key={p.slug} id={p.slug} className="scroll-mt-24 border-t rule py-10">
              <div className="grid gap-6 md:grid-cols-[120px_1fr]">
                <div className="text-sm faint">
                  <span className="font-serif text-3xl text-ink dark:text-night-ink">{m.year}</span>
                  <p className="mt-2">Journal article</p>
                </div>
                <div>
                  <h2 className="font-serif text-2xl leading-snug font-semibold tracking-tight">{p.title}</h2>
                  <p className="mt-2 muted">{m.authors}</p>
                  <p className="mt-1 text-[15px]">
                    <em>{m.journal}</em>, {m.volume}, {m.article} ({m.year})
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <a href={String(m.doi)} className="btn-primary" target="_blank" rel="noopener">
                      DOI: {String(m.doi).replace('https://doi.org/', '')}
                    </a>
                    {m.pdf ? (
                      <a href={String(m.pdf)} className="btn">
                        PDF
                      </a>
                    ) : (
                      <span className="btn cursor-default opacity-50" title="The PDF will be added when available">
                        PDF (coming)
                      </span>
                    )}
                    {m.project && (
                      <Link href={`/research/${m.project}/`} className="btn">
                        Project page
                      </Link>
                    )}
                  </div>
                  {p.body.trim() && (
                    <div className="mt-6">
                      <Mdx source={p.body} />
                    </div>
                  )}
                  {bibtex && (
                    <details className="mt-6 rounded-lg border rule">
                      <summary className="flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm font-medium">Cite (BibTeX)</summary>
                      <div className="border-t rule px-4 py-3">
                        <pre className="overflow-x-auto text-xs leading-relaxed">{bibtex}</pre>
                        <div className="mt-2">
                          <CopyButton text={bibtex} label="Copy BibTeX" />
                        </div>
                      </div>
                    </details>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
