import { useId, useMemo } from 'react';

/** Small seeded PRNG so every render of a ring field is identical. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Organic, slightly irregular closed rings, like a sawn tree cross-section. */
function buildRings(count: number, seed: number, r0: number, step: number): string[] {
  const rnd = mulberry32(seed);
  const k1 = 2 + Math.floor(rnd() * 2);
  const k2 = 4 + Math.floor(rnd() * 3);
  const p1 = rnd() * Math.PI * 2;
  const p2 = rnd() * Math.PI * 2;
  const points = 96;
  return Array.from({ length: count }, (_, i) => {
    const r = r0 + i * step;
    const a1 = 2 + i * 0.55;
    const a2 = 1 + i * 0.25;
    const q1 = p1 + i * 0.18;
    const q2 = p2 - i * 0.11;
    let d = '';
    for (let s = 0; s <= points; s += 1) {
      const t = (s / points) * Math.PI * 2;
      const rr = r + a1 * Math.sin(k1 * t + q1) + a2 * Math.sin(k2 * t + q2);
      const x = (500 + rr * Math.cos(t)).toFixed(1);
      const y = (500 + rr * Math.sin(t)).toFixed(1);
      d += `${s === 0 ? 'M' : 'L'}${x} ${y}`;
    }
    return `${d}Z`;
  });
}

interface GrainRingsProps {
  count: number;
  seed: number;
  /** Data attribute value used by the page's GSAP scenes to find the rings. */
  ringAttr: string;
  className?: string;
  r0?: number;
  step?: number;
}

/** Decorative concentric-ring field (SVG). Colour comes from `currentColor`. */
export function GrainRings({
  count,
  seed,
  ringAttr,
  className,
  r0 = 24,
  step = 26,
}: GrainRingsProps) {
  const paths = useMemo(() => buildRings(count, seed, r0, step), [count, seed, r0, step]);
  const gradId = `grain-core-${useId().replace(/:/g, '')}`;
  const attrs = { [`data-${ringAttr}`]: '' };
  return (
    <svg
      viewBox="0 0 1000 1000"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="500" cy="500" r={r0 + step * 3} fill={`url(#${gradId})`} />
      <g data-ring-group>
        {paths.map((d, i) => (
          <path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth={i % 4 === 0 ? 2.4 : 1.1}
            strokeOpacity={i % 4 === 0 ? 0.9 : 0.55}
            vectorEffect="non-scaling-stroke"
            {...attrs}
          />
        ))}
      </g>
    </svg>
  );
}
