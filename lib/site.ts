/**
 * Site-wide identity and links. Edit this file to update your name, biography, links or navigation.
 * Contact links with `href: null` are hidden until you fill them in.
 */
export const site = {
  name: 'Fateh Mammari',
  title: 'Fateh Mammari · PhD Candidate in Mechanical Engineering',
  position: 'PhD Candidate in Mechanical Engineering',
  institution: 'University of Bejaia, Algeria',
  url: 'https://mammarifateh.github.io',
  description:
    'Fateh Mammari, PhD candidate in mechanical engineering at the University of Bejaia: nonlinear bending of thin plates, surface elasticity of nanoplates, analytical and numerical methods.',
  locale: 'en_US',
};

/** Short biography, shown at the top of the page (revealed word by word). */
export const bio = [
  'I work on the mechanics of thin structures at small scales, with a particular interest in how surface effects influence the nonlinear behaviour of nanoplates and nanoshells.',
  'My research combines analytical modelling, numerical methods and finite-element simulations to study problems involving large deformation, instability and surface elasticity.',
  'This website is a place to share my research, publications, teaching materials and ideas.',
];

export const researchIntro = 'My research focuses on the nonlinear mechanics of thin structures, especially when surface effects become important at the nanoscale.';

export const researchTopics = [
  'Nonlinear bending of circular nanoplates',
  'Surface elasticity and the Gurtin–Murdoch model',
  'Snap-through instability of spherical caps',
  'Nonlinear plate and shell theories',
  'Analytical approximations and numerical continuation',
  'Finite-element validation of theoretical models',
];

export const researchOutro = 'I am particularly interested in understanding how surface stresses and surface elastic properties modify the mechanical response and stability of nanoscale structures.';

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
