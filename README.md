# Fateh Mammari · personal website

Source of **https://mammarifateh.github.io**. Built with Next.js (static export), MDX and KaTeX, hosted on GitHub Pages.

## Preview locally

Requires [Node.js](https://nodejs.org) 20+.

```bash
npm install
npm run dev          # http://localhost:3000
```

## Add content

| To add | Copy | To |
|---|---|---|
| A blog article | `templates/article.mdx` | `content/blog/<url-slug>.mdx` |
| A short note | `templates/note.mdx` | `content/blog/<url-slug>.mdx` |
| A publication | `templates/publication.mdx` | `content/publications/<slug>.mdx` |

Articles support Markdown, LaTeX (`$…$` and `$$…$$`), tables, code, footnotes, `<Figure src="/figures/x.png" caption="…" />` (images in `public/figures/`) and `<Callout title="…">…</Callout>`.

Name, biography, research directions, links and menu: `lib/site.ts`.
A publication PDF: put it in `public/papers/` and set `pdf: "/papers/file.pdf"`.
The French exercises page is the static file `public/analyse/index.html`.

## Publish

```bash
git add .
git commit -m "Add an article"
git push
```

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site, checks internal links and publishes it (about 1–2 minutes; see the Actions tab).
