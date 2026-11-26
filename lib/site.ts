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
    'Fateh Mammari, researcher in mechanical engineering at the University of Bejaia: nonlinear bending of thin plates, surface elasticity of nanoplates, analytical and numerical methods.',
  locale: 'en_US',
};

/** Short biography, shown at the top of the page (revealed word by word). */
export const bio = [
  'My research concerns the mechanics of thin plates, in particular large-deflection bending and size-dependent surface effects in nanoplates. I develop approximate analytical solutions and assess them against finite-difference and finite-element results.',
];

/** Research directions. */
export const directions = [
  { title: 'Nonlinear bending of thin plates', text: 'Large-deflection response of clamped circular plates under uniform pressure, and approximate load–deflection relations.' },
  { title: 'Surface elasticity of nanoplates', text: 'Size-dependent behaviour of nanoplates described by Gurtin–Murdoch surface elasticity within the Föppl–von Kármán framework.' },
  { title: 'Stability of shells', text: 'Snap-through instability of spherical shells.' },
  { title: 'Analytical and numerical methods', text: 'Galerkin and collocation approximations, verified against finite-difference and finite-element solutions.' },
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
  { href: '/#research', label: 'Research' },
  { href: '/#publications', label: 'Publications' },
  { href: '/#teaching', label: 'Teaching' },
  { href: '/#contact', label: 'Contact' },
];
