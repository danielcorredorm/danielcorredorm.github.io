# danielcorredorm.dev

Portfolio of Daniel Corredor, Senior Gameplay Engineer (Unreal Engine, C++, GAS, multiplayer).
Live at https://danielcorredorm.dev. Built with [Astro](https://astro.build) and published to GitHub Pages by `.github/workflows/deploy.yml`.

## Edit

- Pages: `src/pages/` — game and project pages are Markdown (`.md`) and can be edited on github.com.
- Name, headline, contact links and the demo-reel YouTube id: `src/data/site.mjs`.
- Game cards on Home and Games: `src/data/games.mjs`.
- Colors and layout: `src/styles/global.css`.
- Images: `public/images/`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm run todos    # draft notes still left in the pages
```
