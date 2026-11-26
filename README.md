# Fateh Mammari · personal scientific website

Source code of **https://mammarifateh.github.io**, the research website of Fateh Mammari (PhD candidate in Mechanical Engineering, University of Bejaia).

Built with **Next.js** (static export), **TypeScript**, **Tailwind CSS**, **MDX** for content, **KaTeX** for equations and **Plotly.js** for scientific plots. It is hosted for free on **GitHub Pages** and rebuilt automatically on every push.

---

## 1. Quick start (on your computer)

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install          # once, installs dependencies
npm run dev          # live preview at http://localhost:3000 (reloads when you save a file)
```

To check the final version exactly as it will be published:

```bash
npm run build        # generates the static site in ./out
npm run linkcheck    # verifies that every internal link points to an existing page
npm start            # serves ./out at http://localhost:3000 (uses Python; or run: npx serve out)
```

---

## 2. How to add content

All content lives in `content/`, one MDX file per entry. **The file name is the URL.**
Ready-to-copy templates are in `templates/`. You never need to edit page code to add content.

| To add… | Copy this template | To this folder | It appears at |
|---|---|---|---|
| A blog article | `templates/article.mdx` | `content/blog/` | `/blog/<file-name>/` |
| A short scientific note | `templates/note.mdx` | `content/blog/` | `/blog/<file-name>/` |
| A research project | `templates/research-project.mdx` | `content/research/` | `/research/<file-name>/` |
| A publication | `templates/publication.mdx` | `content/publications/` | `/publications/` |
| A computational demo | `templates/lab-demo.mdx` | `content/lab/` | `/lab/<file-name>/` |

Example: to publish an article, copy `templates/article.mdx` to `content/blog/plate-buckling-basics.mdx`, edit the title, summary, category and tags at the top, write the text, set `status: published` and a `date`, and remove the `<Status />` line. Commit and push: the article is online a minute or two later, listed in the blog, its category and tag pages, the search and the sitemap.

### What you can write in an MDX file

- **Markdown**: headings, bold, italics, links, lists, tables, footnotes, code blocks.
- **Mathematics** (KaTeX): `$E = mc^2$` inline, and `$$ … $$` on their own lines for displayed equations.
- **Epistemic labels**, to keep established knowledge, interpretation, hypotheses and ongoing work clearly apart:
  `<Callout kind="established">…</Callout>`, `kind="interpretation"`, `kind="hypothesis"`, `kind="ongoing"`, `kind="note"`.
- **Figures**: put the image in `public/figures/` and write `<Figure src="/figures/name.png" alt="…" caption="…" />`.
- **Interactive plots**: `<Plot data={[{ x: [...], y: [...], mode: 'lines' }]} />` (Plotly syntax).
- **Interactive demos**: `<VonMisesTruss />`, `<FourierPartialSums />`. To add your own, write a React component in `components/demos/` and register it in `components/Mdx.tsx`.
- **Draft banner**: `<Status />` (articles with `status: draft` also get a "Draft · idea" badge everywhere).

### Status values

| Collection | `status` | Meaning on the site |
|---|---|---|
| blog | `draft` / `published` | Drafts are shown as article ideas, with no date |
| research | `published` / `ongoing` | Listed under "Published research" or "Ongoing and unpublished projects" |
| lab | `live` / `planned` | Interactive experiments or planned projects |

---

## 3. Editing your details

- **Name, title, headline, biography, links, navigation, research interests**: `lib/site.ts`.
  Profile links set to `null` (Google Scholar, ResearchGate, LinkedIn) are hidden until you add a URL.
- **Academic background** (degrees): placeholder at the bottom of `app/about/page.tsx`.
- **Resources list**: `app/resources/page.tsx`.
- **AI for Science topics and principles**: `app/ai-for-science/page.tsx`.
- **Publication PDF**: put the file in `public/papers/` and set `pdf: "/papers/file.pdf"` in the publication's MDX file.
- **Colours and fonts**: `app/globals.css` (the `@theme` block) and `app/layout.tsx`.

---

## 4. GitHub and deployment

The repository is `github.com/mammarifateh/mammarifateh.github.io`. Because the repository has that exact name, GitHub serves it at `https://mammarifateh.github.io`.

Deployment is automatic: `.github/workflows/deploy.yml` runs on every push to `main`. It installs dependencies, builds the site, checks the links, and publishes `./out` to GitHub Pages. You can follow each run in the **Actions** tab of the repository. In the repository settings, **Pages → Source** must be set to **GitHub Actions** (already done).

Everyday workflow:

```bash
git add .
git commit -m "Add article on plate buckling"
git push
```

### Using a custom domain (optional)

Buy a domain, add it in **Settings → Pages → Custom domain**, create the DNS records GitHub shows you, then change `url` in `lib/site.ts` so that the sitemap and social cards use the new address.

### Deploying on Vercel instead (optional)

The site also works on Vercel without changes: import the GitHub repository at vercel.com, keep the detected Next.js settings, and deploy. If you do, update `url` in `lib/site.ts`.

---

## 5. Project structure

```
app/                 Pages (one folder per URL) and global layout, sitemap, robots, social image
components/          Header, footer, cards, MDX renderer, streaming text, search
components/demos/    Interactive demonstrations (Plotly-based)
content/             All the writing, as MDX files
lib/site.ts          Personal details and navigation
lib/content.ts       Reads the MDX files, builds tag lists, related posts and the search index
public/              Static files served as-is (icon, figures, papers, /analyse/ exercises page)
templates/           Copy-and-edit templates for each kind of content
scripts/linkcheck.mjs  Internal link checker
```

## 6. Content integrity

The site is built to keep a clear line between published results, ongoing work, interpretation and hypotheses. Draft articles show their planned scope only. Interactive demonstrations state which model they implement and that textbook models are not research results. Please keep it that way when adding content.
