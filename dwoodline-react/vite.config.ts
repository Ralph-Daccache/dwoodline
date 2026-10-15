import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import {
  HEAD_END,
  HEAD_START,
  NOSCRIPT_MARK,
  PAGES,
  headBlock,
  noscriptBlock,
  sitemapXml,
} from './src/config/seo';

/**
 * After the build, writes one ready-made HTML file per page (title, description,
 * canonical link, share tags and a plain-text summary) plus sitemap.xml. Search
 * and AI crawlers that do not run JavaScript then see the right information for
 * each page; the React app still takes over in the browser.
 */
function seoPages(): Plugin {
  let outDir = 'dist';
  return {
    name: 'seo-pages',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const template = readFileSync(join(outDir, 'index.html'), 'utf8');
      const start = template.indexOf(HEAD_START);
      const end = template.indexOf(HEAD_END);
      if (start < 0 || end < 0 || !template.includes(NOSCRIPT_MARK)) {
        throw new Error('seo-pages: markers missing from index.html');
      }
      for (const page of PAGES) {
        const html = (
          template.slice(0, start) +
          headBlock(page) +
          template.slice(end + HEAD_END.length)
        ).replace(NOSCRIPT_MARK, noscriptBlock(page));
        const file =
          page.path === '/' ? join(outDir, 'index.html') : join(outDir, page.path, 'index.html');
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, html);
      }
      writeFileSync(join(outDir, 'sitemap.xml'), sitemapXml(new Date().toISOString().slice(0, 10)));
    },
  };
}

// Base path is env-driven so the same build can deploy to a domain root
// or a GitHub Pages sub-path (e.g. "/dwoodline/") without code changes.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? (process.env.VITE_BASE_PATH ?? '/') : '/',
  plugins: [react(), seoPages()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}));
