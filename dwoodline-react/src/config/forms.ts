/**
 * Contact form configuration. The endpoint defaults to the PHP handler that
 * ships with the site (public/api/inquiry.php, deployed to /api/inquiry.php);
 * set VITE_INQUIRY_ENDPOINT (the deploy reads it from the INQUIRY_ENDPOINT repository
 * variable, currently a Formspree form) to point the form at a different service.
 */
const configured = (import.meta.env.VITE_INQUIRY_ENDPOINT as string | undefined)?.trim();

export const FORMS_CONFIG = {
  inquiryEndpoint: configured || '/api/inquiry.php',
  /** `vite dev` has no PHP: let local development of the form succeed without sending anything. */
  simulate: import.meta.env.DEV && !configured,
} as const;
