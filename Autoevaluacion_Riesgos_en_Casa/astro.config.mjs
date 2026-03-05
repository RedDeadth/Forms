// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/encuesta_riesgos',
  vite: {
    plugins: [
      // @ts-expect-error - Mismatch de tipos entre vite@6 (Astro) y vite@7 (Tailwind)
      tailwindcss()
    ]
  },
  output: 'static'
});
