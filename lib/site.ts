/**
 * Site-wide identity and links. Edit this file to update your name, links or navigation.
 * Values set to `null` are placeholders: they are hidden on the site until you fill them in.
 */
export const site = {
  name: 'Fateh Mammari',
  title: 'Fateh Mammari · Mechanics, mathematics and computation',
  position: 'PhD Candidate in Mechanical Engineering',
  institution: 'University of Bejaia, Algeria',
  url: 'https://mammarifateh.github.io',
  headline: 'Exploring the mechanics of the physical world.',
  subtitle:
    'Research, mathematical ideas, computational experiments and reflections on the intersection of engineering and artificial intelligence.',
  description:
    'Personal research website of Fateh Mammari, PhD candidate in mechanical engineering at the University of Bejaia: nonlinear mechanics, nanoplates, surface elasticity, shell stability and computational modelling.',
  locale: 'en_US',
};

/** Short biography, shown on the homepage (streamed in) and on the About page. */
export const bio = [
  'I am a PhD candidate in Mechanical Engineering at the University of Bejaia, Algeria. My work is about how thin structures behave when classical assumptions start to strain: nanoplates whose surfaces carry their own elasticity, plates that bend far beyond the linear regime, and shells that lose stability and snap through.',
  'I approach these questions through mathematics first, then computation: closed-form models, numerical analysis, and finite-element simulations used to test them. This site gathers my research, mathematical notes, computational experiments, and reflections on how artificial intelligence may change the way science is done.',
];

export type ContactLink = { label: string; href: string | null; handle: string | null; note?: string };

export const contacts: ContactLink[] = [
  { label: 'Email', href: 'mailto:fateh.mammari@univ-bejaia.dz', handle: 'fateh.mammari@univ-bejaia.dz' },
  { label: 'ORCID', href: 'https://orcid.org/0009-0005-8854-4241', handle: '0009-0005-8854-4241' },
  { label: 'GitHub', href: 'https://github.com/mammarifateh', handle: 'mammarifateh' },
  // Placeholders: add your profile URLs and handles, they will then appear automatically.
  { label: 'Google Scholar', href: null, handle: null },
  { label: 'ResearchGate', href: null, handle: null },
  { label: 'LinkedIn', href: null, handle: null },
];

export const nav = [
  { href: '/about/', label: 'About' },
  { href: '/research/', label: 'Research' },
  { href: '/publications/', label: 'Publications' },
  { href: '/blog/', label: 'Blog' },
  { href: '/lab/', label: 'Computational Lab' },
  { href: '/ai-for-science/', label: 'AI for Science' },
  { href: '/resources/', label: 'Resources' },
  { href: '/contact/', label: 'Contact' },
];

export const researchInterests = [
  'Nonlinear mechanics',
  'Nanoplates and nanoscale structures',
  'Gurtin–Murdoch surface elasticity',
  'Nonlinear bending and stability',
  'Spherical shells and snap-through instability',
  'Mathematical modelling and numerical analysis',
];

export const tools = ['MATLAB', 'Maple', 'COMSOL Multiphysics', 'Python', 'Finite-element methods', 'AI-assisted scientific research'];

export const otherInterests = [
  'Applied mathematics',
  'Computational science',
  'Artificial intelligence',
  'Scientific discovery',
  'Interdisciplinary research',
];

export const blogCategories = [
  'Mechanics and Engineering',
  'Applied Mathematics',
  'Computational Science',
  'AI for Science',
  'Scientific Reflections',
  'Research Ideas',
] as const;
