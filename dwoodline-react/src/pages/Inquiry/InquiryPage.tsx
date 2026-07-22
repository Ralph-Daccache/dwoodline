import { useHtmlScrollSnap } from '@/hooks/useHtmlScrollSnap';
import { MaterialIcon } from '@/components/MaterialIcon/MaterialIcon';
import { InquiryForm } from '@/components/InquiryForm/InquiryForm';

export function InquiryPage() {
  useHtmlScrollSnap('mandatory');

  return (
    <main>
      {/* Inquiry Section (Dramatic Transition) */}
      <section className="min-h-screen bg-[#1A1A1A] text-[#F5F5F7] flex flex-col justify-center relative overflow-hidden">
        {/* Background Image Backdrop for Materiality */}
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
          <img
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
      {/* Technical Specification Detail (Visual Break) */}
      <section className="bg-[#0D0D0D] py-stack-lg px-6 md:px-[80px]">
        <div className="border-t border-[#F5F5F7]/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-gutter">
          <div className="flex gap-8 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto no-scrollbar">
            <div className="flex flex-col">
              <span className="font-technical-label text-[10px] text-[#F5F5F7]/30 uppercase">
                Material Reference
              </span>
              <span className="font-body-md text-[#F5F5F7] mt-1 whitespace-nowrap">
                Black Anodized Aluminum
              </span>
            </div>
            <div className="w-[1px] h-10 bg-[#F5F5F7]/10 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="font-technical-label text-[10px] text-[#F5F5F7]/30 uppercase">
                Studio Origin
              </span>
              <span className="font-body-md text-[#F5F5F7] mt-1 whitespace-nowrap">
                Milan, Italy / 1955
              </span>
            </div>
            <div className="w-[1px] h-10 bg-[#F5F5F7]/10 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="font-technical-label text-[10px] text-[#F5F5F7]/30 uppercase">
                Precision Rating
              </span>
              <span className="font-body-md text-[#F5F5F7] mt-1 whitespace-nowrap">
                0.02mm Tolerance
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="w-12 h-12 flex items-center justify-center border border-[#F5F5F7]/10 text-[#F5F5F7] hover:bg-[#F5F5F7] hover:text-[#1A1A1A] transition-colors duration-300">
              <MaterialIcon name="north_east" className="text-sm" />
            </span>
            <span className="w-12 h-12 flex items-center justify-center border border-[#F5F5F7]/10 text-[#F5F5F7] hover:bg-[#F5F5F7] hover:text-[#1A1A1A] transition-colors duration-300">
              <MaterialIcon name="expand_more" className="text-sm" />
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
