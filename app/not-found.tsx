import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap max-w-2xl py-24">
      <p className="eyebrow mb-4">404</p>
      <h1 className="h-page">This page does not exist.</h1>
      <p className="mt-4 muted">The link may be outdated. Try the search, or start from the homepage.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary">Homepage</Link>
        <Link href="/search/" className="btn">Search</Link>
      </div>
    </div>
  );
}
