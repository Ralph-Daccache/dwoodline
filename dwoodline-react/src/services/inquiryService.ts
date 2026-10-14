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
  website?: string;
}

export type InquiryField = 'name' | 'email' | 'message';
export type FieldErrors = Partial<Record<InquiryField, string>>;

export type InquiryResult = { ok: true } | { ok: false };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REQUEST_TIMEOUT_MS = 15000;

/** Returns a message per invalid field; an empty object means the data is valid. */
export function validateInquiry(data: Pick<InquiryData, InquiryField>): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = 'Enter your name.';
  if (!data.email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = 'Enter a valid email address, like name@company.com.';
  }
  if (!data.message.trim()) errors.message = 'Tell us a little about your project.';
  return errors;
}

export async function submitInquiry(data: InquiryData): Promise<InquiryResult> {
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
        website: data.website ?? '',
      }),
      signal: controller.signal,
    });
    const body: unknown = await response.json().catch(() => null);
    const confirmed =
      typeof body === 'object' && body !== null && (body as { ok?: unknown }).ok === true;
    return response.ok && confirmed ? { ok: true } : { ok: false };
  } catch {
    return { ok: false };
  } finally {
    window.clearTimeout(timer);
  }
}
