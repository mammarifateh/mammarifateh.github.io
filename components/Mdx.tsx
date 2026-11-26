import { compileMDX } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import { Callout, Figure } from './MdxBlocks';

/** Components available inside every MDX file. */
const components = { Callout, Figure };

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
