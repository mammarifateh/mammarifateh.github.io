import type { MetadataRoute } from 'next';
import { allTags, getDemos, getPosts, getProjects } from '@/lib/content';
import { categoryList } from '@/lib/blog';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${site.url}${p}`;
  const pages = ['/', '/about/', '/research/', '/publications/', '/blog/', '/lab/', '/ai-for-science/', '/resources/', '/contact/', '/analyse/'];
  return [
    ...pages.map((p) => ({ url: u(p) })),
    ...getProjects().map((p) => ({ url: u(`/research/${p.slug}/`) })),
    ...getPosts().map((p) => ({ url: u(`/blog/${p.slug}/`), ...(p.date && p.status !== 'draft' ? { lastModified: p.date } : {}) })),
    ...getDemos().map((p) => ({ url: u(`/lab/${p.slug}/`) })),
    ...allTags().map((t) => ({ url: u(`/blog/tag/${t.slug}/`) })),
    ...categoryList().map((c) => ({ url: u(`/blog/category/${c.slug}/`) })),
  ];
}
