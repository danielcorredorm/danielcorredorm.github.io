// @ts-check
import { defineConfig } from 'astro/config';

// Public address of the site. The custom domain itself is set in the GitHub repo:
// Settings → Pages → Custom domain (with Actions deployments no CNAME file is needed).
export default defineConfig({
  site: 'https://danielcorredorm.dev',
});
