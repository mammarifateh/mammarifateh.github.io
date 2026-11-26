import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader, PostCard } from '@/components/Cards';
import { getPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'AI for Science',
  description: 'Exploring how artificial intelligence can support scientific research: research agents, automation, literature exploration, computational workflows and mathematical reasoning.',
  alternates: { canonical: '/ai-for-science/' },
};

const topics = [
  ['Research agents', 'Systems that plan and carry out multi-step research tasks: searching, reading, running code, reporting. What they can be trusted with, and where a human must check.'],
  ['Scientific automation', 'Automating the repetitive parts of research, such as parameter sweeps, meshing, post-processing and report generation, while keeping every step reproducible.'],
  ['Literature exploration', 'Using language models to map a field, find related work and summarise papers, and the habit of always going back to the source.'],
  ['Computational workflows', 'Connecting symbolic computation, numerical solvers and finite-element software into pipelines that an assistant can help write and debug.'],
  ['AI-assisted mathematical reasoning', 'Help with derivations, series expansions and proofs, and the verification that has to follow: symbolic checks, numerical tests, limiting cases.'],
];

const principles = [
  'An AI output is a suggestion until it has been checked against the literature, a computation or an experiment.',
  'Every derivation produced with AI assistance is verified independently, symbolically or numerically, before it is used.',
  'Claims on this site say whether they are established results, personal interpretations, hypotheses or ongoing work.',
  'When AI tools contributed to a piece of work, the article says so and says how.',
];

export default function AiForScience() {
  const posts = getPosts().filter((p) => p.category === 'AI for Science' || p.tags.some((t) => /\bAI\b|artificial intelligence/i.test(t)));
  return (
    <div className="wrap">
      <PageHeader
        eyebrow="AI for Science"
        title="What can artificial intelligence do for research?"
        intro="A section for exploring how AI might support scientific work, from literature search to computation and mathematical reasoning. It is a space for careful questions, not for announcing results."
      />

      <section className="border-t rule py-10">
        <h2 className="eyebrow mb-6">Topics</h2>
        <dl className="grid gap-x-12 gap-y-7 md:grid-cols-2">
          {topics.map(([t, d]) => (
            <div key={t}>
              <dt className="font-serif text-lg font-semibold">{t}</dt>
              <dd className="mt-1 text-[15px] leading-relaxed muted">{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t rule py-10">
        <div className="grid gap-8 md:grid-cols-[200px_1fr]">
          <h2 className="eyebrow pt-1">Working principles</h2>
          <ol className="grid gap-4">
            {principles.map((p, i) => (
              <li key={p} className="flex gap-4 text-[16px] leading-relaxed">
                <span className="font-serif text-xl text-accent dark:text-night-accent">{i + 1}</span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t rule py-10">
        <div className="mb-2 flex items-end justify-between">
          <h2 className="h-section">Writing on AI and science</h2>
          <Link href="/blog/category/ai-for-science/" className="link text-sm">
            Category page
          </Link>
        </div>
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </section>
    </div>
  );
}
