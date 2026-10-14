/**
 * Contact form submission service.
 *
 * Validates the three fields, then POSTs them as JSON to the inquiry endpoint
 * (a small PHP script on the same host that emails info@dwoodline.com). A
 * submission only counts as sent when the server answers with `{ ok: true }`;
 * anything else is reported as a failure so a visitor is never told their
 * message arrived when it did not.
 */
import { FORMS_CONFIG } from '@/config/forms';

export interface InquiryData {
  name: string;
  email: string;
  message: string;
  /** Honeypot: real visitors never fill this in. */
  company_url?: string;
}

export type InquiryField = 'name' | 'email' | 'message';
export type FieldErrors = Partial<Record<InquiryField, string>>;

export type InquiryFailure = 'invalid' | 'rate_limited' | 'failed';
export type InquiryResult = { ok: true } | { ok: false; reason: InquiryFailure };

export const LIMITS = { name: 100, email: 254, message: 5000 } as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REQUEST_TIMEOUT_MS = 15000;

/** Returns a message per invalid field; an empty object means the data is valid. */
export function validateInquiry(data: Pick<InquiryData, InquiryField>): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = 'Enter your name.';
  else if (data.name.trim().length > LIMITS.name) errors.name = 'Use 100 characters or fewer.';
  if (!data.email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = 'Enter a valid email address, like name@company.com.';
  }
  if (!data.message.trim()) errors.message = 'Tell us a little about your project.';
  else if (data.message.trim().length > LIMITS.message) {
    errors.message = 'Keep it under 5,000 characters. You can send the rest by email.';
  }
  return errors;
}

export async function submitInquiry(data: InquiryData): Promise<InquiryResult> {
  if (FORMS_CONFIG.simulate) {
    await new Promise((resolve) => window.setTimeout(resolve, 600));
    return { ok: true };
  }
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(FORMS_CONFIG.inquiryEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
        company_url: data.company_url ?? '',
      }),
      signal: controller.signal,
    });
    const body: unknown = await response.json().catch(() => null);
    const confirmed =
      typeof body === 'object' && body !== null && (body as { ok?: unknown }).ok === true;
    if (response.ok && confirmed) return { ok: true };
    if (response.status === 429) return { ok: false, reason: 'rate_limited' };
    if (response.status === 422) return { ok: false, reason: 'invalid' };
    return { ok: false, reason: 'failed' };
  } catch {
    return { ok: false, reason: 'failed' };
  } finally {
    window.clearTimeout(timer);
  }
}
