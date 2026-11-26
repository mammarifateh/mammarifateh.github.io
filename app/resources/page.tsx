import type { Metadata } from 'next';
import { PageHeader } from '@/components/Cards';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'A curated collection of scientific software, books, references, useful websites and research tools.',
  alternates: { canonical: '/resources/' },
};

type Item = { name: string; href?: string; note: string };

/** Edit these lists freely. Items without href are shown as plain text. */
const groups: { title: string; items: Item[] }[] = [
  {
    title: 'Scientific software',
    items: [
      { name: 'MATLAB', href: 'https://www.mathworks.com/products/matlab.html', note: 'Numerical computing, ODE/BVP solvers, prototyping of models.' },
      { name: 'Maple', href: 'https://www.maplesoft.com/products/maple/', note: 'Symbolic computation: series expansions, closed-form derivations.' },
      { name: 'COMSOL Multiphysics', href: 'https://www.comsol.com/', note: 'Finite-element simulation, including structural mechanics.' },
      { name: 'Python with NumPy, SciPy and Matplotlib', href: 'https://scipy.org/', note: 'Open scientific computing stack.' },
      { name: 'SymPy', href: 'https://www.sympy.org/', note: 'Open-source symbolic mathematics in Python.' },
      { name: 'FEniCSx', href: 'https://fenicsproject.org/', note: 'Open-source finite-element framework driven from Python.' },
      { name: 'Gmsh', href: 'https://gmsh.info/', note: 'Mesh generator with a scripting language and Python API.' },
      { name: 'ParaView', href: 'https://www.paraview.org/', note: 'Visualisation of simulation results.' },
    ],
  },
  {
    title: 'Books',
    items: [
      { name: 'S. Timoshenko and S. Woinowsky-Krieger, Theory of Plates and Shells', note: 'The classical reference on plate and shell theory.' },
      { name: 'J. N. Reddy, Theory and Analysis of Elastic Plates and Shells', note: 'Classical and shear-deformation plate theories, with analytical and numerical solutions.' },
      { name: 'Z. P. Bažant and L. Cedolin, Stability of Structures', note: 'Elastic, inelastic and fracture stability, including snap-through.' },
      { name: 'O. C. Zienkiewicz, R. L. Taylor and J. Z. Zhu, The Finite Element Method: Its Basis and Fundamentals', note: 'Foundations of the finite-element method.' },
      { name: 'S. H. Strogatz, Nonlinear Dynamics and Chaos', note: 'Readable introduction to bifurcations and nonlinear systems.' },
    ],
  },
  {
    title: 'Key references',
    items: [
      { name: 'M. E. Gurtin and A. I. Murdoch, A continuum theory of elastic material surfaces, Archive for Rational Mechanics and Analysis 57 (1975) 291–323', href: 'https://doi.org/10.1007/BF00261375', note: 'The original formulation of surface elasticity.' },
    ],
  },
  {
    title: 'Useful websites',
    items: [
      { name: 'arXiv', href: 'https://arxiv.org/', note: 'Preprints in physics, mathematics and computer science.' },
      { name: 'Google Scholar', href: 'https://scholar.google.com/', note: 'Literature search and citation tracking.' },
      { name: 'Digital Library of Mathematical Functions (NIST)', href: 'https://dlmf.nist.gov/', note: 'Reference for special functions.' },
      { name: 'Analyse mathématique: exercices corrigés (FR)', href: '/analyse/', note: 'My corrected exercises on series, power series and Fourier analysis.' },
    ],
  },
  {
    title: 'Research tools',
    items: [
      { name: 'Zotero', href: 'https://www.zotero.org/', note: 'Reference management.' },
      { name: 'Overleaf', href: 'https://www.overleaf.com/', note: 'Collaborative LaTeX writing.' },
      { name: 'Git and GitHub', href: 'https://github.com/', note: 'Version control for code, papers and this website.' },
      { name: 'KaTeX', href: 'https://katex.org/', note: 'Fast mathematics rendering on the web, used on this site.' },
    ],
  },
];

export default function Resources() {
  return (
    <div className="wrap">
      <PageHeader eyebrow="Resources" title="Tools and references I find useful" intro="A curated, growing list. Inclusion means I have found it useful, not that it is complete." />
      {groups.map((g) => (
        <section key={g.title} className="border-t rule py-10">
          <div className="grid gap-6 md:grid-cols-[200px_1fr]">
            <h2 className="eyebrow pt-1">{g.title}</h2>
            <ul className="grid gap-4">
              {g.items.map((it) => (
                <li key={it.name}>
                  {it.href ? (
                    <a href={it.href} className="font-medium hover:text-accent dark:hover:text-night-accent" target={it.href.startsWith('http') ? '_blank' : undefined} rel="noopener">
                      {it.name}
                      {it.href.startsWith('http') && <span className="ml-1 text-xs faint">↗</span>}
                    </a>
                  ) : (
                    <span className="font-medium">{it.name}</span>
                  )}
                  <p className="text-[15px] muted">{it.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
