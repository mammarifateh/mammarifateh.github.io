import { site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="mt-20 border-t rule">
      <div className="wrap flex max-w-3xl flex-wrap justify-between gap-2 py-6 text-xs faint">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>This website is a work in progress.</span>
      </div>
    </footer>
  );
}
