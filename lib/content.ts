import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * Content is stored as MDX files in /content/<collection>/<slug>.mdx.
 * The file name is the URL slug. Front matter fields are documented in /templates.
 */
const ROOT = path.join(process.cwd(), 'content');

export type Collection = 'blog' | 'research' | 'lab' | 'publications';

export type Entry = {
  slug: string;
  collection: Collection;
  title: string;
  summary: string;
  date: string;
  body: string;
  /** blog: 'article' | 'note' */
  type?: string;
  category?: string;
  tags: string[];
  /** blog: 'draft' | 'published'; research: 'published' | 'ongoing'; lab: 'live' | 'planned' */
  status: string;
  featured?: boolean;
  order?: number;
  /** extra fields (authors, journal, doi, pdf, tools...) */
  meta: Record<string, unknown>;
};

function readCollection(collection: Collection): Entry[] {
  const dir = path.join(ROOT, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, '');
      return {
        slug,
        collection,
        title: String(data.title ?? slug),
        summary: String(data.summary ?? ''),
        date: data.date ? new Date(data.date).toISOString().slice(0, 10) : '',
        body: content,
        type: data.type,
        category: data.category,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        status: String(data.status ?? 'published'),
        featured: Boolean(data.featured),
        order: typeof data.order === 'number' ? data.order : undefined,
        meta: data,
      } satisfies Entry;
    });
}

const byDateDesc = (a: Entry, b: Entry) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
const byOrder = (a: Entry, b: Entry) => (a.order ?? 99) - (b.order ?? 99);

export const getPosts = () => readCollection('blog').sort((a, b) => byOrder(a, b) || byDateDesc(a, b));
export const getProjects = () => readCollection('research').sort(byOrder);
export const getDemos = () => readCollection('lab').sort(byOrder);
export const getPublications = () => readCollection('publications').sort(byDateDesc);

export function getEntry(collection: Collection, slug: string) {
  return readCollection(collection).find((e) => e.slug === slug);
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export function allTags() {
  const set = new Map<string, string>();
  for (const p of getPosts()) for (const t of p.tags) set.set(slugify(t), t);
  return [...set.entries()].map(([slug, label]) => ({ slug, label })).sort((a, b) => a.label.localeCompare(b.label));
}

/** Related posts: shared tags count twice, same category once. */
export function relatedPosts(post: Entry, n = 3) {
  return getPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score: p.tags.filter((t) => post.tags.includes(t)).length * 2 + (p.category === post.category ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.p);
}

export type SearchItem = { title: string; summary: string; href: string; kind: string; tags: string[]; text: string };

/** Index used by the client-side search page. */
export function searchIndex(): SearchItem[] {
  const strip = (s: string) =>
    s
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/[#*_>`$\\{}]/g, ' ')
      .replace(/\s+/g, ' ')
      .slice(0, 4000);
  const items: SearchItem[] = [];
  for (const p of getPosts())
    items.push({ title: p.title, summary: p.summary, href: `/blog/${p.slug}/`, kind: p.status === 'draft' ? 'Draft article' : p.type === 'note' ? 'Note' : 'Article', tags: [...p.tags, p.category ?? ''], text: strip(p.body) });
  for (const p of getProjects())
    items.push({ title: p.title, summary: p.summary, href: `/research/${p.slug}/`, kind: 'Research project', tags: p.tags, text: strip(p.body) });
  for (const p of getDemos())
    items.push({ title: p.title, summary: p.summary, href: `/lab/${p.slug}/`, kind: 'Computational Lab', tags: p.tags, text: strip(p.body) });
  for (const p of getPublications())
    items.push({ title: p.title, summary: p.summary, href: `/publications/#${p.slug}`, kind: 'Publication', tags: p.tags, text: strip(p.body) });
  const pages: [string, string, string][] = [
    ['About', '/about/', 'Biography, research interests and scientific interests of Fateh Mammari.'],
    ['AI for Science', '/ai-for-science/', 'How artificial intelligence can support scientific research: agents, automation, literature, workflows, reasoning.'],
    ['Resources', '/resources/', 'Curated scientific software, books, references and research tools.'],
    ['Contact', '/contact/', 'Email, ORCID, GitHub and academic profiles.'],
    ['Analyse mathématique (exercices corrigés)', '/analyse/', 'Séries numériques, séries entières, séries de Fourier, transformée de Fourier : cours et exercices corrigés en français.'],
  ];
  for (const [title, href, summary] of pages) items.push({ title, summary, href, kind: 'Page', tags: [], text: summary });
  return items;
}

export function formatDate(d: string) {
  if (!d) return '';
  return new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
