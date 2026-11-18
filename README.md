# danielcorredorm.dev

Portfolio of Daniel Corredor, Senior Gameplay Engineer (Unreal Engine, C++, GAS, multiplayer).
Live at https://danielcorredorm.dev. Built with [Astro](https://astro.build) and published to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Edit

- Pages: `src/pages/`. Game and project pages are Markdown (`.md`) and can be edited on github.com.
  - Keep each page's `description` at 160 characters or fewer (it is the text search results and link previews show).
  - `shotAlts` in a page's front matter holds one alt text per gallery screenshot, in order.
- Name, headline, location, contact links and the demo-reel YouTube id: `src/data/site.mjs`.
- Game cards on Home and Games: `src/data/games.mjs`.
- Screenshots and covers: `src/assets/media/<page>/` (see the README there). Astro resizes and compresses them at build time.
- Look and colors: `src/styles/theme.css` (the RPG-menu theme and its color tokens), loaded on top of `src/styles/global.css` (base layout: cards, facts block, code, video frame).
- Fonts: Oxanium and Hanken Grotesk are served from the site itself, `public/fonts/`, declared in `src/styles/fonts.css`.
- Layouts: `src/layouts/Site.astro` (every page: head tags, side menu, animated background) and `src/layouts/Markdown.astro` (game and project pages).
- Components: `src/components/YouTube.astro` shows a thumbnail and loads the YouTube player only when it is clicked; `src/components/ContactLinks.astro` is the contact list.

## Search and link previews

- `public/og.jpg` is the default preview image; game and project pages use their cover instead.
- The sitemap is generated at build time by `@astrojs/sitemap` (`astro.config.mjs`); `public/robots.txt` points to it.
- Icons: `public/favicon.svg`, `public/favicon.ico` and `public/apple-touch-icon.png`.
- `src/pages/404.astro` is the "page not found" page.

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm run todos    # draft notes still left in the pages (should be empty before publishing)
```
