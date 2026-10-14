import { useRef, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';

/* ------------------------------------------------------------------------- */
/* Chapter 1: drawn woodworking details for the four circles                  */
/* ------------------------------------------------------------------------- */

export type DetailKind = 'endgrain' | 'dovetail' | 'profile' | 'tenon';

const TAN = '#d9bf9b';
const TAN_SOFT = 'rgba(217,191,155,0.45)';

/** Small technical drawing shown inside a detail circle. Plain SVG, no images. */
export function DetailDrawing({ kind, label }: { kind: DetailKind; label: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      role="img"
      aria-label={label}
      fill="none"
      stroke={TAN}
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <rect width="100" height="100" fill="#2b1d12" stroke="none" />
      {kind === 'endgrain' && (
        <g>
          {[8, 15, 22, 29, 36, 43].map((r, i) => (
            <ellipse
              key={r}
              cx={50 + (i % 2) * 1.5}
              cy={50 - (i % 3) * 1}
              rx={r}
              ry={r * (0.92 + (i % 2) * 0.05)}
              strokeOpacity={i % 2 === 0 ? 1 : 0.55}
            />
          ))}
          <circle cx="50" cy="50" r="2" fill={TAN} stroke="none" />
          <path d="M50 50 L92 44" strokeOpacity="0.5" />
        </g>
      )}
      {kind === 'dovetail' && (
        <g>
          <path d="M10 28 H38 L32 72 H10 Z" />
          <path d="M38 28 L46 28 L52 72 L32 72 Z" strokeOpacity="0.55" />
          <path d="M90 28 H62 L68 72 H90 Z" />
          <path d="M62 28 L54 28 L48 72 L68 72 Z" strokeOpacity="0.55" />
          <path d="M10 82 H90" strokeOpacity="0.45" strokeDasharray="3 3" />
        </g>
      )}
      {kind === 'profile' && (
        <g>
          <path d="M14 78 H86 V64 Q86 56 78 56 H62 Q52 56 52 46 V40 Q52 30 42 30 H14 Z" />
          <path d="M14 22 H46" strokeOpacity="0.5" />
          <path d="M14 18 V26 M46 18 V26" strokeOpacity="0.5" />
          <path d="M92 56 V78" strokeOpacity="0.5" />
          <path d="M89 56 H95 M89 78 H95" strokeOpacity="0.5" />
        </g>
      )}
      {kind === 'tenon' && (
        <g>
          <path d="M10 36 H46 V44 H62 V56 H46 V64 H10 Z" />
          <path d="M62 30 H92 V70 H62" />
          <path d="M62 44 H74 V56 H62" strokeOpacity="0.55" strokeDasharray="2.5 2.5" />
          <path d="M22 50 H90" stroke={TAN_SOFT} strokeDasharray="4 3" />
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------------- */
/* Chapter 2: photo book-match viewer                                         */
/* ------------------------------------------------------------------------- */

const SPECIES = [
  {
    id: 'walnut',
    label: 'Walnut',
    src: 'https://images.unsplash.com/photo-1736506159893-22cca29b8018?auto=format&fit=crop&w=1000&q=75',
  },
  {
    id: 'oak',
    label: 'Oak',
    src: 'https://images.unsplash.com/photo-1611072337226-1140ab367200?auto=format&fit=crop&w=1000&q=75',
  },
] as const;

type SpeciesId = (typeof SPECIES)[number]['id'];

/**
 * One veneer photo is cropped as the left leaf and mirrored as the right leaf,
 * which is exactly what a book-match is. Drag the viewer or use the slider to
 * open the book; pick a species to change the wood.
 */
export function BookMatchViewer() {
  const [species, setSpecies] = useState<SpeciesId>('walnut');
  const [open, setOpen] = useState(0);
  const drag = useRef<{ x: number; start: number } | null>(null);
  const label = SPECIES.find((s) => s.id === species)?.label ?? '';

  const onDown = (e: PointerEvent<HTMLDivElement>): void => {
    drag.current = { x: e.clientX, start: open };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>): void => {
    if (!drag.current) return;
    const w = e.currentTarget.clientWidth || 1;
    const next = drag.current.start + ((e.clientX - drag.current.x) / w) * 200;
    setOpen(Math.max(0, Math.min(100, Math.round(next))));
  };
  const onUp = (): void => {
    drag.current = null;
  };

  const shift = open * 0.16; // percent of one leaf's width

  return (
    <div className="w-full">
      <div
        className="relative h-[clamp(280px,48vh,460px)] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-sm bg-[#1c1b1b] shadow-xl"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {(['left', 'right'] as const).map((side) => (
          <div
            key={side}
            className={`absolute top-0 h-full w-1/2 overflow-hidden transition-transform duration-300 ease-out ${
              side === 'left' ? 'left-0' : 'right-0'
            }`}
            style={{ transform: `translateX(${side === 'left' ? -shift : shift}%)` }}
          >
            {SPECIES.map((s) => (
              <img
                key={s.id}
                src={s.src}
                alt={side === 'left' && s.id === species ? `${s.label} veneer leaf` : ''}
                aria-hidden={side === 'right' || s.id !== species ? true : undefined}
                draggable={false}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  side === 'right' ? '-scale-x-100' : ''
                } ${s.id === species ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>
        ))}
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-black/25"
          style={{ opacity: open < 4 ? 1 : 0 }}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex gap-2" role="group" aria-label="Wood species">
          {SPECIES.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={s.id === species}
              onClick={() => setSpecies(s.id)}
              className={`px-4 py-2 font-technical-label text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                s.id === species
                  ? 'bg-on-background text-background'
                  : 'border border-on-background/30 text-on-background hover:bg-brand'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <label className="flex min-w-[180px] flex-1 items-center gap-3 text-on-surface-variant">
          <span className="font-technical-label text-[10px] uppercase tracking-[0.2em]">
            Closed
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={open}
            onChange={(e) => setOpen(Number(e.target.value))}
            aria-label="Open the book-match"
            className="h-1 flex-1 cursor-pointer accent-[#705b3f]"
          />
          <span className="font-technical-label text-[10px] uppercase tracking-[0.2em]">Open</span>
        </label>
      </div>
      <p className="font-body-md mt-3 text-caption text-on-surface-variant">
        Book-matched {label.toLowerCase()}: the right leaf is the left leaf, mirrored along the
        seam.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* Chapter 3: exploded concealed-hinge diagram                                */
/* ------------------------------------------------------------------------- */

/**
 * Parts the feature cards can highlight:
 *  members: the door edge and the frame, each with a milled recess (CNC accuracy)
 *  feed:    low-voltage feed routed through the hinge (integrated lighting)
 *  plates:  door part and frame part with their fixing screws (installation)
 *  body:    the closed hinge body, a linkage on slide bearings (longevity)
 */
export type HingePart = 'members' | 'plates' | 'body' | 'feed';

interface ExplodedHingeProps {
  /** Parts to emphasise; everything else dims. Empty means no emphasis. */
  active: HingePart[];
  assembled: boolean;
}

/* ---- axonometric helpers -------------------------------------------------
   Viewer sits at +x, +y, +z. Screen x = (x - y) cos30, screen y = (x + y) sin30 - z.
   The door and frame are cut at the hinge mid-plane (y = 30) so both milled
   recesses show, and the parts separate along x. */
const K = 0.866 * 0.9;
const M = 0.5 * 0.9;
const ZS = 0.9;
const OX = 210;
const OY = 250;

type V3 = [number, number, number];

const pt = ([x, y, z]: V3): string =>
  `${((x - y) * K + OX).toFixed(1)},${((x + y) * M - z * ZS + OY).toFixed(1)}`;
const poly = (pts: V3[]): string => pts.map(pt).join(' ');
const sx = (x: number, y: number, _z: number): number => (x - y) * K + OX;
const sy = (x: number, y: number, z: number): number => (x + y) * M - z * ZS + OY;

const LINE = '#c4a98a';
const EDGE = 'rgba(196,169,138,0.85)';
const WOOD_TOP = '#403f3d';
const WOOD_END = '#2f2e2d';
const WOOD_CUT = '#262524';
const VOID_FLOOR = '#1a1918';
const VOID_WALL = '#121110';
const VOID_BACK = '#0e0d0c';
const METAL_TOP = '#6a6762';
const METAL_END = '#4a4743';
const METAL_FRONT = '#383633';
const FILL = '#2a2928';
const FILL_HI = '#3b3a39';
const VOID = '#141312';

interface BoxProps {
  x: [number, number];
  y: [number, number];
  z: [number, number];
  top: string;
  end: string;
  front: string;
}

/** Axis-aligned box drawn with its three visible faces (top, +x end, +y front). */
function Box({ x, y, z, top, end, front }: BoxProps) {
  const [x0, x1] = x;
  const [y0, y1] = y;
  const [z0, z1] = z;
  return (
    <g stroke={EDGE} strokeWidth="0.9" strokeLinejoin="round">
      <polygon
        points={poly([
          [x1, y0, z0],
          [x1, y1, z0],
          [x1, y1, z1],
          [x1, y0, z1],
        ])}
        fill={end}
      />
      <polygon
        points={poly([
          [x0, y1, z0],
          [x1, y1, z0],
          [x1, y1, z1],
          [x0, y1, z1],
        ])}
        fill={front}
      />
      <polygon
        points={poly([
          [x0, y0, z1],
          [x1, y0, z1],
          [x1, y1, z1],
          [x0, y1, z1],
        ])}
        fill={top}
      />
    </g>
  );
}

/** Ellipse for a circle of radius r lying on a horizontal plane. */
function TopCircle({
  x,
  y,
  z,
  r,
  fill,
}: {
  x: number;
  y: number;
  z: number;
  r: number;
  fill: string;
}) {
  return (
    <ellipse
      cx={sx(x, y, z)}
      cy={sy(x, y, z)}
      rx={r * 1.1}
      ry={r * 0.64}
      fill={fill}
      stroke={EDGE}
      strokeWidth="0.8"
    />
  );
}

const KNUCKLES: [number, number][] = [
  [18, 44],
  [56, 84],
  [96, 122],
];

/**
 * Axonometric half-section of a concealed hinge (TECTUS-style: a door part, a
 * frame part and a closed hinge body on slide bearings, each recessed into the
 * door edge and the frame), drawn as an exploded assembly that slides together.
 * Proportions follow a slim hinge set into 24 to 28 mm wide milled recesses.
 */
export function ExplodedHinge({ active, assembled }: ExplodedHingeProps) {
  const dim = (p: HingePart): number => (active.length === 0 || active.includes(p) ? 1 : 0.22);
  const asm = (n: number): CSSProperties => ({ '--asm': n }) as CSSProperties;
  const label = (
    x: number,
    y: number,
    text: string,
    opts: { sub?: string; anchor?: 'start' | 'middle' | 'end' } = {},
  ) => (
    <g
      className="xv-label"
      fontFamily="Inter, sans-serif"
      fill="#fcf9f8"
      textAnchor={opts.anchor ?? 'middle'}
    >
      {opts.sub && (
        <text x={x} y={y - 14} fontSize="10.5" letterSpacing="0.8" opacity="0.55">
          {opts.sub}
        </text>
      )}
      <text x={x} y={y} fontSize="11.5" letterSpacing="0.8" opacity="0.85">
        {text}
      </text>
    </g>
  );

  const frontHatchId = 'xv-hatch';

  return (
    <svg
      viewBox="0 0 390 392"
      className={`xv h-full w-full ${assembled ? 'is-assembled' : ''}`}
      role="img"
      aria-label="Exploded axonometric half-section of a concealed hinge: frame, frame part, hinge body with slide bearings, door part and door, with a low-voltage feed running through the hinge"
      fill="none"
      strokeLinejoin="round"
    >
      <defs>
        <pattern
          id={frontHatchId}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-30)"
        >
          <line x1="0" y1="3.5" x2="7" y2="3.5" stroke={LINE} strokeOpacity="0.4" />
        </pattern>
      </defs>

      {/* Frame (jamb) half-section with milled recess */}
      <g className="xv-part" style={{ ...asm(124), opacity: dim('members') }}>
        <polygon
          points={poly([
            [-158, 16, 14],
            [-130, 16, 14],
            [-130, 30, 14],
            [-158, 30, 14],
          ])}
          fill={VOID_FLOOR}
        />
        <polygon
          points={poly([
            [-158, 16, 14],
            [-130, 16, 14],
            [-130, 16, 126],
            [-158, 16, 126],
          ])}
          fill={VOID_BACK}
        />
        <polygon
          points={poly([
            [-158, 16, 14],
            [-158, 30, 14],
            [-158, 30, 126],
            [-158, 16, 126],
          ])}
          fill={VOID_WALL}
        />
        <g stroke={EDGE} strokeWidth="0.9">
          <polygon
            points={poly([
              [-130, 0, 0],
              [-130, 30, 0],
              [-130, 30, 14],
              [-130, 16, 14],
              [-130, 16, 126],
              [-130, 30, 126],
              [-130, 30, 140],
              [-130, 0, 140],
            ])}
            fill={WOOD_END}
          />
          <polygon
            points={poly([
              [-210, 30, 0],
              [-130, 30, 0],
              [-130, 30, 14],
              [-158, 30, 14],
              [-158, 30, 126],
              [-130, 30, 126],
              [-130, 30, 140],
              [-210, 30, 140],
            ])}
            fill={WOOD_CUT}
          />
          <polygon
            points={poly([
              [-210, 30, 0],
              [-130, 30, 0],
              [-130, 30, 14],
              [-158, 30, 14],
              [-158, 30, 126],
              [-130, 30, 126],
              [-130, 30, 140],
              [-210, 30, 140],
            ])}
            fill={`url(#${frontHatchId})`}
            stroke="none"
          />
          <polygon
            points={poly([
              [-210, 0, 140],
              [-130, 0, 140],
              [-130, 30, 140],
              [-210, 30, 140],
            ])}
            fill={WOOD_TOP}
          />
        </g>
        {label(60, 30, 'FRAME')}
      </g>

      {/* Door edge half-section with milled recess */}
      <g className="xv-part" style={{ ...asm(-124), opacity: dim('members') }}>
        <polygon
          points={poly([
            [130, 18, 14],
            [158, 18, 14],
            [158, 30, 14],
            [130, 30, 14],
          ])}
          fill={VOID_FLOOR}
        />
        <polygon
          points={poly([
            [130, 18, 14],
            [158, 18, 14],
            [158, 18, 126],
            [130, 18, 126],
          ])}
          fill={VOID_BACK}
        />
        <g stroke={EDGE} strokeWidth="0.9">
          <polygon
            points={poly([
              [210, 10, 0],
              [210, 30, 0],
              [210, 30, 140],
              [210, 10, 140],
            ])}
            fill={WOOD_END}
          />
          <polygon
            points={poly([
              [130, 30, 0],
              [210, 30, 0],
              [210, 30, 140],
              [130, 30, 140],
              [130, 30, 126],
              [158, 30, 126],
              [158, 30, 14],
              [130, 30, 14],
            ])}
            fill={WOOD_CUT}
          />
          <polygon
            points={poly([
              [130, 30, 0],
              [210, 30, 0],
              [210, 30, 140],
              [130, 30, 140],
              [130, 30, 126],
              [158, 30, 126],
              [158, 30, 14],
              [130, 30, 14],
            ])}
            fill={`url(#${frontHatchId})`}
            stroke="none"
          />
          <polygon
            points={poly([
              [130, 10, 140],
              [210, 10, 140],
              [210, 30, 140],
              [130, 30, 140],
            ])}
            fill={WOOD_TOP}
          />
        </g>
        {label(352, 376, 'DOOR')}
      </g>

      {/* Frame part with fixing screws */}
      <g className="xv-part" style={{ ...asm(78), opacity: dim('plates') }}>
        {[34, 106].map((z) => (
          <g key={z}>
            <Box
              x={[-136, -108]}
              y={[28.5, 31.5]}
              z={[z - 1.5, z + 1.5]}
              top={METAL_TOP}
              end={METAL_END}
              front={METAL_FRONT}
            />
          </g>
        ))}
        <Box
          x={[-108, -88]}
          y={[18, 42]}
          z={[18, 122]}
          top={METAL_TOP}
          end={METAL_END}
          front={METAL_FRONT}
        />
        {[34, 106].map((z) => (
          <Box
            key={z}
            x={[-88, -84]}
            y={[26, 34]}
            z={[z - 4, z + 4]}
            top="#c4a98a"
            end="#a98f6f"
            front="#8d7759"
          />
        ))}
        {label(122, 104, 'FRAME PART', { anchor: 'start' })}
      </g>

      {/* Closed hinge body: three knuckles on slide bearings */}
      <g style={{ opacity: dim('body') }}>
        {KNUCKLES.map(([z0, z1]) => (
          <g key={z0}>
            <Box
              x={[-10, 10]}
              y={[20, 40]}
              z={[z0, z1]}
              top={METAL_TOP}
              end={METAL_END}
              front={METAL_FRONT}
            />
            <TopCircle x={0} y={30} z={z1} r={5.5} fill="#1c1b1b" />
            <TopCircle x={0} y={30} z={z1} r={2} fill={LINE} />
          </g>
        ))}
        {label(187, 146, 'HINGE BODY', { sub: 'slide bearings' })}
      </g>

      {/* Door part with fixing screws */}
      <g className="xv-part" style={{ ...asm(-78), opacity: dim('plates') }}>
        {[34, 106].map((z) => (
          <Box
            key={z}
            x={[108, 136]}
            y={[28.5, 31.5]}
            z={[z - 1.5, z + 1.5]}
            top={METAL_TOP}
            end={METAL_END}
            front={METAL_FRONT}
          />
        ))}
        <Box
          x={[88, 108]}
          y={[20, 40]}
          z={[18, 122]}
          top={METAL_TOP}
          end={METAL_END}
          front={METAL_FRONT}
        />
        {label(274, 190, 'DOOR PART', { anchor: 'end' })}
      </g>

      {/* Low-voltage feed running through the hinge to the door */}
      <g style={{ opacity: dim('feed') }} className="xv-feed">
        <path
          d={`M${pt([-98, 30, 18])} C${pt([-70, 44, -14])} ${pt([70, 44, -14])} ${pt([98, 30, 18])}`}
          stroke={LINE}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 5"
        />
        <circle cx={sx(-98, 30, 18)} cy={sy(-98, 30, 18)} r="3" fill={LINE} />
        <circle cx={sx(98, 30, 18)} cy={sy(98, 30, 18)} r="3" fill={LINE} />
        <text
          x={sx(0, 44, -14)}
          y={sy(0, 44, -14) + 22}
          textAnchor="middle"
          fontSize="10.5"
          letterSpacing="0.8"
          fill="#fcf9f8"
          opacity="0.7"
          fontFamily="Inter, sans-serif"
        >
          LOW-VOLTAGE FEED
        </text>
      </g>
    </svg>
  );
}

/**
 * Front view of a concealed hinge: two slim plates with rounded ends, each with
 * countersunk fixing screws, either side of the central knuckle.
 */
export function HingeFrontView({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 100"
      className={className}
      role="img"
      aria-label="Front view of a concealed hinge: two slim plates with fixing screws and a central knuckle"
      fill="none"
      strokeLinejoin="round"
    >
      <rect
        x="5"
        y="3"
        width="19"
        height="94"
        rx="9"
        fill={FILL_HI}
        stroke={LINE}
        strokeWidth="1.2"
      />
      <rect
        x="36"
        y="3"
        width="19"
        height="94"
        rx="9"
        fill={FILL_HI}
        stroke={LINE}
        strokeWidth="1.2"
      />
      <rect x="24" y="29" width="12" height="42" fill={VOID} />
      <rect
        x="21"
        y="34"
        width="18"
        height="11"
        rx="2"
        fill={FILL}
        stroke={LINE}
        strokeWidth="1.2"
      />
      <rect
        x="21"
        y="55"
        width="18"
        height="11"
        rx="2"
        fill={FILL}
        stroke={LINE}
        strokeWidth="1.2"
      />
      <line x1="30" y1="29" x2="30" y2="71" stroke={LINE} strokeWidth="1.6" />
      {[
        [14.5, 14],
        [14.5, 86],
        [45.5, 14],
        [45.5, 86],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="3.4" stroke={LINE} strokeWidth="1" />
          <path
            d={`M${cx - 1.8} ${cy} H${cx + 1.8} M${cx} ${cy - 1.8} V${cy + 1.8}`}
            stroke={LINE}
            strokeWidth="0.8"
          />
        </g>
      ))}
    </svg>
  );
}
