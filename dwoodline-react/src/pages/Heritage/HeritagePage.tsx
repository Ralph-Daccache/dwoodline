import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROUTES } from '@/config/routes';
import { MaterialIcon } from '@/components/MaterialIcon/MaterialIcon';
import { useLuxeScroll } from '@/hooks/useLuxeScroll';
import { WoodDisc } from './GrainRings';
import woodDiscUrl from '@/assets/wood-disc.jpg';

gsap.registerPlugin(ScrollTrigger);

const IMG_ROOM =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCPrPXgRqYDHM-FDq6IbdL6cI69jeGddMkA0aztb5yYysQZ_2-u0eph0wJu9oBNASx-lzPt5LXy4rkey-3s8lJX6AAUCsk-eqW5sSEkVsGK87jlHyfOOqkyLsDlVueLv2fZnTnZ1KM5lh7jJxZMw-w6thB3-OG3hvksLw7hfPW9A2tU7CLCqGfhBJHCGYbeI4HHhFJ_GltBtZawKDzKuehyPArEPmuQEngKdM3fd-z0mUd5yyTqfpxkLQxhj_p-pv87_1aTIFUof8o';
const IMG_WOOD =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD__WpwqeVz9Xd2zM0kLsBKWpCZyt2Q2_hwVaOF36e_gy_V8LmwePdz59PMWzq9F0oRcWhIQ_lWgXtNEnBRUSMe-uUzF5TMLregiSbI4Cg0fFISTJApq5oqmHq3usKrLWGdCF1OlM2AtwEnzHJ1b1gx9too7bKLoIUKaanXLv1SJPbbTCzxockHhuxyICMFLv_IX1rpsubNxa2ZXp7PZ45ElZ-S65UOJO6SE7NAN0QaQ8Xkb-pb2aA71SDyJ_5FiEiJCmY0HpsFSPg';

const STATEMENT =
  'Established in 1955, D Woodline was founded with a clear purpose: to create exceptional architectural woodwork. Today, led by the third generation of our family, we carry forward a tradition of luxury, precision, and genuine care for our craft.';

const GENERATIONS = [
  {
    numeral: 'I',
    title: 'First Generation · 1955',
    text: 'D Woodline is founded with a clear purpose: to create exceptional architectural woodwork, grounded in luxury and precision.',
  },
  {
    numeral: 'II',
    title: 'Second Generation',
    text: "The family's standards of precision and care are refined and handed down, keeping craft at the centre of every commission.",
  },
  {
    numeral: 'III',
    title: 'Third Generation · Today',
    text: 'Classical woodworking techniques are merged with advanced manufacturing to produce elegant, highly functional interiors for modern design.',
  },
] as const;

/* The counter stops on one year per generation: I = START_YEAR, II = GEN2_YEAR,
   III = the current year. The log has one growth ring per year in between. */
const START_YEAR = 1955;
const GEN2_YEAR = 1996;
const END_YEAR = new Date().getFullYear();
const RING_COUNT = END_YEAR - START_YEAR + 1;
/** Rings already grown when the pinned scene starts (the founding years). */
const FOUNDING_RINGS = 6;

/** Splits a line into words, each wrapped in a clip mask for the load-in reveal. */
function MaskedWords({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
        >
          <span data-word className="inline-block">
            {word}
            {' '}
          </span>
        </span>
      ))}
    </>
  );
}

export function HeritagePage() {
  const scopeRef = useRef<HTMLElement>(null);
  useLuxeScroll(scopeRef);

  // layout effect: hide/animate before first paint so the hero never flashes
  useLayoutEffect(() => {
    const root = scopeRef.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        fine: '(hover: hover) and (pointer: fine)',
      },
      (context) => {
        const { motion, fine } = context.conditions as { motion: boolean; fine: boolean };
        if (!motion) return undefined;

        root.classList.add('hx-motion');
        ScrollTrigger.config({ ignoreMobileResize: true });
        const q = gsap.utils.selector(root);
        // rings are painted outer-first; flip so index 0 is the innermost year
        const ringsOf = (sel: string): SVGElement[] =>
          (q(sel) as unknown as SVGElement[]).reverse();

        /* ---- Hero: one-time reveal only (the log is a baked image, so it stays cheap) ---- */
        gsap.from(q('[data-hero-disc] img'), {
          scale: 1.07,
          autoAlpha: 0,
          duration: 1.8,
          ease: 'power2.out',
        });
        gsap.from(q('[data-hero] [data-word]'), {
          yPercent: 115,
          duration: 1.3,
          ease: 'power4.out',
          stagger: 0.09,
          delay: 0.35,
        });
        gsap.from(q('[data-hero-fade]'), {
          autoAlpha: 0,
          y: 24,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.85,
        });
        gsap.to(q('[data-hero-copy]'), {
          y: -70,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-hero]',
            start: 'center center',
            end: 'bottom top',
            scrub: 0.6,
          },
        });

        /* ---- Statement: words surface as you read ---- */
        gsap.fromTo(
          q('[data-scrub-word]'),
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.12,
            scrollTrigger: {
              trigger: '[data-statement]',
              start: 'top 75%',
              end: 'bottom 45%',
              scrub: 0.5,
            },
          },
        );
        gsap.from(q('[data-statement-body]'), {
          autoAlpha: 0,
          y: 30,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-statement-body]', start: 'top 88%' },
        });

        /* ---- Pinned stage: the log grows only while the counter rolls ---- */
        const stageRings = ringsOf('[data-stage-ring]');
        const stageGroup = q('[data-stage] [data-ring-group]');
        const stageDetail = q('[data-stage] [data-disc-detail], [data-stage] [data-bark]');
        const marks = q('[data-stage] [data-mark]');
        const panels = q('[data-gen]');
        const yearEl = root.querySelector<HTMLElement>('[data-year]');
        const idx96 = GEN2_YEAR - START_YEAR;
        const last = stageRings.length - 1;
        gsap.set([stageGroup, stageRings], { svgOrigin: '500 500' });
        gsap.set(stageRings.slice(FOUNDING_RINGS + 1), { autoAlpha: 0 });
        gsap.set(stageDetail, { autoAlpha: 0 });
        gsap.set(marks, { autoAlpha: 0 });
        gsap.set(marks[0], { autoAlpha: 1 });
        gsap.set(panels, { autoAlpha: 0, y: 28 });
        gsap.set(panels[0], { autoAlpha: 1, y: 0 });

        const counter = { year: START_YEAR };
        const writeYear = (): void => {
          if (yearEl) yearEl.textContent = String(Math.round(counter.year));
        };
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '[data-stage]',
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
          },
        });
        // the founding years are already on the log when the scene starts
        stageRings.forEach((el, j) => {
          if (j > FOUNDING_RINGS) return;
          gsap.set(el, { scale: 1, autoAlpha: 1 });
        });
        const grow = (from: number, to: number, start: number, len: number): void => {
          const n = to - from + 1;
          for (let j = from; j <= to; j += 1) {
            const el = stageRings[j];
            tl.fromTo(
              el,
              { scale: Number(el.dataset.ratio), autoAlpha: 0 },
              { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'power1.out' },
              start + ((j - from) / n) * (len - 0.5),
            );
          }
        };
        const roll = (year: number, start: number, len: number): void => {
          tl.to(counter, { year, duration: len, ease: 'power2.inOut', onUpdate: writeYear }, start);
        };
        const swap = (outIdx: number, inIdx: number, outAt: number, inAt: number): void => {
          tl.to(panels[outIdx], { autoAlpha: 0, y: -28, duration: 0.5, ease: 'power2.in' }, outAt);
          tl.to(panels[inIdx], { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, inAt);
        };

        // hold on 1955 (0 to 2), roll to 1996 (2 to 3.6), hold, roll to today (5 to 6.6), hold
        grow(FOUNDING_RINGS + 1, idx96, 2, 1.6);
        roll(GEN2_YEAR, 2, 1.4);
        swap(0, 1, 2, 3.2);
        tl.to(marks[1], { autoAlpha: 1, duration: 0.3 }, 3.3);

        grow(idx96 + 1, last, 5, 1.6);
        roll(END_YEAR, 5, 1.4);
        swap(1, 2, 5, 6.2);
        tl.to(stageDetail, { autoAlpha: 1, duration: 0.9 }, 6.1);
        tl.to(marks[2], { autoAlpha: 1, duration: 0.3 }, 6.5);

        tl.to({}, { duration: 0.01 }, 7.8);

        gsap.from(q('[data-stage-disc]'), {
          scale: 0.72,
          autoAlpha: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-stage]', start: 'top 75%' },
        });

        /* ---- Slices: rise and reveal ---- */
        gsap.from(q('[data-slice]'), {
          clipPath: 'inset(18% 0% 0% 0%)',
          autoAlpha: 0,
          y: 60,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: { trigger: '[data-slices]', start: 'top 80%' },
        });

        /* ---- Closing: magnetic button ---- */
        let removeMagnet = (): void => undefined;
        const magnet = root.querySelector<HTMLElement>('[data-magnet]');
        if (fine && magnet) {
          const mx = gsap.quickTo(magnet, 'x', { duration: 0.7, ease: 'power3.out' });
          const my = gsap.quickTo(magnet, 'y', { duration: 0.7, ease: 'power3.out' });
          const onMove = (e: PointerEvent): void => {
            const r = magnet.getBoundingClientRect();
            mx((e.clientX - (r.left + r.width / 2)) * 0.28);
            my((e.clientY - (r.top + r.height / 2)) * 0.28);
          };
          const onLeave = (): void => {
            mx(0);
            my(0);
          };
          magnet.addEventListener('pointermove', onMove);
          magnet.addEventListener('pointerleave', onLeave);
          removeMagnet = () => {
            magnet.removeEventListener('pointermove', onMove);
            magnet.removeEventListener('pointerleave', onLeave);
          };
        }

        const refresh = (): void => ScrollTrigger.refresh();
        const t = window.setTimeout(refresh, 400);
        window.addEventListener('load', refresh);

        return () => {
          window.clearTimeout(t);
          window.removeEventListener('load', refresh);
          removeMagnet();
          if (yearEl) yearEl.textContent = String(START_YEAR);
          ScrollTrigger.config({ ignoreMobileResize: false });
          root.classList.remove('hx-motion');
        };
      },
      root,
    );

    return () => mm.revert();
  }, []);

  return (
    <main ref={scopeRef} data-no-animate className="w-full max-w-full overflow-x-clip">
      {/* Hero: a sawn log, one ring per year (baked image, no continuous animation) */}
      <section
        data-hero
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#140e09] px-6 pb-[clamp(72px,12vh,128px)] pt-[clamp(120px,17vh,168px)] text-surface md:px-[80px]"
      >
        <div data-hero-disc className="absolute inset-0 flex items-center justify-center">
          <img
            src={woodDiscUrl}
            alt=""
            width={1800}
            height={1800}
            decoding="async"
            fetchPriority="high"
            className="h-auto w-[max(125vw,125vh)] max-w-none shrink-0 select-none"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(52%_46%_at_50%_50%,rgba(20,14,9,0.82)_0%,rgba(20,14,9,0.45)_62%,rgba(20,14,9,0.12)_100%)]" />
        <div data-hero-copy className="relative z-10 mx-auto w-full max-w-6xl text-center">
          <h1 className="font-display-hero text-display-hero serif-text text-surface">
            <MaskedWords text="Architectural Precision." />
          </h1>
          <p
            data-hero-fade
            className="font-body-lg mx-auto mt-stack-lg max-w-2xl text-balance text-surface/85"
          >
            Seven decades of architectural woodwork, grown ring by ring across three generations of
            one family.
          </p>
          <div
            data-hero-fade
            className="mt-stack-lg flex flex-col items-center justify-center gap-gutter sm:flex-row"
          >
            <Link
              to={ROUTES.portfolio}
              className="inline-flex items-center gap-4 bg-surface px-10 py-5 font-technical-label uppercase tracking-widest text-on-background transition-colors duration-500 hover:bg-brand"
            >
              Explore Archive
              <MaterialIcon name="arrow_forward" className="text-sm" />
            </Link>
            <Link
              to={ROUTES.inquiry}
              className="inline-flex items-center border border-surface/60 bg-on-background/30 px-10 py-5 font-technical-label uppercase tracking-widest text-surface backdrop-blur-sm transition-colors duration-500 hover:bg-surface hover:text-on-background"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      {/* Statement: words surface as you read */}
      <section data-statement className="bg-surface px-6 py-[clamp(96px,16vw,192px)] md:px-[80px]">
        <div className="mx-auto max-w-5xl">
          <p className="font-headline-md text-headline-md serif-text leading-[1.3] text-on-background md:text-[clamp(28px,3.4vw,46px)] md:leading-[1.25]">
            {STATEMENT.split(' ').map((word, i) => (
              <span key={`${word}-${i}`} data-scrub-word>
                {word}{' '}
              </span>
            ))}
          </p>
          <p
            data-statement-body
            className="font-body-md mt-stack-lg max-w-3xl text-on-surface-variant/90"
          >
            Our work balances the past and the future, merging classical woodworking techniques with
            advanced manufacturing technology to create high-end interiors that are elegant, highly
            functional, and attuned to modern design. Built on a strict attention to detail and only
            the finest materials, we have partnered with renowned brands and interior architecture
            studios to bring their most important projects to life.
          </p>
        </div>
      </section>

      {/* Pinned stage: the log grows while the counter rolls, then holds for each generation */}
      <section
        data-stage
        className="relative flex min-h-[100svh] flex-col items-center justify-center gap-6 overflow-hidden bg-[#1c1b1b] px-6 pb-8 pt-[88px] text-surface md:flex-row md:gap-16 md:px-[80px] md:pt-[112px]"
      >
        <div
          data-stage-disc
          className="relative aspect-square w-full max-w-[min(80vw,32svh)] shrink-0 md:max-w-[min(46vw,72svh)]"
        >
          <WoodDisc
            count={RING_COUNT}
            seed={7}
            ringAttr="stage-ring"
            className="h-full w-full"
            vignette={false}
            marks={[
              { ring: 0, label: String(START_YEAR) },
              { ring: GEN2_YEAR - START_YEAR, label: String(GEN2_YEAR) },
              { ring: RING_COUNT - 1, label: String(END_YEAR) },
            ]}
          />
          <div className="pointer-events-none absolute bottom-[4%] left-[3%] -rotate-3 bg-[#f3ead8] px-4 py-2 shadow-[0_10px_28px_rgba(0,0,0,0.55)]">
            <span
              data-year
              className="font-headline-lg serif-text block text-[clamp(26px,4.2vw,50px)] leading-none tracking-tight text-on-background"
            >
              {START_YEAR}
            </span>
          </div>
        </div>
        <div className="w-full max-w-xl md:flex-1">
          <h2 className="font-headline-md text-headline-md serif-text text-surface">
            Three generations of craft
          </h2>
          <p className="stage-intro font-body-md mt-stack-sm text-surface/70">
            Seven decades, three generations, one uncompromising standard of craft.
          </p>
          <div className="gen-list relative mt-stack-lg space-y-stack-lg">
            {GENERATIONS.map((g) => (
              <div key={g.numeral} data-gen className="gen-panel">
                <span className="font-headline-md text-headline-md serif-text block text-secondary-fixed-dim">
                  {g.numeral}
                </span>
                <span className="font-technical-label mt-2 block uppercase tracking-widest text-surface">
                  {g.title}
                </span>
                <p className="font-body-md mt-4 max-w-lg text-surface/75">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slices: hover to open */}
      <section className="bg-surface px-6 py-[clamp(80px,14vw,176px)] md:px-[80px]">
        <div
          data-slices
          className="mx-auto flex h-[clamp(520px,70svh,640px)] max-w-6xl flex-col gap-3 md:h-[clamp(380px,62svh,560px)] md:flex-row"
        >
          <article
            data-slice
            className="group relative flex-1 overflow-hidden bg-surface-container-low md:transition-[flex] md:duration-700 md:ease-out md:hover:flex-[2.4]"
          >
            <img
              src={IMG_ROOM}
              alt="Interior finished by D Woodline"
              className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-[1400ms] ease-out group-hover:scale-105 md:group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-background/70 to-transparent" />
            <span className="font-technical-label absolute bottom-0 left-0 p-stack-md uppercase tracking-widest text-white">
              Established 1955
            </span>
          </article>
          <article
            data-slice
            className="group relative flex-1 overflow-hidden bg-surface-container-highest md:transition-[flex] md:duration-700 md:ease-out md:hover:flex-[2.4]"
          >
            <img
              src={IMG_WOOD}
              alt="Close detail of finished timber"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-background/60 to-transparent" />
            <span className="font-technical-label absolute bottom-0 left-0 p-stack-md uppercase tracking-widest text-white">
              Only the finest materials
            </span>
          </article>
          <article
            data-slice
            className="group relative flex-1 overflow-hidden bg-[#140e09] text-surface md:transition-[flex] md:duration-700 md:ease-out md:hover:flex-[2.4]"
          >
            <WoodDisc
              count={40}
              seed={31}
              ringAttr="slice-ring"
              className="absolute left-1/2 top-1/2 h-auto w-[170%] max-w-none -translate-x-1/2 -translate-y-[46%] transition-transform duration-[1800ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-stack-md">
              <span className="font-headline-lg text-headline-lg serif-text text-secondary-fixed-dim">
                70+
              </span>
              <span className="font-technical-label mt-2 uppercase tracking-widest text-surface">
                Years of Mastery
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-surface px-6 pb-[clamp(96px,14vw,176px)] text-center md:px-[80px]">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display-hero text-display-hero serif-text text-balance text-on-background">
            Let us build the next chapter with you.
          </h2>
          <div className="mt-stack-lg flex justify-center">
            <div data-magnet className="inline-block p-3 md:p-6">
              <Link
                to={ROUTES.inquiry}
                className="group inline-flex items-center gap-4 whitespace-nowrap bg-on-background px-8 py-6 font-technical-label uppercase tracking-widest text-background transition-colors duration-500 hover:bg-brand hover:text-on-background md:px-12"
              >
                Start a Project
                <MaterialIcon
                  name="arrow_forward"
                  className="text-sm transition-transform duration-300 group-hover:translate-x-2"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
