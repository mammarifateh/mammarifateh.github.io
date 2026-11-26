import type { Metadata } from 'next';
import { PageHeader } from '@/components/Cards';
import CopyButton from '@/components/CopyButton';
import { contacts, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${site.name}: email, ORCID, GitHub and academic profiles.`,
  alternates: { canonical: '/contact/' },
};

export default function Contact() {
  const email = contacts.find((c) => c.label === 'Email');
  const profiles = contacts.filter((c) => c.label !== 'Email' && c.href);
  return (
    <div className="wrap max-w-3xl">
      <PageHeader eyebrow="Contact" title="Contact" intro="I am happy to hear from researchers and students about mechanics, computation, the articles on this site, or possible collaborations." />

      {email?.href && (
        <section className="border-t rule py-8">
          <h2 className="eyebrow mb-3">Email</h2>
          <div className="flex flex-wrap items-center gap-3">
            <a href={email.href} className="font-serif text-2xl hover:text-accent dark:hover:text-night-accent">
              {email.handle}
            </a>
            <CopyButton text={email.handle!} label="Copy address" />
          </div>
        </section>
      )}

      <section className="border-t rule py-8">
        <h2 className="eyebrow mb-4">Academic profiles</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {profiles.map((c) => (
            <li key={c.label}>
              <a href={c.href!} target="_blank" rel="me noopener" className="card flex items-center justify-between px-4 py-3">
                <span>
                  <span className="block font-medium">{c.label}</span>
                  <span className="text-sm faint">{c.handle}</span>
                </span>
                <span className="faint">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t rule py-8">
        <h2 className="eyebrow mb-3">Affiliation</h2>
        <p>{site.position}</p>
        <p className="muted">{site.institution}</p>
      </section>
    </div>
  );
}
