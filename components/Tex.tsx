import katex from 'katex';

/** Server-rendered KaTeX for use in TSX pages (MDX files use $…$ directly). */
export default function Tex({ children, display = false }: { children: string; display?: boolean }) {
  const html = katex.renderToString(children, { displayMode: display, throwOnError: false, strict: false });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
