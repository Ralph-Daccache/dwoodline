/**
 * Ported verbatim from the original inline `tailwind.config` that every legacy
 * page loaded via the Tailwind Play CDN. Values are the design tokens for the
 * whole site — do not alter; the computed output must match the CDN exactly.
 *
 * Note: the legacy 01-hero/04-portfolio configs had `["inter"]` / `["notoSerif"]`
 * font entries; "inter" matches "Inter" (font names are case-insensitive) but
 * "notoSerif" did not resolve to "Noto Serif". The intended family names below
 * match 3 of the 5 pages and the design intent. See MIGRATION-REPORT.md.
 */
import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-fixed-dim': '#c6c6c8',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',
        'surface-container': '#f0eded',
        'surface-container-high': '#eae7e7',
        'primary-container': '#f5f5f7',
        secondary: '#705b3f',
        'on-surface-variant': '#44474a',
        'on-tertiary-container': '#8a6a4a',
        'surface-container-low': '#f6f3f2',
        'secondary-fixed-dim': '#dec2a0',
        'error-container': '#ffdad6',
        'surface-dim': '#dcd9d9',
        'on-primary-fixed': '#1a1c1d',
        error: '#ba1a1a',
        'inverse-surface': '#313030',
        'on-primary': '#ffffff',
        'primary-fixed': '#e2e2e4',
        'outline-variant': '#c5c7c9',
        'on-secondary': '#ffffff',
        'surface-container-lowest': '#ffffff',
        'on-primary-container': '#6e7072',
        'surface-tint': '#5d5e60',
        'surface-bright': '#fcf9f8',
        'tertiary-fixed': '#ffdcbe',
        'on-tertiary': '#ffffff',
        'tertiary-fixed-dim': '#e7bf9b',
        'on-tertiary-fixed-variant': '#5d4125',
        'secondary-container': '#fbdeba',
        'surface-variant': '#e5e2e1',
        'inverse-primary': '#c6c6c8',
        'secondary-fixed': '#fbdeba',
        primary: '#5d5e60',
        'tertiary-container': '#fff3eb',
        'on-secondary-container': '#776144',
        'on-background': '#1c1b1b',
        'surface-container-highest': '#e5e2e1',
        'inverse-on-surface': '#f3f0ef',
        'on-tertiary-fixed': '#2b1701',
        surface: '#fcf9f8',
        tertiary: '#77583b',
        'on-secondary-fixed-variant': '#574329',
        'on-secondary-fixed': '#271904',
        outline: '#75777a',
        'on-primary-fixed-variant': '#454749',
        background: '#fcf9f8',
        'on-surface': '#1c1b1b',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      spacing: {
        'stack-sm': '12px',
        'section-gap': '160px',
        'stack-md': '24px',
        unit: '4px',
        gutter: '24px',
        'stack-lg': '48px',
        'margin-page': '80px',
      },
      fontFamily: {
        'body-lg': ['Inter'],
        'technical-label': ['Inter'],
        'headline-lg': ['Noto Serif'],
        'display-hero': ['Noto Serif'],
        'headline-md': ['Noto Serif'],
        'body-md': ['Inter'],
        caption: ['Inter'],
      },
      fontSize: {
        'body-lg': ['18px', { lineHeight: '28px', letterSpacing: '0.01em', fontWeight: '400' }],
        'technical-label': [
          '12px',
          { lineHeight: '16px', letterSpacing: '0.1em', fontWeight: '600' },
        ],
        'headline-lg': [
          '48px',
          { lineHeight: '56px', letterSpacing: '-0.01em', fontWeight: '400' },
        ],
        'display-hero': [
          '80px',
          { lineHeight: '96px', letterSpacing: '-0.02em', fontWeight: '400' },
        ],
        'headline-md': ['32px', { lineHeight: '40px', letterSpacing: '0em', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', letterSpacing: '0.01em', fontWeight: '400' }],
        caption: ['14px', { lineHeight: '20px', fontWeight: '400' }],
      },
    },
  },
  plugins: [forms, containerQueries],
};
