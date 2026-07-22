import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Base path is env-driven so the same build can deploy to a domain root
// or a GitHub Pages sub-path (e.g. "/dwoodline/") without code changes.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? (process.env.VITE_BASE_PATH ?? '/') : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}));
