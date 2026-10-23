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

Single-page Next.js 16 (App Router) portfolio, React 19, TypeScript, Radix Themes + Lucide icons. Everything lives in `app/`; there are no nested routes.

- **Content is data-driven**: all profile, project, and skill content comes from `app/data.ts` (typed `Profile`/`Project`/`Skill`). Edit content there, not in `page.tsx`. `layout.tsx` metadata also reads from `profile`.
- **Server vs. client**: `page.tsx` and `layout.tsx` are server components. Client islands are `ThemeProvider.tsx` (`ThemeProvider` + `ThemeToggle`), `Motion.tsx`, and `Typewriter.tsx`.
- **Theming**: `ThemeProvider` stores the theme in `localStorage` (`color-theme`) via `useSyncExternalStore` (server snapshot is always `"light"`), sets `document.documentElement.dataset.theme`, updates the `theme-color` meta, and passes `appearance` to Radix `<Theme>`. Dark-mode styles in `globals.css` are written as `:root[data-theme="dark"] …` overrides; when adding styled elements, add matching dark overrides there.
- **Scroll reveal**: `Motion.tsx` adds a `js` class to `<html>` and toggles `.in` on `[data-reveal]` elements via IntersectionObserver (respects `prefers-reduced-motion`). CSS only hides reveal elements under `.js`, so the page stays visible without JS.
- **Styling**: one global stylesheet, `app/globals.css`, which also overrides Radix classes (e.g. `.rt-Button`, `.rt-Card`). Fonts are loaded via `next/font/google` and exposed as `--font-sans`, `--font-display`, `--font-mono`.
- **Security / CSP**: `proxy.ts` (Next 16's replacement for `middleware.ts`) generates a per-request nonce and sets a strict Content-Security-Policy (`style-src-attr 'none'`, `script-src-attr 'none'`, `img-src 'self' data:`, `font-src 'self'`). Consequences: **no inline `style={...}` attributes**, no third-party scripts/images/fonts/connections without updating the CSP. `layout.tsx` sets `dynamic = "force-dynamic"` so the nonce applies per request. Static security headers (HSTS, X-Frame-Options, etc.) live in `next.config.ts`.
- **SEO**: `app/seo.ts` exports `siteUrl` from `NEXT_PUBLIC_SITE_URL` (default `https://alankj.vercel.app`); it's used by `metadataBase`, `robots.ts`, and `sitemap.ts`.

## Conventions

- Prettier: 100-char lines, double quotes, trailing commas. ESLint uses `eslint-config-next` (core-web-vitals + typescript) with Prettier compat.
- Stylelint (`.stylelintrc.json`) enforces legacy color function notation (`rgba(0, 0, 0, 0.5)`), numeric alpha, long hex colors (`#ffffff`), lowercase keywords, and prefix media range notation (`min-width:`).

## Attribution

- Never add `Co-Authored-By`, `Signed-off-by`, "Generated with Claude Code" or any similar attribution or sign-off wording to commit messages, PR descriptions, code, comments, or site content. Commits contain only the message itself.
