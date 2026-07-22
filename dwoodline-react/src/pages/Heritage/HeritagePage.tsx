import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { MaterialIcon } from '@/components/MaterialIcon/MaterialIcon';
import { useHtmlScrollSnap } from '@/hooks/useHtmlScrollSnap';

export function HeritagePage() {
  useHtmlScrollSnap('mandatory');

  return (
    <main className="pt-[100px] md:pt-[160px] pb-section-gap px-6 md:px-[80px]">
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
              <h1 className="font-display-hero text-on-background serif-text">
                Architectural Precision.
              </h1>
            </div>
            <div className="space-y-stack-md max-w-xl">
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                Founded in the mid-century modern era, dwoodline has spent seven decades perfecting
                the synthesis of structural integrity and aesthetic purity. Our journey began with a
                single vision: to treat every piece of timber with the reverence of a master
                architect.
              </p>
              <p className="font-body-md text-on-surface-variant/80">
                From the selection of premium Light Oak to the final sanding of Calacatta marble
                surfaces, our process remains a disciplined pursuit of perfection. We don&apos;t
                just build structures; we curate the environments where legacy lives.
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
                <span className="font-technical-label text-[#1A1A1A]">
                  PROVENANCE: PROJECT ALPHA, 1958
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-gutter w-full lg:w-4/5">
              <div className="aspect-square bg-oak/30 technical-border flex flex-col justify-end p-stack-md space-y-stack-sm">
                <span className="font-headline-md serif-text text-secondary">70+</span>
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
            <h2 className="font-headline-md serif-text">The Architectural Timeline</h2>
            <p className="font-body-md text-on-surface-variant mt-stack-sm">
              A chronological journey through seven decades of technical innovation and refined
              luxury.
            </p>
          </div>
          <div className="md:w-2/3 w-full space-y-stack-lg border-l border-on-background/10 pl-stack-lg">
            <div className="relative group cursor-default">
              <div className="absolute -left-[54px] top-1 w-3 h-3 bg-on-background" />
              <span className="font-headline-md serif-text block text-secondary">1955</span>
              <span className="font-technical-label uppercase tracking-widest text-on-background mt-2 block">
                Foundation
              </span>
              <p className="font-body-md text-on-surface-variant mt-4 max-w-lg">
                Founded in the wake of the post-war design boom, dwoodline established its first
                workshop dedicated to bespoke residential joinery.
              </p>
            </div>
            <div className="relative group cursor-default">
              <div className="absolute -left-[54px] top-1 w-3 h-3 bg-primary-fixed-dim group-hover:bg-on-background transition-colors" />
              <span className="font-headline-md serif-text block text-on-background/30 group-hover:text-secondary transition-colors">
                1982
              </span>
              <span className="font-technical-label uppercase tracking-widest text-on-background mt-2 block">
                The Modern Pivot
              </span>
              <p className="font-body-md text-on-surface-variant mt-4 max-w-lg">
                Expansion into commercial architectural systems, introducing the signature Black
                Aluminum and Light Oak framework.
              </p>
            </div>
            <div className="relative group cursor-default">
              <div className="absolute -left-[54px] top-1 w-3 h-3 bg-primary-fixed-dim group-hover:bg-on-background transition-colors" />
              <span className="font-headline-md serif-text block text-on-background/30 group-hover:text-secondary transition-colors">
                2024
              </span>
              <span className="font-technical-label uppercase tracking-widest text-on-background mt-2 block">
                Digital Precision
              </span>
              <p className="font-body-md text-on-surface-variant mt-4 max-w-lg">
                Leveraging advanced computational design to achieve 0.01mm tolerance in bespoke
                furniture and structural partitions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
