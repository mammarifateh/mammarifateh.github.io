import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap max-w-3xl py-24">
      <p className="eyebrow mb-4">404</p>
      <h1 className="h-page">Page not found.</h1>
      <Link href="/" className="link mt-6 inline-block">Back to the homepage</Link>
    </div>
  );
}
