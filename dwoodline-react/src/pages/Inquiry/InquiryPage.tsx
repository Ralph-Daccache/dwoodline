import { InquiryForm } from '@/components/InquiryForm/InquiryForm';
import { MaterialIcon } from '@/components/MaterialIcon/MaterialIcon';
import { SITE } from '@/config/site';
import { useSectionScroll } from '@/hooks/useSectionScroll';

interface ContactRow {
  icon: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

const CONTACT_ROWS: ContactRow[] = [
  { icon: 'mail', label: 'Email', value: SITE.contact.email, href: `mailto:${SITE.contact.email}` },
  { icon: 'call', label: 'Phone', value: SITE.contact.phone, href: SITE.contact.phoneHref },
  {
    icon: 'chat',
    label: 'WhatsApp',
    value: 'Message us',
    href: SITE.social.whatsapp,
    external: true,
  },
  {
    icon: 'location_on',
    label: 'Studio',
    value: SITE.contact.address,
    href: SITE.contact.mapHref,
    external: true,
  },
  { icon: 'schedule', label: 'Studio hours', value: SITE.contact.hours },
];

export function InquiryPage() {
  // Desktop section-snap (footer-aware), matching Home / Projects / Services.
  useSectionScroll();

  return (
    <main>
      <section className="snap-target relative flex min-h-[100dvh] flex-col justify-start overflow-hidden bg-[#1A1A1A] pb-stack-lg pt-[clamp(128px,17vh,152px)] text-[#F5F5F7]">
        {/* Dark wood backdrop for materiality (decorative) */}
        <div className="pointer-events-none absolute inset-0 opacity-10 grayscale">
          <img
            data-parallax
            className="h-full w-full object-cover"
            alt=""
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN8tsGWMRYnl-csyNbBkr_0w-JQ-i4WvoIS1in2dCA3sVfqC6OYp3kZzmyyokLzt36L-hptXAJQPEC0pD8SxE8M5ZWA9nesn4qcvXgy9wtjLXsq3DF8mgFDw9o644IkBgPV17kKYaACuj3nF2lpsPuClftV-ZwUudDK2cCMVjDSEgQkYSkKPQ0DFPS-Q3Z6vRI6WOfr9cTsXW-DTmZa8LnCIZ7brX2jTKiw2hu86M1EWkknZ_yTcu5X_v5iTG-gJSfloCgMD_oB3w"
          />
        </div>
        <div className="relative z-10 grid grid-cols-1 items-start gap-gutter px-6 md:grid-cols-12 md:px-[80px]">
          <div className="md:col-span-5">
            <span className="mb-stack-md block text-[13px] tracking-[0.2em] text-[#F5F5F7]/70 uppercase">
              Contact
            </span>
            <h1 className="mb-stack-md font-display-hero text-[clamp(32px,4vw,52px)] leading-[1.08] text-balance">
              Tell us about your project.
            </h1>
            <p className="font-body-lg text-body-lg max-w-md text-[#F5F5F7]/75">
              Send us the scope, location and timeline and we will reply by email.
            </p>
            <ul className="mt-[clamp(14px,2.6vh,32px)] max-w-md">
              {CONTACT_ROWS.map((row) => {
                const content = (
                  <>
                    <MaterialIcon
                      name={row.icon}
                      className="mt-0.5 text-[18px] text-[#F5F5F7]/60"
                    />
                    <span className="flex flex-col">
                      <span className="text-[12px] tracking-[0.12em] text-[#F5F5F7]/60 uppercase">
                        {row.label}
                      </span>
                      <span className="font-body-md text-base text-[#F5F5F7]">{row.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={row.label} className="border-t border-[#F5F5F7]/15">
                    {row.href ? (
                      <a
                        href={row.href}
                        {...(row.external ? { target: '_blank', rel: 'noopener' } : {})}
                        className="flex items-start gap-4 py-2 transition-colors duration-300 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 py-2">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="border border-[#F5F5F7]/15 bg-[#1A1A1A] p-stack-lg md:col-span-6 md:col-start-7">
            <InquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
