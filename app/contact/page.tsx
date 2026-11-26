import type { Metadata } from 'next';
import { PageHeader } from '@/components/Cards';
import CopyButton from '@/components/CopyButton';
import { contacts, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${site.name}.`,
  alternates: { canonical: '/contact/' },
};

export default function Contact() {
  const email = contacts.find((c) => c.label === 'Email');
  const profiles = contacts.filter((c) => c.label !== 'Email' && c.href);
  return (
    <div className="wrap max-w-3xl">
      <PageHeader eyebrow="Contact" title="Contact" />
      {email?.href && (
        <section className="border-t rule py-6">
          <div className="flex flex-wrap items-center gap-3">
            <a href={email.href} className="font-serif text-xl hover:text-accent dark:hover:text-night-accent">
              {email.handle}
            </a>
            <CopyButton text={email.handle!} label="Copy" />
          </div>
        </section>
      )}
      <ul className="grid gap-2 border-t rule py-6">
        {profiles.map((c) => (
          <li key={c.label}>
            <a href={c.href!} target="_blank" rel="me noopener" className="link">
              {c.label}
            </a>
            <span className="ml-2 text-sm faint">{c.handle}</span>
          </li>
        ))}
      </ul>
      <p className="border-t rule pt-6 muted">{site.institution}</p>
    </div>
  );
}
