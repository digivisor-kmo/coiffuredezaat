import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://coiffuredezaat.be',
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
  },
});
