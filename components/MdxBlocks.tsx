import type { ReactNode } from 'react';

/**
 * <Callout kind="hypothesis">…</Callout>
 * Kinds make the epistemic status of a passage explicit:
 * established knowledge, personal interpretation, research hypothesis, ongoing work, or a plain note.
 */
const KINDS = {
  established: { label: 'Established result', cls: 'border-emerald-600/50 bg-emerald-50/60 dark:bg-emerald-950/20' },
  interpretation: { label: 'Personal interpretation', cls: 'border-accent/50 bg-accent-soft/60 dark:bg-night-accent-soft/40' },
  hypothesis: { label: 'Research hypothesis', cls: 'border-amber-600/50 bg-amber-50/60 dark:bg-amber-950/20' },
  ongoing: { label: 'Ongoing investigation', cls: 'border-violet-600/40 bg-violet-50/50 dark:bg-violet-950/20' },
  note: { label: 'Note', cls: 'border-rule bg-paper-2/60 dark:border-night-rule dark:bg-night-2/60' },
} as const;

export function Callout({ kind = 'note', title, children }: { kind?: keyof typeof KINDS; title?: string; children: ReactNode }) {
  const k = KINDS[kind] ?? KINDS.note;
  return (
    <aside className={`not-prose my-6 rounded-lg border-l-4 px-5 py-4 text-[15.5px] leading-relaxed ${k.cls}`}>
      <p className="mb-1 text-xs font-semibold tracking-wider uppercase opacity-70">{title ?? k.label}</p>
      <div className="[&_p]:my-1.5">{children}</div>
    </aside>
  );
}

/** <Figure src="/figures/x.png" caption="…" /> or wrap custom content: <Figure caption="…">…</Figure> */
export function Figure({ src, alt = '', caption, children }: { src?: string; alt?: string; caption?: string; children?: ReactNode }) {
  return (
    <figure className="not-prose my-8">
      {src ? <img src={src} alt={alt} className="w-full rounded-lg border rule" loading="lazy" /> : children}
      {caption && <figcaption className="mt-3 text-sm leading-relaxed faint">{caption}</figcaption>}
    </figure>
  );
}

/** Banner shown at the top of draft articles. */
export function Status({ children }: { children?: ReactNode }) {
  return (
    <div className="not-prose mb-8 rounded-lg border border-amber-500/40 bg-amber-50/70 px-5 py-4 text-[15px] leading-relaxed text-amber-900 dark:bg-amber-950/25 dark:text-amber-200">
      {children ?? 'This article is in preparation. What follows is the planned scope, not finished results.'}
    </div>
  );
}
