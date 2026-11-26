import Link from 'next/link';
import StreamingText from '@/components/StreamingText';
import HeroFigure from '@/components/HeroFigure';
import { DemoCard, PostCard, ProjectCard } from '@/components/Cards';
import { getDemos, getPosts, getProjects, getPublications } from '@/lib/content';
import { bio, contacts, researchInterests, site } from '@/lib/site';

export default function Home() {
  const pub = getPublications()[0];
  const projects = getProjects().slice(0, 3);
  const posts = getPosts().slice(0, 3);
  const demos = getDemos().filter((d) => d.status === 'live').slice(0, 2);
  const links = contacts.filter((c) => c.href);

  return (
    <>
      {/* Hero */}
      <section className="wrap grid items-center gap-12 pt-14 pb-16 sm:pt-20 md:grid-cols-[1.25fr_1fr] md:gap-14">
        <div>
          <p className="eyebrow mb-5">
            {site.name} · {site.position}
          </p>
          <h1 className="h-display">{site.headline}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed muted">{site.subtitle}</p>
          <StreamingText paragraphs={bio} className="mt-7 grid max-w-xl gap-4 text-[16.5px] leading-[1.75]" />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/research/" className="btn-primary">
              Research
            </Link>
            <Link href="/publications/" className="btn">
              Publications
            </Link>
            <Link href="/blog/" className="btn">
              Blog
            </Link>
          </div>
        </div>
        <HeroFigure />
      </section>

      {/* Interests */}
      <section className="border-y rule bg-white/40 dark:bg-night-2/40">
        <div className="wrap grid gap-8 py-12 md:grid-cols-[200px_1fr]">
          <h2 className="eyebrow pt-1">Research interests</h2>
          <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {researchInterests.map((r, i) => (
              <li key={r} className="flex items-baseline gap-3 font-serif text-lg">
                <span className="font-sans text-xs faint tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured publication */}
      {pub && (
        <section className="wrap py-16">
          <div className="grid gap-8 md:grid-cols-[200px_1fr]">
            <h2 className="eyebrow pt-1">Featured publication</h2>
            <article>
              <p className="text-sm faint">
                {String(pub.meta.journal)}, {String(pub.meta.volume)}, {String(pub.meta.article)} ({String(pub.meta.year)})
              </p>
              <h3 className="mt-2 font-serif text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">{pub.title}</h3>
              <p className="mt-3 muted">{String(pub.meta.authors)}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={String(pub.meta.doi)} className="btn-primary" target="_blank" rel="noopener">
                  Read on the publisher&apos;s site (DOI)
                </a>
                <Link href={`/publications/#${pub.slug}`} className="btn">
                  Details and citation
                </Link>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Projects */}
      <section className="wrap py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="h-section">Selected research</h2>
          <Link href="/research/" className="link text-sm">
            All projects
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      {/* Writing */}
      <section className="wrap py-14">
        <div className="mb-2 flex items-end justify-between gap-4">
          <h2 className="h-section">Writing</h2>
          <Link href="/blog/" className="link text-sm">
            Blog
          </Link>
        </div>
        <p className="mb-4 text-sm faint">Articles in preparation. Each page shows its planned scope.</p>
        <div className="grid md:grid-cols-3 md:gap-8">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* Lab */}
      <section className="wrap py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="h-section">Computational Lab</h2>
          <Link href="/lab/" className="link text-sm">
            All experiments
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {demos.map((d) => (
            <DemoCard key={d.slug} d={d} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="wrap pt-14">
        <div className="rounded-2xl border rule px-6 py-10 sm:px-10">
          <h2 className="h-section">Get in touch</h2>
          <p className="mt-2 max-w-xl muted">For research questions, collaborations or comments on an article.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {links.map((c) => (
              <a key={c.label} href={c.href!} className="btn" target={c.href!.startsWith('http') ? '_blank' : undefined} rel="me noopener">
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
