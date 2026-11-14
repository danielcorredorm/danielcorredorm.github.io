// @ts-check
import { defineConfig } from 'astro/config';

// Public address of the site. The custom domain itself is set in the GitHub repo:
// Settings → Pages → Custom domain (with Actions deployments no CNAME file is needed).
export default defineConfig({
  site: 'https://danielcorredorm.dev',
  // Old addresses that are still linked from outside.
  redirects: {
    '/projects/ils-demo/': '/projects/combat-demo/',
  },
});
