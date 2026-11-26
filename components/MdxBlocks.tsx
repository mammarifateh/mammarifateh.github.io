import type { ReactNode } from 'react';

/** <Callout title="Note">…</Callout>: a highlighted remark inside an article. */
export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="not-prose my-6 rounded-lg border-l-4 border-accent/50 bg-accent-soft/50 px-5 py-4 text-[15.5px] leading-relaxed dark:bg-night-accent-soft/40">
      {title && <p className="mb-1 text-xs font-semibold tracking-wider uppercase opacity-70">{title}</p>}
      <div className="[&_p]:my-1.5">{children}</div>
    </aside>
  );
}

/** <Figure src="/figures/x.png" alt="…" caption="…" /> */
export function Figure({ src, alt = '', caption }: { src: string; alt?: string; caption?: string }) {
  return (
    <figure className="not-prose my-8">
      <img src={src} alt={alt} className="w-full rounded-lg border rule" loading="lazy" />
      {caption && <figcaption className="mt-3 text-sm leading-relaxed faint">{caption}</figcaption>}
    </figure>
  );
}
