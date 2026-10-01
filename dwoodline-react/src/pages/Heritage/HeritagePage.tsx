import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { MaterialIcon } from '@/components/MaterialIcon/MaterialIcon';
import { useLuxeScroll } from '@/hooks/useLuxeScroll';

export function HeritagePage() {
  const scopeRef = useRef<HTMLElement>(null);
  useLuxeScroll(scopeRef);

  return (
    <main ref={scopeRef} className="pt-[100px] md:pt-[160px] pb-section-gap px-6 md:px-[80px]">
      {/* Heritage Section */}
      <section className="relative min-h-[819px] flex items-center justify-center overflow-hidden">
        {/* Background Large Typography */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <span className="font-headline-lg text-[25vw] leading-none text-primary-fixed-dim/10 tracking-tighter opacity-30 serif-text">
            1955
          </span>
        </div>
        {/* Heritage Content Grid */}
        <div className="grid grid-cols-12 gap-gutter w-full relative z-10">
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center space-y-stack-lg">
            <div className="space-y-stack-sm">
              <span className="font-technical-label text-secondary uppercase tracking-[0.2em]">
                Our Heritage
              </span>
              <h1 className="font-display-hero text-display-hero text-on-background serif-text">
                Architectural Precision.
              </h1>
            </div>
            <div className="space-y-stack-md max-w-xl">
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                Established in 1955, D Woodline was founded with a clear purpose: to create
                exceptional architectural woodwork. Today, led by the third generation of our
                family, we carry forward a tradition of luxury, precision, and genuine care for our
                craft.
              </p>
              <p className="font-body-md text-on-surface-variant/80">
                Our work balances the past and the future, merging classical woodworking techniques
                with advanced manufacturing technology to create high-end interiors that are
                elegant, highly functional, and attuned to modern design. Built on a strict
                attention to detail and only the finest materials, we have partnered with renowned
                brands and interior architecture studios to bring their most important projects to
                life.
              </p>
            </div>
            <div className="pt-stack-md">
              <Link
                to={ROUTES.portfolio}
                className="inline-flex bg-on-background text-background px-10 py-5 font-technical-label uppercase tracking-widest hover:bg-secondary transition-colors duration-500 items-center gap-4 group"
              >
                Explore Archive
                <MaterialIcon
                  name="arrow_forward"
                  className="text-sm group-hover:translate-x-2 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 flex flex-col items-end space-y-gutter">
            {/* Heritage Imagery Stack */}
            <div className="relative w-full aspect-[16/10] bg-surface-container-low technical-border group overflow-hidden">
              <img
                alt="Heritage Design"
                className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 transition-transform duration-1000"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPrPXgRqYDHM-FDq6IbdL6cI69jeGddMkA0aztb5yYysQZ_2-u0eph0wJu9oBNASx-lzPt5LXy4rkey-3s8lJX6AAUCsk-eqW5sSEkVsGK87jlHyfOOqkyLsDlVueLv2fZnTnZ1KM5lh7jJxZMw-w6thB3-OG3hvksLw7hfPW9A2tU7CLCqGfhBJHCGYbeI4HHhFJ_GltBtZawKDzKuehyPArEPmuQEngKdM3fd-z0mUd5yyTqfpxkLQxhj_p-pv87_1aTIFUof8o"
              />
              <div className="absolute bottom-0 left-0 p-stack-md bg-white/80 backdrop-blur-sm border-r border-t border-[#1A1A1A]/10">
                <span className="font-technical-label text-[#1A1A1A]">ESTABLISHED 1955</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-gutter w-full lg:w-4/5">
              <div className="aspect-square bg-oak/30 technical-border flex flex-col justify-end p-stack-md space-y-stack-sm">
                <span className="font-headline-md text-headline-md serif-text text-secondary">
                  70+
                </span>
                <span className="font-technical-label text-on-surface-variant uppercase tracking-wider">
                  Years of Mastery
                </span>
              </div>
              <div className="aspect-square bg-surface-container-highest technical-border relative overflow-hidden group">
                <img
                  alt="Material Detail"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD__WpwqeVz9Xd2zM0kLsBKWpCZyt2Q2_hwVaOF36e_gy_V8LmwePdz59PMWzq9F0oRcWhIQ_lWgXtNEnBRUSMe-uUzF5TMLregiSbI4Cg0fFISTJApq5oqmHq3usKrLWGdCF1OlM2AtwEnzHJ1b1gx9too7bKLoIUKaanXLv1SJPbbTCzxockHhuxyICMFLv_IX1rpsubNxa2ZXp7PZ45ElZ-S65UOJO6SE7NAN0QaQ8Xkb-pb2aA71SDyJ_5FiEiJCmY0HpsFSPg"
                />
                <div className="absolute inset-0 bg-on-background/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Timeline */}
      <section className="mt-section-gap border-t border-[#1A1A1A]/10 pt-stack-lg">
        <div className="flex flex-col md:flex-row justify-between items-start gap-gutter">
          <div className="md:w-1/3">
            <h2 className="font-headline-md text-headline-md serif-text">
              Three generations of craft
            </h2>
            <p className="font-body-md text-on-surface-variant mt-stack-sm">
              Seven decades, three generations, one uncompromising standard of craft.
            </p>
          </div>
          <div className="md:w-2/3 w-full space-y-stack-lg border-l border-on-background/10 pl-stack-lg">
            <div className="relative group cursor-default">
              <div className="absolute -left-[54px] top-1 w-3 h-3 bg-on-background" />
              <span className="font-headline-md text-headline-md serif-text block text-secondary">
                I
              </span>
              <span className="font-technical-label uppercase tracking-widest text-on-background mt-2 block">
                First Generation · 1955
              </span>
              <p className="font-body-md text-on-surface-variant mt-4 max-w-lg">
                D Woodline is founded with a clear purpose: to create exceptional architectural
                woodwork, grounded in luxury and precision.
              </p>
            </div>
            <div className="relative group cursor-default">
              <div className="absolute -left-[54px] top-1 w-3 h-3 bg-primary-fixed-dim group-hover:bg-on-background transition-colors" />
              <span className="font-headline-md text-headline-md serif-text block text-on-background/30 group-hover:text-secondary transition-colors">
                II
              </span>
              <span className="font-technical-label uppercase tracking-widest text-on-background mt-2 block">
                Second Generation
              </span>
              <p className="font-body-md text-on-surface-variant mt-4 max-w-lg">
                The family&apos;s standards of precision and care are refined and handed down,
                keeping craft at the centre of every commission.
              </p>
            </div>
            <div className="relative group cursor-default">
              <div className="absolute -left-[54px] top-1 w-3 h-3 bg-primary-fixed-dim group-hover:bg-on-background transition-colors" />
              <span className="font-headline-md text-headline-md serif-text block text-on-background/30 group-hover:text-secondary transition-colors">
                III
              </span>
              <span className="font-technical-label uppercase tracking-widest text-on-background mt-2 block">
                Third Generation · Today
              </span>
              <p className="font-body-md text-on-surface-variant mt-4 max-w-lg">
                Classical woodworking techniques are merged with advanced manufacturing to produce
                elegant, highly functional interiors for modern design.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
