import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import 'katex/dist/katex.min.css';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { contacts, site } from '@/lib/site';


const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-plex-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  keywords: ['Fateh Mammari', 'thin structures', 'nanoplates', 'nanoshells', 'nonlinear bending', 'surface elasticity', 'Gurtin–Murdoch', 'snap-through', 'finite element'],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: site.name, title: site.title, description: site.description, url: site.url, locale: site.locale },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description },
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#212121' },
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
  knowsAbout: ['Thin plates', 'Nonlinear bending', 'Surface elasticity'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable} suppressHydrationWarning>
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
