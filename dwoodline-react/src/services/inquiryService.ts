/**
 * Inquiry form submission service.
 *
 * Original behavior (05-inquiry.html): validate that all three fields are
 * non-empty, then show a confirmation alert and reset. There was no network
 * request. This service preserves that exactly when no endpoint is configured,
 * and posts to `VITE_INQUIRY_ENDPOINT` when one is provided.
 */
import { FORMS_CONFIG, hasInquiryEndpoint } from '@/config/forms';

export interface InquiryData {
  name: string;
  email: string;
  message: string;
}

export type InquiryResult = { ok: true; message: string } | { ok: false; message: string };

const INVALID_MESSAGE = 'Please fill in all fields before submitting.';

function successMessage(name: string, email: string): string {
  return `Thank you, ${name}! Your inquiry has been received. We will contact you at ${email} soon.`;
}

export async function submitInquiry(data: InquiryData): Promise<InquiryResult> {
  // Matches the original truthiness check (no trimming).
  if (!data.name || !data.email || !data.message) {
    return { ok: false, message: INVALID_MESSAGE };
  }

  if (hasInquiryEndpoint()) {
    try {
      const response = await fetch(FORMS_CONFIG.inquiryEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        return { ok: false, message: 'Something went wrong. Please try again.' };
      }
    } catch {
      return { ok: false, message: 'Something went wrong. Please try again.' };
    }
  }

  return { ok: true, message: successMessage(data.name, data.email) };
}
