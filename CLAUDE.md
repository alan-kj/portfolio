# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev           # local dev server at http://localhost:3000
npm run build         # production build
npm run lint          # ESLint (TS/TSX) + Stylelint (app/**/*.css)
npm run lint:js       # ESLint only
npm run lint:css      # Stylelint only
npm run typecheck     # tsc --noEmit
npm run format        # Prettier write; format:check to verify
```

There is no test suite. Verify changes with `lint`, `typecheck`, and `build`.

## Architecture

Next.js 16 (App Router) portfolio, React 19, TypeScript, Lucide icons, plain CSS. Routes: `/` (the one-page portfolio) and `/work/[slug]` (case studies, statically listed from `projects` via `generateStaticParams`; unknown slugs 404 through `app/not-found.tsx`).

- **Content is data-driven**: all profile, project, experience, and skill content comes from `app/data.ts` (typed `Profile`/`Project`/`Experience`/`Skill`/`Metric`). Edit content there, not in `page.tsx`. `layout.tsx` metadata also reads from `profile`. `profile.status` drives the hero pill; a project's `sections` fill its case-study page and its optional `preview` image replaces the generated motif. `experience` fills the timeline (hidden if empty); `metrics` overrides the skills-bento figures, which are otherwise counted from `projects`; `profile.email` powers the contact CTA (clear it to show GitHub only). Placeholder text in `data.ts` is meant to be replaced.
- **Shell**: `layout.tsx` renders the skip link, `components/Header.tsx`, `components/Footer.tsx`, `motion/Reveal.tsx` and `motion/Cursor.tsx` around every page, so they persist across navigations. Each page renders its own `<main id="main">`.
- **Server vs. client**: pages and layout are server components. Client islands are `ThemeProvider.tsx` (`ThemeProvider` + `ThemeToggle`), `components/Header.tsx`, `components/Hero/HeroLight.tsx`, `components/Contact/CopyEmail.tsx`, `motion/Magnetic.tsx`, `motion/Spotlight.tsx`, `motion/Cursor.tsx` and `motion/Reveal.tsx`. Pointer effects only run for `(hover: hover) and (pointer: fine)` and not under reduced motion.
- **Theming**: dark is the default. An inline nonce'd script in `layout.tsx` sets `data-theme` before paint from `localStorage` (`color-theme`); `ThemeProvider` reads the same key via `useSyncExternalStore` (server snapshot `"dark"`) and updates the `theme-color` meta. Tokens live in `app/styles/tokens.css` (dark on `:root`, light on `:root[data-theme="light"]`); use the tokens, not hard-coded colors.
- **Scroll reveal**: elements with `data-reveal` animate in via CSS scroll-driven animation (`animation-timeline: view()`) in `base.css`. `motion/Reveal.tsx` is only the fallback for browsers without it (adds `js` to `<html>` and toggles `.in` through IntersectionObserver), so the page stays visible without JS.
- **View transitions**: React's `<ViewTransition>` (no config needed in Next 16). Project previews share the name `work-<slug>` so they morph between the card and the case-study page; `motion/PageTransition.tsx` slides pages by the `transitionTypes` (`nav-forward` / `nav-back`) set on `<Link>`. The header is named `site-header` in CSS so it stays still. Set view-transition names in CSS or via `<ViewTransition>`, never as inline `style`.
- **Styling**: global `app/styles/tokens.css` and `base.css` (cascade layers `reset, tokens, base`), plus a CSS Module per component (`components/{Hero,Work,Experience,About,Skills,Contact}`). Shared global classes in `base.css`: `.wrap`, `.band` (section spacing and top rule), `.section-title`, `.btn` with `.btn-primary` / `.btn-secondary`. Fonts load via `next/font/google` as `--font-geist`, `--font-bricolage` (width axis only: keep it that way, the optical-size axis cost about 50 KB and 0.3 s of mobile LCP), `--font-geist-mono`, aliased to `--font-body`, `--font-head`, `--font-code`.
- **Security / CSP**: `proxy.ts` (Next 16's replacement for `middleware.ts`) generates a per-request nonce and sets a strict Content-Security-Policy (`style-src-attr 'none'`, `script-src-attr 'none'`, `img-src 'self' data:`, `font-src 'self'`). Consequences: **no inline `style={...}` attributes**, no third-party scripts/images/fonts/connections without updating the CSP. `layout.tsx` sets `dynamic = "force-dynamic"` so the nonce applies per request. Static security headers (HSTS, X-Frame-Options, etc.) live in `next.config.ts`.
- **SEO**: `app/seo.ts` exports `siteUrl` from `NEXT_PUBLIC_SITE_URL` (default `https://alankj.vercel.app`); it's used by `metadataBase`, `robots.ts`, and `sitemap.ts`.

## Conventions

- Prettier: 100-char lines, double quotes, trailing commas. ESLint uses `eslint-config-next` (core-web-vitals + typescript) with Prettier compat.
- Stylelint (`.stylelintrc.json`) enforces legacy color function notation (`rgba(0, 0, 0, 0.5)`), numeric alpha, long hex colors (`#ffffff`), lowercase keywords, and prefix media range notation (`min-width:`).

## Attribution

- Never add `Co-Authored-By`, `Signed-off-by`, "Generated with Claude Code" or any similar attribution or sign-off wording to commit messages, PR descriptions, code, comments, or site content. Commits contain only the message itself.
