/**
 * Contact form configuration. The endpoint defaults to the PHP handler that
 * ships with the site (public/api/inquiry.php, deployed to /api/inquiry.php);
 * set VITE_INQUIRY_ENDPOINT to point the form at a different service.
 */
const configured = (import.meta.env.VITE_INQUIRY_ENDPOINT as string | undefined)?.trim();

export const FORMS_CONFIG = {
  inquiryEndpoint: configured || '/api/inquiry.php',
} as const;
