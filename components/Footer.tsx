import Link from 'next/link';
import { contacts, nav, site } from '@/lib/site';

export default function Footer() {
  const links = contacts.filter((c) => c.href);
  return (
    <footer className="mt-24 border-t rule">
      <div className="wrap grid gap-10 py-12 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-lg font-semibold">{site.name}</p>
          <p className="mt-1 text-sm muted">
            {site.position}
            <br />
            {site.institution}
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">Site</p>
          <ul className="grid gap-1.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link className="muted hover:text-accent dark:hover:text-night-accent" href={n.href}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Elsewhere</p>
          <ul className="grid gap-1.5 text-sm">
            {links.map((c) => (
              <li key={c.label}>
                <a className="muted hover:text-accent dark:hover:text-night-accent" href={c.href!} rel="me noopener" target={c.href!.startsWith('http') ? '_blank' : undefined}>
                  {c.label}
                </a>
              </li>
            ))}
            <li>
              <a className="muted hover:text-accent dark:hover:text-night-accent" href="/analyse/">
                Analyse mathématique (FR)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-wrap justify-between gap-2 border-t rule py-5 text-xs faint">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Built with Next.js, MDX and KaTeX · Hosted on GitHub Pages</span>
      </div>
    </footer>
  );
}
