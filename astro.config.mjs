// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Public address of the site. The custom domain itself is set in the GitHub repo:
// Settings → Pages → Custom domain (with Actions deployments no CNAME file is needed).
export default defineConfig({
  site: 'https://danielcorredorm.dev',
  // Old addresses that are still linked from outside.
  redirects: {
    '/projects/ils-demo/': '/projects/combat-demo/',
  },
  // Builds sitemap-index.xml so search engines get the full list of pages.
  // Old redirect addresses are left out.
  integrations: [sitemap({ filter: (page) => !page.includes('/projects/ils-demo') })],
});
