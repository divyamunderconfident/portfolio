# Portfolio

Divyam Saini's personal portfolio. Next.js (App Router) + TypeScript + Tailwind, deployed on Vercel.

**Live:** https://divyams-portfolio.vercel.app

## Adding a project

All projects live in [`content/projects.ts`](content/projects.ts). Add one entry: its card, skill highlighting and
(if `caseStudy` is set) its `/work/[slug]` page are generated from it. Personal details (email, LinkedIn, photo,
resume) live in [`content/site.ts`](content/site.ts); anything in `[BRACKETS]` is a placeholder.

## Run it

```bash
npm install
npm run dev
```
