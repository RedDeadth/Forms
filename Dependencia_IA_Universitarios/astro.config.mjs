// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      // @ts-expect-error - Mismatch de tipos entre vite@6 (Astro) y vite@7 (Tailwind)
      tailwindcss()
    ]
  },

  adapter: node({
    mode: 'standalone'
  })
});
