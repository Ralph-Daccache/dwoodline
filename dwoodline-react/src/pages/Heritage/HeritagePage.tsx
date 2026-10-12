import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROUTES } from '@/config/routes';
import { MaterialIcon } from '@/components/MaterialIcon/MaterialIcon';
import { useLuxeScroll } from '@/hooks/useLuxeScroll';
import { GrainRings } from './GrainRings';

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

const START_YEAR = 1955;
/* The counter stops on one year per generation. The Generation II year is a
   PLACEHOLDER until the family confirms it; Generation III is always the current year. */
const GEN2_YEAR = 1985;

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

  useEffect(() => {
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

        /* ---- Hero: load-in, breathing rings, depth, zoom-through on scroll ---- */
        const heroRings = q('[data-hero-ring]');
        const heroGroup = q('[data-hero] [data-ring-group]');
        gsap.set(heroRings, { svgOrigin: '500 500' });
        gsap.from(q('[data-hero] [data-word]'), {
          yPercent: 115,
          duration: 1.3,
          ease: 'power4.out',
          stagger: 0.09,
          delay: 0.15,
        });
        gsap.from(q('[data-hero-fade]'), {
          autoAlpha: 0,
          y: 24,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.7,
        });
        gsap.from(heroRings, {
          scale: 0.2,
          autoAlpha: 0,
          duration: 2.4,
          ease: 'power3.out',
          stagger: { each: 0.05, from: 'start' },
        });
        heroRings.forEach((ring, i) => {
          gsap.to(ring, {
            rotation: (i % 2 === 0 ? 1 : -1) * (2.5 + i * 0.35),
            duration: 11 + (i % 5) * 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            svgOrigin: '500 500',
          });
        });
        q('[data-slab]').forEach((slab, i) => {
          gsap.to(slab, {
            y: i % 2 === 0 ? -18 : 16,
            rotation: `+=${i % 2 === 0 ? 2.5 : -2}`,
            duration: 5 + i * 1.3,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        });
        gsap.to(heroGroup, {
          scale: 1.9,
          opacity: 0.25,
          svgOrigin: '500 500',
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-hero]',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
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

        let removePointer = (): void => undefined;
        if (fine) {
          const hero = root.querySelector<HTMLElement>('[data-hero]');
          const slabs = q('[data-depth]') as HTMLElement[];
          const setters = slabs.map((el) => ({
            x: gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3.out' }),
            y: gsap.quickTo(el, 'yPercent', { duration: 1.1, ease: 'power3.out' }),
            depth: Number(el.dataset.depth ?? 0),
          }));
          const ringX = gsap.quickTo(heroGroup[0], 'x', { duration: 1.6, ease: 'power3.out' });
          const ringY = gsap.quickTo(heroGroup[0], 'y', { duration: 1.6, ease: 'power3.out' });
          const onMove = (e: PointerEvent): void => {
            const nx = (e.clientX / window.innerWidth - 0.5) * 2;
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;
            setters.forEach((s) => {
              s.x(nx * s.depth);
              s.y(ny * s.depth * 0.25);
            });
            ringX(nx * -26);
            ringY(ny * -26);
          };
          hero?.addEventListener('pointermove', onMove);
          removePointer = () => hero?.removeEventListener('pointermove', onMove);
        }

        /* ---- Statement: words scrub from faint to solid ---- */
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

        /* ---- Pinned stage: rings grow outward, years count up, generations swap ---- */
        const stageRings = q('[data-stage-ring]');
        const panels = q('[data-gen]');
        const yearEl = root.querySelector<HTMLElement>('[data-year]');
        const stageGroup = q('[data-stage] [data-ring-group]');
        gsap.set(stageRings, { svgOrigin: '500 500', scale: 0.35, autoAlpha: 0 });
        gsap.set(panels, { autoAlpha: 0, y: 28 });
        gsap.set(panels[0], { autoAlpha: 1, y: 0 });

        const step = 0.45;
        const total = (stageRings.length - 1) * step + 1;
        const endYear = new Date().getFullYear();
        const counter = { year: START_YEAR };
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '[data-stage]',
            start: 'top top',
            end: '+=280%',
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
          },
        });
        stageRings.forEach((ring, i) => {
          tl.to(ring, { scale: 1, autoAlpha: 1, duration: 1, ease: 'power2.out' }, i * step);
        });
        tl.to(stageGroup, { rotation: 38, svgOrigin: '500 500', duration: total }, 0);
        const writeYear = (): void => {
          if (yearEl) yearEl.textContent = String(Math.round(counter.year));
        };
        const stops = [GEN2_YEAR, endYear];
        [1, 2].forEach((idx) => {
          const at = (total / 3) * idx;
          tl.to(
            panels[idx - 1],
            { autoAlpha: 0, y: -28, duration: 0.5, ease: 'power2.in' },
            at - 0.3,
          );
          tl.to(panels[idx], { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, at);
          // roll up to this generation's year, then hold it until the next one
          tl.to(
            counter,
            { year: stops[idx - 1], duration: 0.9, ease: 'power2.inOut', onUpdate: writeYear },
            at - 0.4,
          );
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
          removePointer();
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
      {/* Hero: a field of living growth rings with drifting timber slabs */}
      <section
        data-hero
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-surface px-6 pb-[clamp(72px,12vh,128px)] pt-[clamp(120px,17vh,168px)] md:px-[80px]"
      >
        <GrainRings
          count={24}
          seed={1955}
          ringAttr="hero-ring"
          className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 text-secondary/80 md:h-[125%] md:w-[125%]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(46%_38%_at_50%_50%,rgba(252,249,248,0.92)_0%,rgba(252,249,248,0.55)_60%,rgba(252,249,248,0)_100%)]" />

        <div
          data-depth="46"
          className="absolute right-[-4%] top-[10%] w-[26vw] max-w-[420px] md:right-[2%] md:top-[20%] md:w-[16vw]"
        >
          <div
            data-slab
            className="aspect-[3/4] rotate-[7deg] overflow-hidden border border-on-background/10 shadow-[0_40px_80px_-30px_rgba(112,91,63,0.55)]"
          >
            <img
              src={IMG_WOOD}
              alt=""
              className="h-full w-full object-cover opacity-90 contrast-110"
            />
          </div>
        </div>
        <div
          data-depth="-34"
          className="absolute bottom-[2%] left-[-6%] w-[28vw] max-w-[460px] md:bottom-[8%] md:left-[2%] md:w-[15vw]"
        >
          <div
            data-slab
            className="aspect-[4/5] -rotate-[8deg] overflow-hidden border border-on-background/10 shadow-[0_40px_80px_-30px_rgba(28,27,27,0.5)]"
          >
            <img
              src={IMG_ROOM}
              alt=""
              className="h-full w-full object-cover opacity-80 grayscale"
            />
          </div>
        </div>

        <div data-hero-copy className="relative z-10 mx-auto w-full max-w-6xl text-center">
          <h1 className="font-display-hero text-display-hero serif-text text-on-background">
            <MaskedWords text="Architectural Precision." />
          </h1>
          <p
            data-hero-fade
            className="font-body-lg mx-auto mt-stack-lg max-w-2xl text-balance text-on-surface-variant"
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
              className="inline-flex items-center gap-4 bg-on-background px-10 py-5 font-technical-label uppercase tracking-widest text-background transition-colors duration-500 hover:bg-secondary"
            >
              Explore Archive
              <MaterialIcon name="arrow_forward" className="text-sm" />
            </Link>
            <Link
              to={ROUTES.inquiry}
              className="inline-flex items-center border border-on-background/40 bg-surface/60 px-10 py-5 font-technical-label uppercase tracking-widest text-on-background backdrop-blur-sm transition-colors duration-500 hover:bg-on-background hover:text-background"
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

      {/* Pinned stage: the rings grow, the years climb, the generations pass */}
      <section
        data-stage
        className="relative flex min-h-[100svh] flex-col items-center justify-center gap-6 overflow-hidden bg-[#1c1b1b] px-6 pb-8 pt-[88px] text-surface md:flex-row md:gap-16 md:px-[80px] md:pt-[112px]"
      >
        <div className="relative aspect-square w-full max-w-[min(80vw,32svh)] shrink-0 text-secondary-fixed-dim md:max-w-[min(46vw,72svh)]">
          <GrainRings
            count={15}
            seed={7}
            ringAttr="stage-ring"
            r0={30}
            step={30}
            className="h-full w-full"
          />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span
              data-year
              className="font-headline-lg serif-text text-[clamp(40px,7vw,84px)] leading-none tracking-tight text-surface"
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
            className="group relative flex-1 overflow-hidden bg-[#1c1b1b] text-surface md:transition-[flex] md:duration-700 md:ease-out md:hover:flex-[2.4]"
          >
            <GrainRings
              count={12}
              seed={31}
              ringAttr="slice-ring"
              r0={20}
              step={34}
              className="absolute inset-0 h-full w-full scale-125 text-secondary-fixed-dim/60 transition-transform duration-[1800ms] ease-out group-hover:scale-150"
            />
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
                className="group inline-flex items-center gap-4 whitespace-nowrap bg-on-background px-8 py-6 md:px-12 font-technical-label uppercase tracking-widest text-background transition-colors duration-500 hover:bg-secondary"
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
