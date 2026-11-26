import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * Content is stored as MDX files in /content/<collection>/<slug>.mdx.
 * The file name is the URL slug. Front matter fields are documented in /templates.
 */
const ROOT = path.join(process.cwd(), 'content');

export type Collection = 'blog' | 'publications';

export type Entry = {
  slug: string;
  collection: Collection;
  title: string;
  summary: string;
  date: string;
  body: string;
  type?: string;
  tags: string[];
  meta: Record<string, unknown>;
};

function readCollection(collection: Collection): Entry[] {
  const dir = path.join(ROOT, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
      return {
        slug: file.replace(/\.mdx$/, ''),
        collection,
        title: String(data.title ?? file),
        summary: String(data.summary ?? ''),
        date: data.date ? new Date(data.date).toISOString().slice(0, 10) : '',
        body: content,
        type: data.type,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        meta: data,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export const getPosts = () => readCollection('blog');
export const getPublications = () => readCollection('publications');
export const getEntry = (collection: Collection, slug: string) => readCollection(collection).find((e) => e.slug === slug);

export function formatDate(d: string) {
  if (!d) return '';
  return new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
