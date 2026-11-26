import { compileMDX } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import { Callout, Figure, Status } from './MdxBlocks';
import VonMisesTruss from './demos/VonMisesTruss';
import FourierPartialSums from './demos/FourierPartialSums';
import Plot from './demos/Plot';

/**
 * Components available inside every MDX file.
 * Add new interactive demos here to make them usable in articles and lab pages.
 */
const components = { Callout, Figure, Status, VonMisesTruss, FourierPartialSums, Plot };

export default async function Mdx({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeSlug, [rehypeKatex, { strict: false }]],
      },
    },
  });
  return <div className="prose-sci">{content}</div>;
}
