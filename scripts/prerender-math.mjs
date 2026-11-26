// Builds public/analyse/ from analyse-src/index.html.
// Every $…$ formula in the course notes (<template> blocks) and in the exercises (R`…` strings)
// is rendered to HTML with KaTeX here, at build time, so phones show finished formulas immediately
// without downloading or running a math engine. KaTeX's stylesheet and fonts are copied alongside.
// Runs automatically before `npm run build` (see "prebuild" in package.json).
import fs from 'node:fs';
import path from 'node:path';
import katex from 'katex';

const src = path.resolve('analyse-src/index.html');
const outDir = path.resolve('public/analyse');
let html = fs.readFileSync(src, 'utf8');

const errors = [];
let count = 0;
const render = (tex) => {
  count++;
  try {
    return katex.renderToString(tex, { output: 'html', throwOnError: true, strict: false });
  } catch (e) {
    errors.push(`${tex}\n   -> ${e.message}`);
    return katex.renderToString(tex, { output: 'html', throwOnError: false, strict: false });
  }
};
const renderMath = (s) => s.replace(/\$([^$]+?)\$/g, (_, tex) => render(tex));

// 1) Course notes in <template> blocks
html = html.replace(/(<template id="r\d+">)([\s\S]*?)(<\/template>)/g, (_, a, body, b) => a + renderMath(body) + b);
// 2) Exercise strings written as R`…` (String.raw); KaTeX HTML contains no backticks or "${"
html = html.replace(/R`([^`]*)`/g, (_, body) => {
  const out = renderMath(body);
  if (out.includes('`') || out.includes('${')) throw new Error('Unsafe KaTeX output inside a template literal');
  return 'R`' + out + '`';
});

if (errors.length) {
  console.error(`KaTeX could not render ${errors.length} formula(s):\n` + errors.join('\n'));
  process.exit(1);
}

fs.mkdirSync(path.join(outDir, 'katex', 'fonts'), { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), html);
const dist = path.resolve('node_modules/katex/dist');
fs.copyFileSync(path.join(dist, 'katex.min.css'), path.join(outDir, 'katex', 'katex.min.css'));
for (const f of fs.readdirSync(path.join(dist, 'fonts'))) {
  if (f.endsWith('.woff2')) fs.copyFileSync(path.join(dist, 'fonts', f), path.join(outDir, 'katex', 'fonts', f));
}
console.log(`analyse: ${count} formulas pre-rendered with KaTeX`);
