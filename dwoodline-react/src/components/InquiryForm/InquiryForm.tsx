import { useId, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { SITE } from '@/config/site';
import {
  LIMITS,
  submitInquiry,
  validateInquiry,
  type InquiryFailure,
  type FieldErrors,
  type InquiryField,
} from '@/services/inquiryService';

type Status = 'idle' | 'sending' | 'success' | 'error';

const FIELD_ORDER: InquiryField[] = ['name', 'email', 'message'];

const INPUT_CLASS =
  'form-input-focus w-full border-0 border-b border-[#F5F5F7]/45 bg-transparent py-3 font-body-md text-base text-[#F5F5F7] placeholder:text-[#F5F5F7]/45 transition-colors duration-300 aria-[invalid=true]:border-[#f2a7a0]';

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[13px] tracking-normal text-[#F5F5F7]/70">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-[13px] text-[#f2a7a0]">
          {error}
        </p>
      )}
    </div>
  );
}

/** Contact form: labelled fields, inline validation, sending state and a confirmation panel. */
export function InquiryForm() {
  const uid = useId();
  const ids: Record<InquiryField, string> = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    message: `${uid}-message`,
  };
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [failure, setFailure] = useState<InquiryFailure>('failed');
  const [sent, setSent] = useState({ name: '', email: '' });

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const fieldRefs = { name: nameRef, email: emailRef, message: messageRef };

  const onChange =
    (field: InquiryField) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const value = e.target.value;
      setValues((current) => ({ ...current, [field]: value }));
      if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    };

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (status === 'sending') return;

    const found = validateInquiry(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      setStatus('idle');
      fieldRefs[firstInvalid].current?.focus();
      return;
    }

    setStatus('sending');
    const result = await submitInquiry({ ...values, company_url: honeypot });
    if (result.ok) {
      setSent({ name: values.name.trim(), email: values.email.trim() });
      setValues({ name: '', email: '', message: '' });
      setStatus('success');
      window.requestAnimationFrame(() => confirmationRef.current?.focus());
    } else {
      setFailure(result.reason);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="py-4">
        <h3
          ref={confirmationRef}
          tabIndex={-1}
          className="font-headline-md text-headline-md serif-text text-[#F5F5F7] focus:outline-none"
        >
          Message sent
        </h3>
        <p className="font-body-md mt-4 text-[#F5F5F7]/80">
          Thank you, {sent.name}. We will reply to {sent.email} by email.
        </p>
        <button
          type="button"
          onClick={() => {
            setHoneypot('');
            setErrors({});
            setStatus('idle');
            window.requestAnimationFrame(() => nameRef.current?.focus());
          }}
          className="mt-8 border border-[#F5F5F7]/45 px-6 py-3 font-technical-label text-technical-label uppercase tracking-[0.2em] text-[#F5F5F7] transition-colors duration-300 hover:bg-brand hover:text-[#1A1A1A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form
      noValidate
      aria-busy={sending}
      className="space-y-[clamp(20px,3.4vh,40px)]"
      onSubmit={handleSubmit}
    >
      <Field id={ids.name} label="Your name" error={errors.name}>
        <input
          ref={nameRef}
          id={ids.name}
          name="name"
          type="text"
          autoComplete="name"
          maxLength={LIMITS.name + 50}
          required
          aria-required="true"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${ids.name}-error` : undefined}
          className={INPUT_CLASS}
          placeholder="Full name"
          value={values.name}
          onChange={onChange('name')}
        />
      </Field>
      <Field id={ids.email} label="Email" error={errors.email}>
        <input
          ref={emailRef}
          id={ids.email}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          aria-required="true"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${ids.email}-error` : undefined}
          className={INPUT_CLASS}
          placeholder="name@company.com"
          value={values.email}
          onChange={onChange('email')}
        />
      </Field>
      <Field id={ids.message} label="Tell us about your project" error={errors.message}>
        <textarea
          ref={messageRef}
          id={ids.message}
          name="message"
          rows={4}
          autoComplete="off"
          required
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${ids.message}-error` : undefined}
          className={`${INPUT_CLASS} resize-none`}
          placeholder="Scope, location and timeline"
          value={values.message}
          onChange={onChange('message')}
        />
      </Field>

      {/* Honeypot: invisible to people and assistive tech, tempting to bots. The unusual name
          and autocomplete token stop browsers and password managers from filling it. */}
      <div aria-hidden="true" className="sr-only" style={{ position: 'absolute', left: 0 }}>
        <label>
          Leave this field empty
          <input
            type="text"
            name="company_url"
            tabIndex={-1}
            autoComplete="new-password"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      {status === 'error' && (
        <p
          role="alert"
          className="border border-[#f2a7a0]/60 px-4 py-3 text-[14px] leading-relaxed text-[#F5F5F7]"
        >
          {failure === 'rate_limited'
            ? 'You have sent several messages in a short time. Please wait a little, or reach us on'
            : failure === 'invalid'
              ? 'Some details were not accepted. Please check the form, or reach us on'
              : 'We could not send your message. Your details are still here, so please try again, or reach us on'}{' '}
          <a
            className="underline underline-offset-4 hover:text-brand"
            href={SITE.social.whatsapp}
            target="_blank"
            rel="noopener"
          >
            WhatsApp
          </a>{' '}
          or at{' '}
          <a
            className="underline underline-offset-4 hover:text-brand"
            href={`mailto:${SITE.contact.email}`}
          >
            {SITE.contact.email}
          </a>
          .
        </p>
      )}

      <div className="flex flex-col gap-3 pt-[clamp(4px,1.6vh,24px)] sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={sending}
          className="w-full bg-brand px-10 py-5 font-technical-label text-technical-label uppercase tracking-[0.2em] text-[#1A1A1A] transition-colors duration-300 hover:bg-[#d2b99c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5F5F7] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {sending ? 'Sending…' : 'Send message'}
        </button>
        <a
          href={SITE.social.whatsapp}
          target="_blank"
          rel="noopener"
          className="w-full border border-[#F5F5F7]/45 px-8 py-5 text-center font-technical-label text-technical-label uppercase tracking-[0.2em] text-[#F5F5F7] transition-colors duration-300 hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:w-auto"
        >
          Message on WhatsApp
        </a>
      </div>
    </form>
  );
}
