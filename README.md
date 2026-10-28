# Alan K J — Portfolio

A one-page developer portfolio with a terminal-style interface: solid black (or white) surfaces, monospace type, 1px rules, square corners, and no shadows or gradients. Built with Next.js 16 (App Router), React 19 and TypeScript, using plain CSS.

## Features

- **Console layout:** a fixed side rail for navigation, a status-line footer, and a hero with a profile window.
- **Content as data:** projects are listed like a directory, experience reads like a `git log`, and each project has its own case-study page at `/work/<slug>`.
- **Dark and light themes:** dark by default, remembered per visitor, with no flash on load.
- **Accessible and light:** keyboard focus styles, reduced-motion support, semantic markup, no client-side JavaScript beyond the theme toggle, nav highlighting and copy-email button.
- **Hardened and discoverable:** a strict per-request Content-Security-Policy, security headers, canonical URLs, Open Graph image, `robots.txt`, `sitemap.xml` and JSON-LD.

## Getting started

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Make it yours

All content lives in [`app/data.ts`](app/data.ts): name, job title, status, email, GitHub, LinkedIn, resume link, projects and case studies, experience, education and skills. Text marked as placeholder there is meant to be replaced. Clear a field such as `email`, `linkedin` or `resumeUrl` to hide it everywhere.

- **Resume:** put a PDF at `public/resume.pdf`, or set `resumeUrl` to any full URL.
- **Project images:** set a project's `preview` to a file under `public/`; without one, a generated motif is shown on its case-study page.
- **Colors and type:** edit the tokens in `app/styles/tokens.css` rather than hard-coding values in components.
- **Site URL:** set `NEXT_PUBLIC_SITE_URL` when deploying to a domain other than the default, `https://alankj.vercel.app`.

## Scripts

| Command                                   | What it does                           |
| ----------------------------------------- | -------------------------------------- |
| `npm run dev`                             | Start the dev server                   |
| `npm run build` / `npm start`             | Build and serve the production site    |
| `npm run lint`                            | ESLint (TS/TSX) and Stylelint (CSS)    |
| `npm run typecheck`                       | Type-check with `tsc`                  |
| `npm run format` / `npm run format:check` | Format with Prettier, or only check it |

There is no test suite; verify changes with `lint`, `typecheck` and `build`.

## Project layout

```
app/
  data.ts            all site content
  layout.tsx         fonts, metadata, theme script, shell
  page.tsx           the one-page portfolio
  work/[slug]/       case-study pages
  components/        Header, Footer, Hero, Work, Experience, Skills, About, Contact
  motion/            scroll reveal and page transitions
  styles/            design tokens and base styles
proxy.ts             per-request nonce and Content-Security-Policy
next.config.ts       static security headers
```

Because the CSP forbids inline styles and third-party assets, avoid `style={...}` attributes, and update `proxy.ts` before adding external scripts, fonts, images or connections.
