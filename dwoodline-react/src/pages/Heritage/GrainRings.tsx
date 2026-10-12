import { useId, useMemo } from 'react';

/** Small seeded PRNG so every render of a disc is identical. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type RGB = [number, number, number];
const LATEWOOD: RGB = [146, 98, 54];
const EARLYWOOD: RGB = [226, 190, 138];

function mix(a: RGB, b: RGB, t: number): string {
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));

interface RingGeo {
  d: string;
  fill: string;
  stroke: string;
  /** previous ring radius / this ring radius: the scale a ring starts from to "grow out" of its neighbour */
  ratio: number;
}

interface DiscGeo {
  rings: RingGeo[];
  /** x position of each ring's edge along the 3 o'clock axis (exact, for ruler ticks) */
  edgeX: number[];
  outer: string;
  bark: string;
  rays: string[];
  cracks: string[];
}

const CX = 500;
const CY = 500;
const POINTS = 150;

/**
 * Builds a sawn tree cross-section: one filled ring per growth year, irregular
 * ring widths (wide young rings, narrow drought years), a slightly eccentric
 * centre, jagged bark, medullary rays and radial checks (cracks).
 */
function buildDisc(count: number, seed: number, rMax: number): DiscGeo {
  const rnd = mulberry32(seed);
  const rPith = 14;

  // growth increments -> cumulative radii
  const phase = rnd() * Math.PI * 2;
  const raw = Array.from({ length: count }, (_, k) => {
    const young = 1.3 - 0.55 * (k / count);
    const season = 0.75 + 0.45 * Math.sin(k * 0.41 + phase) + 0.5 * rnd();
    return Math.max(0.25, young * season);
  });
  const sum = raw.reduce((a, b) => a + b, 0);
  const radii: number[] = [];
  let acc = rPith;
  raw.forEach((w) => {
    acc += (w / sum) * (rMax - rPith);
    radii.push(acc);
  });
  const wMin = Math.min(...raw);
  const wMax = Math.max(...raw);

  // organic outline parameters, shared so neighbouring rings stay similar
  const k1 = 2 + Math.floor(rnd() * 2);
  const k2 = 4 + Math.floor(rnd() * 3);
  const k3 = 7 + Math.floor(rnd() * 4);
  const p1 = rnd() * Math.PI * 2;
  const p2 = rnd() * Math.PI * 2;
  const p3 = rnd() * Math.PI * 2;
  const ex = (rnd() - 0.5) * 34;
  const ey = (rnd() - 0.5) * 24;

  const outline = (k: number, r: number, jag = 0): string => {
    const cx = CX + ex * (k / count);
    const cy = CY + ey * (k / count);
    let d = '';
    for (let s = 0; s <= POINTS; s += 1) {
      const t = (s / POINTS) * Math.PI * 2;
      const wob =
        0.025 * r * Math.sin(k1 * t + p1 + k * 0.05) +
        0.012 * r * Math.sin(k2 * t + p2 - k * 0.04) +
        0.006 * r * Math.sin(k3 * t + p3 + k * 0.09);
      const rough = jag && s !== POINTS ? (rnd() - 0.5) * jag : 0;
      const rr = r + wob + rough;
      const x = (cx + rr * Math.cos(t)).toFixed(1);
      const y = (cy + rr * Math.sin(t)).toFixed(1);
      d += `${s === 0 ? 'M' : 'L'}${x} ${y}`;
    }
    return `${d}Z`;
  };

  const rings: RingGeo[] = radii.map((r, k) => {
    const wn = (raw[k] - wMin) / (wMax - wMin || 1);
    const t = clamp01(0.22 + 0.5 * wn + (rnd() - 0.5) * 0.45);
    const dark = 0.5 + 0.35 * (1 - wn);
    return {
      d: outline(k, r),
      fill: mix(LATEWOOD, EARLYWOOD, t),
      stroke: `rgba(66,38,16,${dark.toFixed(2)})`,
      ratio: k === 0 ? 0 : radii[k - 1] / r,
    };
  });

  // exact ring-edge x at angle 0, including eccentricity and wobble
  const edgeX = radii.map((r, k) => {
    const wob =
      0.025 * r * Math.sin(p1 + k * 0.05) +
      0.012 * r * Math.sin(p2 - k * 0.04) +
      0.006 * r * Math.sin(p3 + k * 0.09);
    return CX + ex * (k / count) + r + wob;
  });

  const bark = outline(count - 1, rMax + 15, 9);
  const outer = outline(count - 1, rMax + 12);

  // medullary rays
  const rays = Array.from({ length: 46 }, () => {
    const a = rnd() * Math.PI * 2;
    const r0 = 26 + rnd() * 60;
    const r1 = rMax * (0.55 + rnd() * 0.42);
    return `M${(CX + r0 * Math.cos(a)).toFixed(1)} ${(CY + r0 * Math.sin(a)).toFixed(1)}L${(
      CX +
      r1 * Math.cos(a)
    ).toFixed(1)} ${(CY + r1 * Math.sin(a)).toFixed(1)}`;
  });

  // radial checks: jagged wedges that open at the bark and taper toward the pith
  const cracks = Array.from({ length: 3 }, () => {
    const a = rnd() * Math.PI * 2;
    const tip = 0.3 + rnd() * 0.3;
    const segs = 7;
    const left: string[] = [];
    const right: string[] = [];
    for (let s = 0; s <= segs; s += 1) {
      const t = s / segs;
      const rr = (rMax + 10) * (1 - t * (1 - tip));
      const half = 9 * (1 - t) + 0.4;
      const j = (rnd() - 0.5) * 9 * t;
      const nx = -Math.sin(a);
      const ny = Math.cos(a);
      const bx = CX + rr * Math.cos(a) + nx * j;
      const by = CY + rr * Math.sin(a) + ny * j;
      left.push(`${(bx + nx * half).toFixed(1)} ${(by + ny * half).toFixed(1)}`);
      right.unshift(`${(bx - nx * half).toFixed(1)} ${(by - ny * half).toFixed(1)}`);
    }
    return `M${left.join('L')}L${right.join('L')}Z`;
  });

  return { rings, edgeX, outer, bark, rays, cracks };
}

export interface DiscMark {
  /** Index of the ring (0 = pith) the ruler tick sits on. */
  ring: number;
  label: string;
}

interface WoodDiscProps {
  /** Number of growth rings (one per year in the stage scene). */
  count: number;
  seed: number;
  /** Data attribute used by the page's GSAP scenes to find each ring. */
  ringAttr: string;
  className?: string;
  rMax?: number;
  /** Edge-darkening vignette over the cut face (off while the disc is still growing). */
  vignette?: boolean;
  /** Measuring ruler ticks along the rings (stage only). */
  marks?: DiscMark[];
}

/**
 * Decorative sawn log cross-section (SVG). Layers, bottom to top: bark, one
 * filled band per growth year, pith, rays and checks, fine grain and an optional
 * vignette. Everything is plain SVG so it scales crisply at any size.
 */
export function WoodDisc({
  count,
  seed,
  ringAttr,
  className,
  rMax = 430,
  vignette = true,
  marks,
}: WoodDiscProps) {
  const geo = useMemo(() => buildDisc(count, seed, rMax), [count, seed, rMax]);
  const uid = useId().replace(/:/g, '');
  const clipId = `disc-clip-${uid}`;
  const grainId = `disc-grain-${uid}`;
  const vigId = `disc-vig-${uid}`;
  const attrs = { [`data-${ringAttr}`]: '' };

  return (
    <svg
      viewBox="0 0 1000 1000"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={geo.outer} />
        </clipPath>
        <filter
          id={grainId}
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={seed} />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.16  0 0 0 0 0.08  0 0 0 0 0.02  1.15 0 0 0 -0.38"
          />
        </filter>
        <radialGradient id={vigId} cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.42" />
        </radialGradient>
      </defs>

      <g data-ring-group>
        <path data-bark d={geo.bark} fill="#2a190d" stroke="#120804" strokeWidth="1.5" />
        {geo.rings
          .map((ring, i) => (
            <path
              key={i}
              d={ring.d}
              fill={ring.fill}
              stroke={ring.stroke}
              strokeWidth={1.1}
              vectorEffect="non-scaling-stroke"
              data-ratio={ring.ratio.toFixed(4)}
              {...attrs}
            />
          ))
          .reverse()}
        <ellipse cx={CX} cy={CY} rx="11" ry="9" fill="#3b2110" />
        <g data-disc-detail>
          {geo.rays.map((d) => (
            <path key={d} d={d} stroke="rgba(255,238,205,0.1)" strokeWidth="0.9" />
          ))}
          {geo.cracks.map((d) => (
            <path
              key={d}
              d={d}
              fill="#190c04"
              fillOpacity="0.88"
              stroke="#0b0502"
              strokeWidth="1"
            />
          ))}
        </g>
      </g>

      <g clipPath={`url(#${clipId})`}>
        <rect
          width="1000"
          height="1000"
          filter={`url(#${grainId})`}
          style={{ mixBlendMode: 'multiply' }}
          opacity="0.55"
        />
        {vignette && <rect width="1000" height="1000" fill={`url(#${vigId})`} />}
      </g>

      {marks && (
        <g data-ruler>
          <line
            x1={CX}
            y1={CY}
            x2={CX + rMax + 14}
            y2={CY}
            stroke="#f4ead6"
            strokeOpacity="0.55"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          {marks.map((m) => {
            const x = geo.edgeX[Math.min(m.ring, geo.edgeX.length - 1)];
            return (
              <g key={m.label} data-mark>
                <line
                  x1={x}
                  y1={CY - 22}
                  x2={x}
                  y2={CY + 22}
                  stroke="#f4ead6"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <text
                  x={x}
                  y={CY + 58}
                  textAnchor="middle"
                  fontSize="30"
                  fill="#f4ead6"
                  stroke="#1c1b1b"
                  strokeWidth="6"
                  paintOrder="stroke"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="1.5"
                >
                  {m.label}
                </text>
              </g>
            );
          })}
        </g>
      )}
    </svg>
  );
}
