import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { MaterialIcon } from '@/components/MaterialIcon/MaterialIcon';
import { useHtmlScrollSnap } from '@/hooks/useHtmlScrollSnap';
import { useHomeScroll } from '@/hooks/useHomeScroll';

export function HomePage() {
  useHtmlScrollSnap('mandatory');
  useHomeScroll();

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="snap-target relative w-full flex items-center justify-center overflow-hidden py-20">
        {/* Video Background */}
        <video
          className="absolute inset-0 z-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://videos.pexels.com/video-files/3571904/3571904-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://videos.pexels.com/video-files/3571904/3571904-uhd_2560_1440_30fps.webm"
            type="video/webm"
          />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for depth */}
        <div className="absolute inset-0 bg-white/10 backdrop-contrast-75"></div>
        {/* Content Overlay */}
        <div className="relative z-10 text-center px-6 md:px-[80px] py-40 max-w-4xl mx-auto">
          <div className="space-y-stack-md">
            <h1 className="font-display-hero text-display-hero text-on-surface tracking-[-0.04em] mix-blend-multiply">
              dwoodline
            </h1>
            <p className="font-technical-label text-technical-label uppercase tracking-[0.4em] text-on-surface-variant">
              Architectural Woodwork Since 1955
            </p>
          </div>
          {/* CTA Area */}
          <div className="mt-stack-lg flex flex-col md:flex-row items-center justify-center gap-gutter">
            <Link
              to={ROUTES.portfolio}
              className="inline-block bg-[#1A1A1A] text-white px-stack-lg py-4 font-technical-label uppercase tracking-widest hover:bg-[#705b3f] transition-colors duration-500 rounded-none"
            >
              View Portfolio
            </Link>
            <Link
              to={ROUTES.expertise}
              className="inline-block border border-[#1A1A1A] text-[#1A1A1A] px-stack-lg py-4 font-technical-label uppercase tracking-widest hover:bg-[#F5F5F7] transition-colors duration-500 rounded-none"
            >
              Our Process
            </Link>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="scroll-indicator flex flex-col items-center gap-4 text-on-surface-variant">
          <div className="w-[2px] h-16 bg-on-surface-variant/40 relative overflow-hidden rounded-full">
            <div className="scroll-line absolute top-0 left-0 w-full bg-on-surface-variant rounded-full"></div>
          </div>
          <span className="font-technical-label text-technical-label uppercase tracking-widest text-on-surface-variant font-light text-[11px]">
            Scroll
          </span>
          <div className="section-progress">
            <div className="progress-dot active"></div>
            <div className="progress-dot"></div>
            <div className="progress-dot"></div>
          </div>
        </div>
      </section>

      {/* Feature Section: The Grid of Materiality */}
      <section className="snap-target px-margin-page bg-surface flex flex-col items-start justify-start pt-32 pb-4">
        <div className="w-full max-w-6xl">
          <div className="mb-stack-lg">
            <h2 className="font-headline-lg text-headline-lg text-on-background mb-stack-sm">
              Structural Minimalism meets Heritage.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Our practice is rooted in the mathematical intent of architectural blueprints. We
              utilize Calacatta marble and premium walnut to create spaces that define authority
              through quiet precision.
            </p>
          </div>
          <div className="grid grid-cols-12 gap-gutter items-stretch mb-stack-lg">
            <div className="col-span-12 md:col-span-7 aspect-[16/9] bg-surface-container overflow-hidden group">
              <img
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9odQsBgZudrfZXPYsu9JhpTZNGzUVwjudFCK1BbpMjNEJ7CgPV1e7qcKkxFlAFSANtoepzO7i1q4TcCEp83x2cJFIahBae3Hgugk3BzjKh67cXzMHb8uJVLPjEDU3cdBJlIXcxEpqZPCAqgRJnwKJmLQ9lql9xm7Pc-UwccHxREBkcWjKySAy7V0ZEQDE42jxHARuUE0-DmJSx0jBFGxRtYwcw45UYgXN6uI3ZNY5diEIFLgUmmbcG53T1fg4uEDPuPwJwl3pdJI"
              />
            </div>
            <div className="col-span-12 md:col-span-5 flex flex-col gap-stack-md">
              {/* Founded Info */}
              <div className="text-right border-l border-outline-variant/30 pl-stack-md">
                <span className="font-headline-md text-headline-md block">1955</span>
                <span className="font-technical-label text-technical-label uppercase tracking-tighter text-on-surface-variant">
                  Founded in Michigan
                </span>
              </div>
              {/* Project Card */}
              <div className="flex flex-col justify-between p-stack-md border border-outline-variant/10 bg-surface-container-low h-full">
                <div>
                  <span className="font-technical-label text-technical-label bg-secondary text-white px-3 py-1 mb-stack-sm inline-block">
                    Solid Walnut
                  </span>
                  <h3 className="font-headline-md text-body-lg font-bold mt-stack-sm">
                    The Heritage Library
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-stack-sm text-sm">
                    Structural black aluminum inserts supporting cantilevered oak shelving.
                  </p>
                </div>
                <div className="pt-stack-md border-t border-outline-variant/20 mt-auto">
                  <a
                    className="font-technical-label text-technical-label uppercase tracking-widest flex items-center gap-unit group text-xs"
                    href="#"
                  >
                    Explore Project
                    <MaterialIcon
                      name="arrow_forward"
                      className="text-[14px] group-hover:translate-x-2 transition-transform"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specification Section */}
      <section className="snap-target bg-[#1A1A1A] text-[#F5F5F7] px-margin-page flex items-start justify-start pt-40 pb-20">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-stack-lg">
            <div className="max-w-xl">
              <span className="font-technical-label text-technical-label text-secondary-fixed-dim uppercase tracking-[0.2em]">
                Material Integrity
              </span>
              <h2 className="font-display-hero text-headline-lg mt-stack-sm leading-tight">
                Calculated Elegance.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-x-gutter gap-y-stack-lg w-full md:w-auto">
              <div>
                <p className="font-technical-label text-[10px] text-[#F5F5F7]/40 uppercase mb-unit">
                  Precision
                </p>
                <p className="font-body-md text-body-md">0.01mm Tolerance</p>
              </div>
              <div>
                <p className="font-technical-label text-[10px] text-[#F5F5F7]/40 uppercase mb-unit">
                  Sourcing
                </p>
                <p className="font-body-md text-body-md">Certified Walnut</p>
              </div>
              <div>
                <p className="font-technical-label text-[10px] text-[#F5F5F7]/40 uppercase mb-unit">
                  Finish
                </p>
                <p className="font-body-md text-body-md">Matte Aluminum</p>
              </div>
              <div>
                <p className="font-technical-label text-[10px] text-[#F5F5F7]/40 uppercase mb-unit">
                  Heritage
                </p>
                <p className="font-body-md text-body-md">Since 1955</p>
              </div>
            </div>
          </div>
          <div className="mt-section-gap grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="border border-[#F5F5F7]/10 p-stack-lg group hover:bg-[#F5F5F7]/5 transition-colors duration-500">
              <MaterialIcon name="architecture" className="text-4xl mb-stack-md" />
              <h4 className="font-headline-md text-body-lg font-bold mb-stack-sm">Drafting</h4>
              <p className="font-body-md text-body-md text-[#F5F5F7]/60">
                Every project begins with a 1:1 scale blueprint analysis to ensure structural
                viability.
              </p>
            </div>
            <div className="border border-[#F5F5F7]/10 p-stack-lg group hover:bg-[#F5F5F7]/5 transition-colors duration-500">
              <MaterialIcon name="precision_manufacturing" className="text-4xl mb-stack-md" />
              <h4 className="font-headline-md text-body-lg font-bold mb-stack-sm">Milling</h4>
              <p className="font-body-md text-body-md text-[#F5F5F7]/60">
                State-of-the-art CNC precision meets the steady hand of a master carpenter.
              </p>
            </div>
            <div className="border border-[#F5F5F7]/10 p-stack-lg group hover:bg-[#F5F5F7]/5 transition-colors duration-500">
              <MaterialIcon name="verified_user" className="text-4xl mb-stack-md" />
              <h4 className="font-headline-md text-body-lg font-bold mb-stack-sm">Longevity</h4>
              <p className="font-body-md text-body-md text-[#F5F5F7]/60">
                Our joinery is designed to outlast the structure it inhabits, guaranteed for
                decades.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
