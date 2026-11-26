import type { Metadata } from 'next';
import { PageHeader } from '@/components/Cards';
import SiteSearch from '@/components/SiteSearch';
import { searchIndex } from '@/lib/content';

export const metadata: Metadata = { title: 'Search', alternates: { canonical: '/search/' }, robots: { index: false } };

export default function Search() {
  return (
    <div className="wrap max-w-3xl">
      <PageHeader eyebrow="Search" title="Search the site" />
      <SiteSearch index={searchIndex()} />
    </div>
  );
}
