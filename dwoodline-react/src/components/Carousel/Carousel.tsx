import { useCarousel } from '@/hooks/useCarousel';
import { MaterialIcon } from '@/components/MaterialIcon/MaterialIcon';

export interface PortfolioSlide {
  image: string;
  location: string;
  year: string;
  title: string;
  description: string;
}

interface CarouselProps {
  carouselId: string;
  slides: PortfolioSlide[];
  onViewProject: (name: string) => void;
}

const DOT_ACTIVE = 'w-2 h-2 rounded-full bg-white ring-4 ring-white/20 transition-all';
const DOT_INACTIVE = 'w-2 h-2 rounded-full bg-white/40 hover:bg-white/60 transition-all';
const CONTROL_CLASS =
  'w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-on-background transition-all duration-300';

/** Horizontal project carousel (ported from 04-portfolio.html). */
export function Carousel({ carouselId, slides, onViewProject }: CarouselProps) {
  const { sliderRef, activeIndex, goPrev, goNext, goTo } = useCarousel(slides.length);

  return (
    <div className="relative w-full group/carousel" data-carousel-id={carouselId}>
      <div
        ref={sliderRef}
        className="project-carousel w-full overflow-x-auto no-scrollbar flex h-[70vh] scroll-smooth cursor-grab"
      >
        {slides.map((slide, index) => (
          <article
            key={slide.title}
            className="flex-none w-screen h-full carousel-snap-start relative group overflow-hidden"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                className="w-full h-full object-cover scale-110 transition-transform duration-[3000ms] ease-out group-hover:scale-100"
                src={slide.image}
                alt={slide.title}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-on-background/80 to-transparent z-10"></div>
            <div
              className={`absolute ${
                index === 0 ? 'bottom-16 left-20' : 'bottom-margin-page left-margin-page'
              } z-20 flex flex-col gap-stack-md text-white max-w-2xl`}
            >
              <div className="flex items-center gap-4">
                <span className="font-technical-label text-technical-label px-4 py-1 border border-white/20 bg-white/10 backdrop-blur-sm uppercase">
                  {slide.location}
                </span>
                <span className="h-[1px] w-12 bg-white/40"></span>
                <span className="font-technical-label text-technical-label text-white/60 uppercase">
                  Year: {slide.year}
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-white">{slide.title}</h2>
              <p className="font-body-md text-body-md text-white/70 max-w-lg">
                {slide.description}
              </p>
              <div className="mt-stack-sm flex gap-stack-md">
                <button
                  type="button"
                  onClick={() => onViewProject(slide.title)}
                  className="bg-white text-on-background px-8 py-4 font-technical-label text-technical-label uppercase tracking-widest hover:bg-secondary hover:text-white transition-colors duration-500"
                >
                  View Project
                </button>
                <button
                  type="button"
                  className="border border-white/30 text-white px-8 py-4 font-technical-label text-technical-label uppercase tracking-widest hover:bg-white/10 transition-colors duration-500"
                >
                  Technical Specs
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="absolute top-1/2 left-8 -translate-y-1/2 z-30">
        <button
          type="button"
          onClick={goPrev}
          className={CONTROL_CLASS}
          aria-label="Previous project"
        >
          <MaterialIcon name="chevron_left" />
        </button>
      </div>
      <div className="absolute top-1/2 right-8 -translate-y-1/2 z-30">
        <button type="button" onClick={goNext} className={CONTROL_CLASS} aria-label="Next project">
          <MaterialIcon name="chevron_right" />
        </button>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => goTo(index)}
            className={index === activeIndex ? DOT_ACTIVE : DOT_INACTIVE}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
