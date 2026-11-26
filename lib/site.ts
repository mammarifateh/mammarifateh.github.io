/**
 * Site-wide identity and links. Edit this file to update your name, biography, links or navigation.
 * Contact links with `href: null` are hidden until you fill them in.
 */
export const site = {
  name: 'Fateh Mammari',
  title: 'Fateh Mammari · Researcher in Mechanical Engineering',
  position: 'Researcher in Mechanical Engineering',
  institution: 'University of Bejaia, Algeria',
  url: 'https://mammarifateh.github.io',
  description:
    'Fateh Mammari, researcher in mechanical engineering at the University of Bejaia: nonlinear bending of thin plates, surface elasticity and computational mechanics.',
  locale: 'en_US',
};

/** Short biography, shown on the homepage (revealed word by word). */
export const bio = [
  'I am a researcher in mechanical engineering at the University of Bejaia, Algeria.',
  'I work on the mechanics of thin plates, in particular their nonlinear bending and the role of surface effects at the nanoscale. I use approximate analytical methods together with numerical and finite-element simulations.',
];

/** Research directions, shown on the homepage and the Research page. */
export const directions = [
  { title: 'Nonlinear bending of thin plates', text: 'Large deflections of circular plates under pressure, and approximate load–deflection formulas.' },
  { title: 'Surface elasticity at the nanoscale', text: 'Gurtin–Murdoch surface elasticity applied to the bending of nanoplates.' },
  { title: 'Stability of shells', text: 'Spherical shells and snap-through instability.' },
  { title: 'Analytical and numerical methods', text: 'Galerkin-type approximations, compared with finite-difference and finite-element solutions.' },
];

export const tools = ['MATLAB', 'Maple', 'COMSOL Multiphysics', 'Python'];

export type ContactLink = { label: string; href: string | null; handle: string | null };

export const contacts: ContactLink[] = [
  { label: 'Email', href: 'mailto:fateh.mammari@univ-bejaia.dz', handle: 'fateh.mammari@univ-bejaia.dz' },
  { label: 'ORCID', href: 'https://orcid.org/0009-0005-8854-4241', handle: '0009-0005-8854-4241' },
  { label: 'GitHub', href: 'https://github.com/mammarifateh', handle: 'mammarifateh' },
  // Add your profile URLs here; they appear automatically once filled in.
  { label: 'Google Scholar', href: null, handle: null },
  { label: 'ResearchGate', href: null, handle: null },
];

export const nav = [
  { href: '/research/', label: 'Research' },
  { href: '/publications/', label: 'Publications' },
  { href: '/teaching/', label: 'Teaching' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contact/', label: 'Contact' },
];
