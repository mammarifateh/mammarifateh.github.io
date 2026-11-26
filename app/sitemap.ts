import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/content';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/research/', '/publications/', '/teaching/', '/blog/', '/contact/', '/analyse/'];
  return [...pages.map((p) => ({ url: `${site.url}${p}` })), ...getPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: p.date || undefined }))];
}
