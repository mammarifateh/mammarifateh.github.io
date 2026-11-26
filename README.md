# Fateh Mammari · personal website

Source of **https://mammarifateh.github.io**: a single page (Next.js static export, MDX, KaTeX) hosted on GitHub Pages, plus the French exercises page at `/analyse/`.

## Edit

- Name, biography, research directions, tools, links: `lib/site.ts`
- Publications: one MDX file per publication in `content/publications/` (copy `templates/publication.mdx`). The text under the front matter is the short summary shown on the page.
- Page layout: `app/page.tsx`
- Exercises page: `public/analyse/index.html`

## Preview locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Publish

```bash
git add .
git commit -m "Update"
git push
```

Each push to `main` builds and publishes the site through `.github/workflows/deploy.yml` (about 1–2 minutes).
