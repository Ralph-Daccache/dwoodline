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
  /** 0 = hinge alone, 1 = frame attached, 2 = frame and door attached. */
  step: 0 | 1 | 2;
}

/* ---- axonometric helpers -------------------------------------------------
   Viewer sits at +x, +y, +z. Screen x = (x - y) cos30, screen y = (x + y) sin30 - z.
   The door and frame are cut at the hinge mid-plane (y = 30) so both milled
   recesses show, and the parts separate along x. */
const K = 0.866 * 0.9;
const M = 0.5 * 0.9;
const ZS = 0.9;
const OX = 210;
const OY = 275;

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
const SILVER_TOP = '#d6d7d8';
const SILVER_FRONT = '#b3b5b7';
const SILVER_END = '#8e9093';
const BLACK_TOP = '#2b2b2b';
const BLACK_END = '#1a1a1a';
const BLACK_FRONT = '#232323';

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

/** Outline in the (y, z) plane at a given x: a slim plate with one rounded end. */
function plateOutline(
  x: number,
  y0: number,
  y1: number,
  z0: number,
  z1: number,
  r: number,
  roundTop: boolean,
): V3[] {
  const pts: V3[] = [];
  const arc = (cy: number, cz: number, a0: number, a1: number): void => {
    for (let i = 0; i <= 6; i += 1) {
      const a = ((a0 + ((a1 - a0) * i) / 6) * Math.PI) / 180;
      pts.push([x, cy + r * Math.cos(a), cz + r * Math.sin(a)]);
    }
  };
  if (roundTop) {
    pts.push([x, y0, z0], [x, y1, z0]);
    arc(y1 - r, z1 - r, 0, 90);
    arc(y0 + r, z1 - r, 90, 180);
  } else {
    pts.push([x, y0, z1], [x, y1, z1]);
    arc(y1 - r, z0 + r, 0, -90);
    arc(y0 + r, z0 + r, -90, -180);
  }
  return pts;
}

/** Countersunk cross-head screw seen on a plate face at x. */
function Screw({ x, y, z }: { x: number; y: number; z: number }) {
  const ring: V3[] = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return [x + 0.2, y + 3.4 * Math.cos(a), z + 3.4 * Math.sin(a)];
  });
  return (
    <g stroke="rgba(60,62,66,0.9)" strokeWidth="0.7">
      <polygon points={poly(ring)} fill="#c4c6c8" />
      <polyline
        points={poly([
          [x + 0.3, y - 2, z],
          [x + 0.3, y + 2, z],
        ])}
        fill="none"
      />
      <polyline
        points={poly([
          [x + 0.3, y, z - 2],
          [x + 0.3, y, z + 2],
        ])}
        fill="none"
      />
    </g>
  );
}

/** One silver cover plate: rounded outer end, square inner end, one screw. */
function CoverPlate({
  x,
  z0,
  z1,
  roundTop,
}: {
  x: number;
  z0: number;
  z1: number;
  roundTop: boolean;
}) {
  const back = plateOutline(x - 3, 18, 42, z0, z1, 9, roundTop);
  const front = plateOutline(x, 18, 42, z0, z1, 9, roundTop);
  const zc = roundTop ? z1 - 13 : z0 + 13;
  return (
    <g stroke={EDGE} strokeWidth="0.8" strokeLinejoin="round">
      <polygon points={poly(back)} fill={SILVER_END} />
      <polygon points={poly(front)} fill={SILVER_TOP} />
      <Screw x={x} y={30} z={zc} />
    </g>
  );
}

/**
 * Axonometric half-section of a concealed hinge shaped like Simonswerk's
 * TECTUS (about 160 mm long and 28 mm wide per side): each side is a black
 * housing under two silver cover plates (rounded outer end, one countersunk
 * screw each), with a stepped silver knuckle in the middle. Drawn as an
 * exploded assembly that slides together into the recesses.
 */
export function ExplodedHinge({ active, step }: ExplodedHingeProps) {
  const dim = (p: HingePart): number => (active.length === 0 || active.includes(p) ? 1 : 0.22);
  /** Slide along the axonometric x axis (screen direction cos30, sin30). */
  const move = (shift: number): CSSProperties => ({
    transform: `translate(${(shift * 0.7794).toFixed(1)}px, ${(shift * 0.45).toFixed(1)}px)`,
  });
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

  const hatch = 'xv-hatch';
  const Z1 = 170;

  return (
    <svg
      viewBox="0 0 390 412"
      className="xv h-full w-full"
      role="img"
      aria-label="Exploded axonometric half-section of a concealed hinge: frame, frame part with silver cover plates and black housing, hinge knuckle, door part and door, with a low-voltage feed running through the hinge"
      fill="none"
      strokeLinejoin="round"
    >
      <defs>
        <pattern
          id={hatch}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-30)"
        >
          <line x1="0" y1="3.5" x2="7" y2="3.5" stroke={LINE} strokeOpacity="0.4" />
        </pattern>
      </defs>

      {/* Frame (jamb) half-section with milled recess */}
      <g className="xv-part" style={{ ...move(step >= 1 ? 144 : 0), opacity: dim('members') }}>
        <polygon
          points={poly([
            [-172, 16, 16],
            [-150, 16, 16],
            [-150, 30, 16],
            [-172, 30, 16],
          ])}
          fill={VOID_FLOOR}
        />
        <polygon
          points={poly([
            [-172, 16, 16],
            [-150, 16, 16],
            [-150, 16, 154],
            [-172, 16, 154],
          ])}
          fill={VOID_BACK}
        />
        <polygon
          points={poly([
            [-172, 16, 16],
            [-172, 30, 16],
            [-172, 30, 154],
            [-172, 16, 154],
          ])}
          fill={VOID_WALL}
        />
        <g stroke={EDGE} strokeWidth="0.9">
          <polygon
            points={poly([
              [-150, 0, 0],
              [-150, 30, 0],
              [-150, 30, 16],
              [-150, 16, 16],
              [-150, 16, 154],
              [-150, 30, 154],
              [-150, 30, Z1],
              [-150, 0, Z1],
            ])}
            fill={WOOD_END}
          />
          <polygon
            points={poly([
              [-215, 30, 0],
              [-150, 30, 0],
              [-150, 30, 16],
              [-172, 30, 16],
              [-172, 30, 154],
              [-150, 30, 154],
              [-150, 30, Z1],
              [-215, 30, Z1],
            ])}
            fill={WOOD_CUT}
          />
          <polygon
            points={poly([
              [-215, 30, 0],
              [-150, 30, 0],
              [-150, 30, 16],
              [-172, 30, 16],
              [-172, 30, 154],
              [-150, 30, 154],
              [-150, 30, Z1],
              [-215, 30, Z1],
            ])}
            fill={`url(#${hatch})`}
            stroke="none"
          />
          <polygon
            points={poly([
              [-215, 0, Z1],
              [-150, 0, Z1],
              [-150, 30, Z1],
              [-215, 30, Z1],
            ])}
            fill={WOOD_TOP}
          />
        </g>
        {label(60, 16, 'FRAME')}
      </g>

      {/* Door edge half-section with milled recess */}
      <g className="xv-part" style={{ ...move(step >= 2 ? -144 : 0), opacity: dim('members') }}>
        <polygon
          points={poly([
            [150, 16, 16],
            [172, 16, 16],
            [172, 30, 16],
            [150, 30, 16],
          ])}
          fill={VOID_FLOOR}
        />
        <polygon
          points={poly([
            [150, 16, 16],
            [172, 16, 16],
            [172, 16, 154],
            [150, 16, 154],
          ])}
          fill={VOID_BACK}
        />
        <g stroke={EDGE} strokeWidth="0.9">
          <polygon
            points={poly([
              [215, 10, 0],
              [215, 30, 0],
              [215, 30, Z1],
              [215, 10, Z1],
            ])}
            fill={WOOD_END}
          />
          <polygon
            points={poly([
              [150, 30, 0],
              [215, 30, 0],
              [215, 30, Z1],
              [150, 30, Z1],
              [150, 30, 154],
              [172, 30, 154],
              [172, 30, 16],
              [150, 30, 16],
            ])}
            fill={WOOD_CUT}
          />
          <polygon
            points={poly([
              [150, 30, 0],
              [215, 30, 0],
              [215, 30, Z1],
              [150, 30, Z1],
              [150, 30, 154],
              [172, 30, 154],
              [172, 30, 16],
              [150, 30, 16],
            ])}
            fill={`url(#${hatch})`}
            stroke="none"
          />
          <polygon
            points={poly([
              [150, 10, Z1],
              [215, 10, Z1],
              [215, 30, Z1],
              [150, 30, Z1],
            ])}
            fill={WOOD_TOP}
          />
        </g>
        {label(372, 404, 'DOOR', { anchor: 'end' })}
      </g>

      {/* Frame part: black housing with two silver cover plates and screws */}
      <g style={{ ...move(84), opacity: dim('plates') }}>
        <Box
          x={[-110, -93]}
          y={[18, 42]}
          z={[20, 150]}
          top={BLACK_TOP}
          end={BLACK_END}
          front={BLACK_FRONT}
        />
        <polygon
          points={poly([
            [-93, 21, 67],
            [-93, 39, 67],
            [-93, 39, 103],
            [-93, 21, 103],
          ])}
          fill="#0b0b0b"
        />
        <CoverPlate x={-90} z0={20} z1={62} roundTop={false} />
        <CoverPlate x={-90} z0={108} z1={150} roundTop />
      </g>

      {/* Stepped silver knuckle between the two housings */}
      <g style={{ opacity: dim('body') }}>
        {[
          { z: [64, 78] as [number, number], y: [22, 38] as [number, number] },
          { z: [80, 90] as [number, number], y: [25, 35] as [number, number] },
          { z: [92, 106] as [number, number], y: [22, 38] as [number, number] },
        ].map((seg) => (
          <g key={seg.z[0]}>
            <Box
              x={[-9, 9]}
              y={seg.y}
              z={seg.z}
              top={SILVER_TOP}
              end={SILVER_END}
              front={SILVER_FRONT}
            />
            <TopCircle x={0} y={30} z={seg.z[1]} r={3.6} fill="#2a2b2c" />
          </g>
        ))}
        {label(187, 372, 'HINGE', { sub: 'one body, slide bearings' })}
      </g>

      {/* Door part: black housing (its cover plates face the frame, away from the viewer) */}
      <g style={{ ...move(-84), opacity: dim('plates') }}>
        <Box
          x={[93, 110]}
          y={[18, 42]}
          z={[20, 150]}
          top={BLACK_TOP}
          end={BLACK_END}
          front={BLACK_FRONT}
        />
        <Box x={[110, 112]} y={[26, 34]} z={[30, 38]} top="#8a8c8f" end="#6d6f72" front="#7b7d80" />
        <Box
          x={[110, 112]}
          y={[26, 34]}
          z={[132, 140]}
          top="#8a8c8f"
          end="#6d6f72"
          front="#7b7d80"
        />
      </g>

      {/* Low-voltage feed running through the hinge to the door */}
      <g style={{ opacity: dim('feed') }} className="xv-feed">
        <path
          d={`M${pt([-17, 30, 20])} C${pt([-10, 44, -14])} ${pt([10, 44, -14])} ${pt([17, 30, 20])}`}
          stroke={LINE}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 5"
        />
        <circle cx={sx(-17, 30, 20)} cy={sy(-17, 30, 20)} r="3" fill={LINE} />
        <circle cx={sx(17, 30, 20)} cy={sy(17, 30, 20)} r="3" fill={LINE} />
        <text
          x={sx(0, 44, -14) + 8}
          y={sy(0, 44, -14) + 22}
          textAnchor="end"
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
 * Front view of the concealed hinge, drawn to the proportions of Simonswerk's
 * TECTUS TE 340 3D (160 mm long, 28 mm wide per side, 17.5 mm between the
 * sides): four silver cover plates with rounded outer ends and one countersunk
 * screw each, a black recess, and the stepped silver knuckle.
 */
export function HingeFrontView({ className }: { className?: string }) {
  const plateTop = (x: number): string =>
    `M${x} 51.5 V11.5 A11.5 11.5 0 0 1 ${x + 11.5} 0 H${x + 16.5} A11.5 11.5 0 0 1 ${x + 28} 11.5 V51.5 Z`;
  const plateBottom = (x: number): string =>
    `M${x} 108.5 V148.5 A11.5 11.5 0 0 0 ${x + 11.5} 160 H${x + 16.5} A11.5 11.5 0 0 0 ${x + 28} 148.5 V108.5 Z`;
  const screws: [number, number][] = [
    [14, 14],
    [14, 146],
    [59.5, 14],
    [59.5, 146],
  ];
  return (
    <svg
      viewBox="-2 -2 77.5 164"
      className={className}
      role="img"
      aria-label="Front view of a concealed hinge: four silver cover plates with one screw each, a black recess and a stepped silver knuckle"
      fill="none"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="hfv-silver" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#f0f1f2" />
          <stop offset="0.5" stopColor="#c3c5c7" />
          <stop offset="1" stopColor="#e4e5e6" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="54" width="72.5" height="52" fill="#121212" />
      {[0, 45.5].map((x) => (
        <g key={x}>
          <path d={plateTop(x)} fill="url(#hfv-silver)" stroke="#8d8f92" strokeWidth="0.6" />
          <path d={plateBottom(x)} fill="url(#hfv-silver)" stroke="#8d8f92" strokeWidth="0.6" />
          <rect x={x} y="51.5" width="28" height="4.6" fill="#a4a6a9" />
          <rect x={x} y="103.9" width="28" height="4.6" fill="#a4a6a9" />
        </g>
      ))}
      {screws.map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="4" fill="#d4d6d8" stroke="#7d7f82" strokeWidth="0.6" />
          <path
            d={`M${cx - 2.3} ${cy} H${cx + 2.3} M${cx} ${cy - 2.3} V${cy + 2.3}`}
            stroke="#6a6c70"
            strokeWidth="0.9"
          />
        </g>
      ))}
      <rect
        x="10.6"
        y="58"
        width="11"
        height="45"
        rx="1.5"
        fill="url(#hfv-silver)"
        stroke="#8d8f92"
        strokeWidth="0.5"
      />
      <rect
        x="48.5"
        y="58"
        width="10.5"
        height="45"
        rx="1.5"
        fill="url(#hfv-silver)"
        stroke="#8d8f92"
        strokeWidth="0.5"
      />
      <rect
        x="33"
        y="59"
        width="16"
        height="12"
        fill="url(#hfv-silver)"
        stroke="#8d8f92"
        strokeWidth="0.5"
      />
      <rect
        x="21.6"
        y="71"
        width="27"
        height="6"
        fill="#e9eaeb"
        stroke="#8d8f92"
        strokeWidth="0.5"
      />
      <rect
        x="21.6"
        y="92"
        width="27"
        height="11"
        fill="url(#hfv-silver)"
        stroke="#8d8f92"
        strokeWidth="0.5"
      />
      <line x1="34.5" y1="58" x2="34.5" y2="103" stroke="#6a6c70" strokeWidth="0.7" />
    </svg>
  );
}
