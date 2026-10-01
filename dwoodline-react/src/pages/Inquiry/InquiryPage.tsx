import { InquiryForm } from '@/components/InquiryForm/InquiryForm';
import { useSectionScroll } from '@/hooks/useSectionScroll';

export function InquiryPage() {
  // Desktop section-snap (footer-aware), matching Home / Projects / Services.
  useSectionScroll();

  return (
    <main>
      {/* Inquiry Section (Dramatic Transition) */}
      <section className="snap-target min-h-[100dvh] bg-[#1A1A1A] text-[#F5F5F7] flex flex-col justify-center relative overflow-hidden pt-[clamp(104px,16vw,160px)] pb-stack-lg">
        {/* Background Image Backdrop for Materiality */}
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
          <img
            data-parallax
            className="w-full h-full object-cover"
            alt="A close-up high-resolution photograph of dark black aluminum architectural panels with a subtle brushed texture. The lighting is moody and low-key, highlighting the crisp edges and structural integrity of the material. Deep shadows and cool highlights emphasize the minimalist and industrial aesthetic, perfectly aligned with a luxury design studio's brand identity."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN8tsGWMRYnl-csyNbBkr_0w-JQ-i4WvoIS1in2dCA3sVfqC6OYp3kZzmyyokLzt36L-hptXAJQPEC0pD8SxE8M5ZWA9nesn4qcvXgy9wtjLXsq3DF8mgFDw9o644IkBgPV17kKYaACuj3nF2lpsPuClftV-ZwUudDK2cCMVjDSEgQkYSkKPQ0DFPS-Q3Z6vRI6WOfr9cTsXW-DTmZa8LnCIZ7brX2jTKiw2hu86M1EWkknZ_yTcu5X_v5iTG-gJSfloCgMD_oB3w"
          />
        </div>
        <div className="relative z-10 px-6 md:px-[80px] grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          {/* Headline Narrative */}
          <div className="md:col-span-5 pt-stack-lg">
            <span className="font-technical-label text-technical-label uppercase tracking-[0.3em] text-[#F5F5F7]/40 block mb-stack-md">
              Section 05 // Inquiry
            </span>
            <h2 className="font-display-hero text-headline-lg md:text-display-hero leading-none mb-stack-lg">
              Begin a <br />
              New Legacy.
            </h2>
            <p className="font-body-lg text-body-lg text-[#F5F5F7]/60 max-w-md">
              We invite architects and private clients to discuss bespoke commissions. Our studio
              operates with the same precision we apply to our wood and aluminum structures.
            </p>
            <div className="mt-section-gap hidden md:block">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-[1px] bg-[#F5F5F7]/20 group-hover:w-20 transition-all duration-500"></div>
                <span className="font-technical-label text-technical-label uppercase tracking-widest text-[#F5F5F7]/40">
                  Studio Schedule: 09:00 - 18:00
                </span>
              </div>
            </div>
          </div>
          {/* Minimalist Form */}
          <div className="md:col-span-6 md:col-start-7 bg-[#1A1A1A] p-stack-lg border border-[#F5F5F7]/10">
            <InquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
