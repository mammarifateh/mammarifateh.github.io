import { blogCategories } from './site';
import { type Entry, formatDate, getPosts, slugify } from './content';
import type { PostLite } from '@/components/BlogExplorer';

export const toLite = (p: Entry): PostLite => ({
  slug: p.slug,
  title: p.title,
  summary: p.summary,
  category: p.category,
  categorySlug: p.category ? slugify(p.category) : undefined,
  tags: p.tags.map((t) => ({ label: t, slug: slugify(t) })),
  status: p.status,
  type: p.type,
  date: p.date,
  dateLabel: formatDate(p.date),
});

export function categoryList() {
  const posts = getPosts();
  return blogCategories.map((label) => ({ label, slug: slugify(label), count: posts.filter((p) => p.category === label).length }));
}
