/**
 * Inquiry form configuration, env-driven. When no endpoint is set the inquiry
 * service reproduces the original client-only behavior (validate + confirm +
 * reset) with no network call.
 */
export const FORMS_CONFIG = {
  inquiryEndpoint: import.meta.env.VITE_INQUIRY_ENDPOINT ?? '',
} as const;

export function hasInquiryEndpoint(): boolean {
  return FORMS_CONFIG.inquiryEndpoint.trim().length > 0;
}
