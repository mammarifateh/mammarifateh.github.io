// Checks that every internal href/src in the exported site (./out) points to an existing file.
// Usage: npm run build && npm run linkcheck
import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('out');
const files = [];
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) files.push(p);
  });
walk(out);

const toPosix = (p) => p.split(path.sep).join('/');
const bad = new Set();
let n = 0;
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const pageDir = path.posix.dirname('/' + toPosix(path.relative(out, f)));
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    let u = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|#|data:|javascript:)/.test(u)) continue;
    u = u.split('#')[0].split('?')[0];
    if (!u) continue;
    n++;
    const rel = u.startsWith('/') ? u : path.posix.join(pageDir, u);
    let p = path.join(out, decodeURIComponent(rel));
    if (rel.endsWith('/')) p = path.join(p, 'index.html');
    if (!fs.existsSync(p)) bad.add(`${rel}   (linked from /${toPosix(path.relative(out, f))})`);
  }
}
console.log(`${files.length} pages, ${n} internal links checked`);
if (bad.size) {
  console.log('BROKEN:\n' + [...bad].join('\n'));
  process.exit(1);
}
console.log('No broken internal links');
