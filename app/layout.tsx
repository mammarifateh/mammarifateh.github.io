import type { Metadata, Viewport } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import 'katex/dist/katex.min.css';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { contacts, site } from '@/lib/site';

const serif = Source_Serif_4({ subsets: ['latin'], variable: '--font-source-serif', display: 'swap' });
const sans = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  keywords: ['Fateh Mammari', 'nonlinear mechanics', 'nanoplates', 'surface elasticity', 'Gurtin–Murdoch', 'snap-through', 'spherical shells', 'finite element', 'computational mechanics', 'AI for science'],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: site.name, title: site.title, description: site.description, url: site.url, locale: site.locale },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description },
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f7f3' },
    { media: '(prefers-color-scheme: dark)', color: '#121417' },
  ],
};

// Applies the saved (or system) theme before first paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`;

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  jobTitle: site.position,
  affiliation: { '@type': 'CollegeOrUniversity', name: 'University of Bejaia' },
  email: 'mailto:fateh.mammari@univ-bejaia.dz',
  sameAs: contacts.filter((c) => c.href?.startsWith('http')).map((c) => c.href),
  knowsAbout: ['Nonlinear mechanics', 'Nanoplates', 'Surface elasticity', 'Shell stability', 'Finite element method'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
