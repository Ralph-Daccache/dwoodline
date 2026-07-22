/**
 * Analytics configuration, env-driven. Disabled by default — the original site
 * had no analytics, so an empty id keeps behavior identical.
 */
export const ANALYTICS_CONFIG = {
  measurementId: import.meta.env.VITE_ANALYTICS_ID ?? '',
} as const;

export function isAnalyticsEnabled(): boolean {
  return ANALYTICS_CONFIG.measurementId.trim().length > 0;
}
