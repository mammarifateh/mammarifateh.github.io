import Link from 'next/link';
import StreamingText from '@/components/StreamingText';
import { PublicationItem } from '@/components/Cards';
import { getPublications } from '@/lib/content';
import { bio, contacts, directions, site } from '@/lib/site';

export default function Home() {
  const pubs = getPublications();
  const links = contacts.filter((c) => c.href);

  return (
    <div className="wrap max-w-3xl">
      <section className="pt-16 pb-12 sm:pt-24">
        <p className="eyebrow mb-4">{site.position}</p>
        <h1 className="h-page">{site.name}</h1>
        <StreamingText paragraphs={bio} className="mt-6 grid gap-4 text-[17px] leading-[1.75] muted" />
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {links.map((c) => (
            <a key={c.label} href={c.href!} className="link" target={c.href!.startsWith('http') ? '_blank' : undefined} rel="me noopener">
              {c.label}
            </a>
          ))}
        </div>
      </section>

      <section className="border-t rule py-10">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="h-section">Research directions</h2>
          <Link href="/research/" className="link text-sm">More</Link>
        </div>
        <ul className="grid gap-2">
          {directions.map((d) => (
            <li key={d.title} className="text-[16px]">
              {d.title}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t rule py-10">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="h-section">Publications</h2>
          <Link href="/publications/" className="link text-sm">All, with citations</Link>
        </div>
        {pubs.map((p) => (
          <PublicationItem key={p.slug} p={p} compact />
        ))}
      </section>

      <section className="border-t rule py-10">
        <h2 className="h-section mb-3">Teaching</h2>
        <p className="muted">
          <a href="/analyse/" className="link">Analyse mathématique</a>: course notes and corrected exercises (in French) on series, power series, Fourier series and the Fourier transform.
        </p>
      </section>
    </div>
  );
}
