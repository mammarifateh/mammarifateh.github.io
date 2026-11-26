import Link from 'next/link';
import { type Entry, formatDate, slugify } from '@/lib/content';

export function StatusBadge({ status }: { status: string }) {
  if (status === 'draft') return <span className="badge badge-draft">Draft · idea</span>;
  if (status === 'ongoing') return <span className="badge badge-ongoing">Ongoing</span>;
  if (status === 'planned') return <span className="badge badge-draft">Planned</span>;
  if (status === 'published') return <span className="badge badge-published">Published</span>;
  if (status === 'live') return <span className="badge badge-published">Interactive</span>;
  return null;
}

export function PostCard({ post, compact = false }: { post: Entry; compact?: boolean }) {
  return (
    <article className="group relative flex flex-col gap-2 border-t rule py-6">
      <div className="flex flex-wrap items-center gap-2 text-xs faint">
        {post.category && (
          <Link href={`/blog/category/${slugify(post.category)}/`} className="relative z-10 font-medium text-accent hover:underline dark:text-night-accent">
            {post.category}
          </Link>
        )}
        {post.type === 'note' && <span>· Note</span>}
        {post.status !== 'draft' && post.date && <span>· {formatDate(post.date)}</span>}
        <StatusBadge status={post.status} />
      </div>
      <h3 className="font-serif text-xl leading-snug font-semibold tracking-tight">
        <Link href={`/blog/${post.slug}/`} className="after:absolute after:inset-0 group-hover:text-accent dark:group-hover:text-night-accent">
          {post.title}
        </Link>
      </h3>
      {!compact && <p className="muted text-[15px] leading-relaxed">{post.summary}</p>}
      {!compact && post.tags.length > 0 && (
        <div className="relative z-10 mt-1 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <Link key={t} href={`/blog/tag/${slugify(t)}/`} className="chip">
              {t}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}

export function ProjectCard({ p }: { p: Entry }) {
  return (
    <Link href={`/research/${p.slug}/`} className="card group flex flex-col gap-3 p-5">
      <div className="flex items-center gap-2">
        <StatusBadge status={p.status} />
      </div>
      <h3 className="font-serif text-lg leading-snug font-semibold group-hover:text-accent dark:group-hover:text-night-accent">{p.title}</h3>
      <p className="muted text-sm leading-relaxed">{p.summary}</p>
    </Link>
  );
}

export function DemoCard({ d }: { d: Entry }) {
  return (
    <Link href={`/lab/${d.slug}/`} className="card group flex flex-col gap-3 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={d.status} />
        {(d.meta.tools as string[] | undefined)?.map((t) => (
          <span key={t} className="text-xs faint">
            {t}
          </span>
        ))}
      </div>
      <h3 className="font-serif text-lg leading-snug font-semibold group-hover:text-accent dark:group-hover:text-night-accent">{d.title}</h3>
      <p className="muted text-sm leading-relaxed">{d.summary}</p>
    </Link>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: React.ReactNode }) {
  return (
    <header className="pt-14 pb-10 sm:pt-20">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h1 className="h-page max-w-3xl">{title}</h1>
      {intro && <div className="mt-5 max-w-2xl text-lg leading-relaxed muted">{intro}</div>}
    </header>
  );
}
