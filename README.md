# Alan K J — Portfolio (Next.js)

Install dependencies and start the local development server:

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to preview the site.

Update the profile, projects, skills, and contact details in `app/data.ts`.
The interface uses Radix Themes and Lucide icons. A per-request nonce-based
Content Security Policy and additional security headers are configured in
`proxy.ts` and `next.config.ts`.

The app is written in TypeScript and TSX, with CSS in `app/globals.css`.
Search metadata, canonical URLs, `robots.txt`, and `sitemap.xml` use
`https://alankj.vercel.app` as the public site URL. Set `NEXT_PUBLIC_SITE_URL`
when deploying to a different domain.

ESLint checks TypeScript/TSX and Next.js conventions, Stylelint checks CSS, and
Prettier formats supported source, configuration, JSON, and Markdown files.
Run the checks and formatter with:

```sh
npm run lint
npm run format:check
npm run format
npm run typecheck
npm run build
```
