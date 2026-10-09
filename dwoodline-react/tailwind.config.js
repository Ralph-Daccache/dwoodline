/**
 * Design tokens for the whole site. Originally ported verbatim from the legacy
 * inline Tailwind CDN config; the type and spacing scales have since been made
 * fluid (clamp-based) so every page scales smoothly across screen sizes. Each
 * clamp tops out at the original fixed value, so desktop output is unchanged.
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
      /* Fluid spacing: scales with the viewport so layouts stay proportional on
         every screen. Each clamp tops out at the original fixed value (desktop
         parity) and shrinks on smaller screens. */
      spacing: {
        'stack-sm': 'clamp(10px, 1.4vw, 12px)',
        'section-gap': 'clamp(64px, 11vw, 160px)',
        'stack-md': 'clamp(16px, 2.2vw, 24px)',
        unit: '4px',
        gutter: 'clamp(16px, 2vw, 24px)',
        'stack-lg': 'clamp(28px, 4vw, 48px)',
        'margin-page': 'clamp(24px, 5vw, 80px)',
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
      /* Fluid type: clamp(min, viewport, max) with unitless line-heights that keep
         the original desktop proportions at the top of each range and scale down
         gracefully on phones. */
      fontSize: {
        'body-lg': [
          'clamp(16px, 1.2vw, 18px)',
          { lineHeight: '1.55', letterSpacing: '0.01em', fontWeight: '400' },
        ],
        'technical-label': [
          'clamp(11px, 0.9vw, 12px)',
          { lineHeight: '1.33', letterSpacing: '0.1em', fontWeight: '600' },
        ],
        'headline-lg': [
          'clamp(30px, 5.2vw, 48px)',
          { lineHeight: '1.14', letterSpacing: '-0.01em', fontWeight: '400' },
        ],
        'display-hero': [
          'clamp(42px, 8.5vw, 80px)',
          { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '400' },
        ],
        'headline-md': [
          'clamp(24px, 3.2vw, 32px)',
          { lineHeight: '1.25', letterSpacing: '0em', fontWeight: '400' },
        ],
        'body-md': [
          'clamp(15px, 1vw, 16px)',
          { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '400' },
        ],
        caption: ['14px', { lineHeight: '1.43', fontWeight: '400' }],
      },
    },
  },
  plugins: [forms, containerQueries],
};
