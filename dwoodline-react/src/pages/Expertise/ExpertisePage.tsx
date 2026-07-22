import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { MaterialIcon } from '@/components/MaterialIcon/MaterialIcon';
import { useHtmlScrollSnap } from '@/hooks/useHtmlScrollSnap';
import { useExpertiseScroll } from '@/hooks/useExpertiseScroll';

const CIRCLE_BORDER = { border: '3px solid #6B4E31' } as const;

const GRAIN_NOISE = {
  backgroundImage:
    "url('data:image/svg+xml,%3Csvg viewBox%3D%220 0 200 200%22 xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter id%3D%22noise%22%3E%3CfeTurbulence type%3D%22fractalNoise%22 baseFrequency%3D%220.65%22 numOctaves%3D%223%22 stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect width%3D%22100%25%22 height%3D%22100%25%22 filter%3D%22url(%23noise)%22 opacity%3D%221%22/%3E%3C/svg%3E')",
  opacity: 0.04,
  mixBlendMode: 'multiply',
} as const;

export function ExpertisePage() {
  useHtmlScrollSnap('proximity');
  useExpertiseScroll();

  return (
    <>
      {/* Side Progress Indicator */}
      <div className="hidden md:flex fixed right-10 top-1/2 -translate-y-1/2 z-50 flex-col space-y-4 items-center">
        <div className="progress-dot" data-target="ch-1"></div>
        <div className="progress-dot" data-target="ch-2"></div>
        <div className="progress-dot" data-target="ch-3"></div>
        <div className="progress-dot" data-target="cta-end"></div>
      </div>

      <main className="w-full">
        {/* Chapter 1: Architectural Millwork (Live Drafting) */}
        <section
          className="snap-section flex items-center justify-center bg-surface-container-lowest"
          id="ch-1"
        >
          <div className="absolute inset-0 architectural-grid"></div>
          <div className="light-beam"></div>
          <div className="max-w-6xl mx-auto px-6 md:px-[80px] grid grid-cols-1 lg:grid-cols-2 gap-24 items-center z-10">
            <div className="reveal">
              <span className="font-technical-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-4 block reveal-stagger-1">
                Chapter 01 — Division 06
              </span>
              <h2 className="font-headline-lg text-headline-lg serif-text leading-tight mb-8 reveal-stagger-2">
                Architectural Millwork Shop Drawings
              </h2>
              <p className="font-body-lg text-on-surface-variant max-w-md mb-12 reveal-stagger-3">
                Precision drafting utilizing mid-century rigor and contemporary BIM software. We
                translate architectural intent into production-ready technical data.
              </p>
              <div className="flex space-x-8 reveal-stagger-3">
                <div className="text-left">
                  <span className="block font-headline-md text-2xl serif-text">1:10</span>
                  <span className="font-technical-label text-[9px] uppercase tracking-widest opacity-40">
                    Detail Scale
                  </span>
                </div>
                <div className="text-left">
                  <span className="block font-headline-md text-2xl serif-text">CAD/BIM</span>
                  <span className="font-technical-label text-[9px] uppercase tracking-widest opacity-40">
                    Drafting Standard
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full justify-center py-2">
              {/* Circle 1 — left */}
              <div className="detail-circle self-start ml-8">
                <div className="w-40 h-40 rounded-full overflow-hidden" style={CIRCLE_BORDER}>
                  <img
                    src="https://picsum.photos/seed/dwl01/160/160"
                    className="w-full h-full object-cover"
                    alt="Detail 01"
                  />
                </div>
              </div>
              {/* Circle 2 — right */}
              <div className="detail-circle self-end mr-8">
                <div className="w-40 h-40 rounded-full overflow-hidden" style={CIRCLE_BORDER}>
                  <img
                    src="https://picsum.photos/seed/dwl02/160/160"
                    className="w-full h-full object-cover"
                    alt="Detail 02"
                  />
                </div>
              </div>
              {/* Circle 3 — left */}
              <div className="detail-circle self-start ml-8">
                <div className="w-40 h-40 rounded-full overflow-hidden" style={CIRCLE_BORDER}>
                  <img
                    src="https://picsum.photos/seed/dwl03/160/160"
                    className="w-full h-full object-cover"
                    alt="Detail 03"
                  />
                </div>
              </div>
              {/* Circle 4 — right */}
              <div className="detail-circle self-end mr-8">
                <div className="w-40 h-40 rounded-full overflow-hidden" style={CIRCLE_BORDER}>
                  <img
                    src="https://picsum.photos/seed/dwl04/160/160"
                    className="w-full h-full object-cover"
                    alt="Detail 04"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 2: Custom Veneer Mapping (Material Reveal) */}
        <section
          className="snap-section flex items-center justify-center bg-surface relative overflow-hidden"
          id="ch-2"
        >
          <div className="absolute inset-0 z-0 bg-surface">
            <img
              alt="Veneer texture"
              className="w-full h-full object-cover opacity-30 mix-blend-multiply transition-transform duration-[4s] ease-out parallax-bg"
              src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=1400&q=70"
            />
          </div>
          <div className="absolute inset-0 z-1 pointer-events-none" style={GRAIN_NOISE}></div>
          <div className="max-w-6xl mx-auto px-6 md:px-[80px] w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl reveal bg-surface/80 backdrop-blur-md border border-white/40 p-8 lg:p-10 shadow-2xl rounded-sm">
              <span className="font-technical-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-3 block reveal-stagger-1">
                Chapter 02 — Materiality
              </span>
              <h2 className="font-headline-lg text-headline-lg serif-text leading-tight mb-5 reveal-stagger-2">
                Custom Veneer Mapping &amp; Sequence Control
              </h2>
              <p className="font-body-lg text-on-surface-variant mb-6 reveal-stagger-3">
                Grain matching is not an afterthought. Our digital mapping process ensures seamless
                heritage-quality interiors through rigorous sequence control.
              </p>
              <div className="grid grid-cols-2 gap-6 py-6 border-t border-on-surface-variant/10 reveal-stagger-3">
                <div className="space-y-4">
                  <MaterialIcon name="layers" className="text-secondary" />
                  <h4 className="font-headline-md text-xl serif-text">Book-match Precision</h4>
                  <p className="text-caption text-on-surface-variant">
                    Symmetrical grain alignment across full-height panels.
                  </p>
                </div>
                <div className="space-y-4">
                  <MaterialIcon name="texture" className="text-secondary" />
                  <h4 className="font-headline-md text-xl serif-text">Species Curation</h4>
                  <p className="text-caption text-on-surface-variant">
                    Technical selection of walnut, oak, and exotic burrs.
                  </p>
                </div>
              </div>
            </div>
            <div className="reveal reveal-stagger-2 relative h-[400px] overflow-hidden rounded-sm border border-outline-variant/20 shadow-xl">
              <div className="absolute inset-0 bg-[#e5e2e1] z-2 veneer-mask transition-all duration-[2s]"></div>
              <img
                alt="Walnut veneer detail"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=800&q=80"
              />
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-2 text-[10px] uppercase tracking-widest font-technical-label">
                Texture Mapping V1.4
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 3: Hardware Integration (Exploded View) */}
        <section
          className="snap-section flex items-center justify-center bg-[#1C1B1B] text-surface-bright"
          id="ch-3"
        >
          <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none invert"></div>
          <div className="light-beam opacity-20"></div>
          <div className="max-w-6xl mx-auto px-6 md:px-[80px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
            <div className="reveal">
              <span className="font-technical-label text-[10px] uppercase tracking-[0.3em] text-tertiary-fixed mb-3 block reveal-stagger-1">
                Chapter 03 — Technicality
              </span>
              <h2 className="font-headline-lg text-headline-lg serif-text leading-tight mb-6 reveal-stagger-2">
                Hardware Integration &amp;
                <br />
                Black Aluminum Coordination
              </h2>
              <p className="font-body-lg text-surface-container-highest max-w-3xl mb-6 reveal-stagger-3 opacity-80">
                Where wood meets metal. We coordinate complex architectural hardware, specialized
                lighting profiles, and mechanical systems into the millwork fabric.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 reveal-stagger-3">
                <div className="p-5 border border-surface-bright/10 bg-surface-bright/5 hover:bg-surface-bright/10 transition-colors duration-700">
                  <MaterialIcon
                    name="precision_manufacturing"
                    className="text-tertiary-fixed text-2xl mb-2"
                  />
                  <h5 className="font-technical-label text-[11px] uppercase tracking-[0.2em] mb-1">
                    CNC Accuracy
                  </h5>
                  <p className="text-caption opacity-60">
                    Sub-millimeter routing for concealed hardware.
                  </p>
                </div>
                <div className="p-5 border border-surface-bright/10 bg-surface-bright/5 hover:bg-surface-bright/10 transition-colors duration-700">
                  <MaterialIcon name="bolt" className="text-tertiary-fixed text-2xl mb-2" />
                  <h5 className="font-technical-label text-[11px] uppercase tracking-[0.2em] mb-1">
                    LEED Standards
                  </h5>
                  <p className="text-caption opacity-60">
                    Integrated low-voltage lighting profiles.
                  </p>
                </div>
                <div className="p-5 border border-surface-bright/10 bg-surface-bright/5 hover:bg-surface-bright/10 transition-colors duration-700">
                  <MaterialIcon name="handyman" className="text-tertiary-fixed text-2xl mb-2" />
                  <h5 className="font-technical-label text-[11px] uppercase tracking-[0.2em] mb-1">
                    Installation Rigor
                  </h5>
                  <p className="text-caption opacity-60">
                    Engineered joinery designed for efficient field assembly.
                  </p>
                </div>
                <div className="p-5 border border-surface-bright/10 bg-surface-bright/5 hover:bg-surface-bright/10 transition-colors duration-700">
                  <MaterialIcon
                    name="verified_user"
                    className="text-tertiary-fixed text-2xl mb-2"
                  />
                  <h5 className="font-technical-label text-[11px] uppercase tracking-[0.2em] mb-1">
                    Longevity
                  </h5>
                  <p className="text-caption opacity-60">
                    Joinery designed to outlast the structure it inhabits.
                  </p>
                </div>
              </div>
            </div>
            {/* Exploded View Animation */}
            <div className="relative reveal flex items-center justify-center h-[400px]">
              <div className="absolute w-64 h-80 bg-[#313030] border border-white/5 shadow-2xl rounded-sm z-10"></div>
              <div
                className="absolute hardware-component hardware-left z-20"
                style={{ left: '-10%' }}
              >
                <div className="w-48 h-1 bg-black/80 shadow-lg mb-2"></div>
                <div className="w-32 h-1 bg-black/80 shadow-lg"></div>
                <span className="text-[8px] uppercase tracking-tighter opacity-40 absolute -top-4">
                  Al-Plate 04
                </span>
              </div>
              <div
                className="absolute hardware-component hardware-right z-20"
                style={{ right: '-10%' }}
              >
                <div className="w-12 h-12 border-2 border-tertiary-fixed rounded-full opacity-40"></div>
                <span className="text-[8px] uppercase tracking-tighter opacity-40 absolute -bottom-4">
                  Pivot-Hinge X-1
                </span>
              </div>
              <img
                alt="Architectural hardware detail"
                className="w-full h-full object-cover grayscale opacity-20 absolute inset-0"
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80"
              />
            </div>
          </div>
        </section>

        {/* Chapter 4: CTA */}
        <section
          className="snap-section flex flex-col bg-surface-container-low relative"
          id="cta-end"
        >
          <div className="flex-grow flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center px-6 md:px-[80px] reveal">
              <h2 className="font-headline-lg text-headline-lg serif-text mb-8">
                Begin the Technical Phase
              </h2>
              <p className="font-body-lg text-on-surface-variant mb-16 max-w-2xl mx-auto">
                Submit your architectural intent drawings for a comprehensive technical feasibility
                review and millwork consultation.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8">
                <Link
                  to={ROUTES.inquiry}
                  className="bg-[#1A1A1A] text-white px-12 py-6 font-technical-label uppercase tracking-[0.2em] text-[10px] transition-all duration-700 hover:tracking-[0.3em] hover:bg-black"
                >
                  Inquire Now
                </Link>
                <Link
                  to={ROUTES.portfolio}
                  className="border border-[#1A1A1A] text-[#1A1A1A] px-12 py-6 font-technical-label uppercase tracking-[0.2em] text-[10px] hover:bg-[#1A1A1A] hover:text-white transition-all duration-700"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
