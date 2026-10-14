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

const LINE = '#c4a98a';
const FILL = '#2a2928';
const FILL_HI = '#3b3a39';
const VOID = '#141312';

/**
 * Plan section through a fully concealed hinge (TECTUS-style: door part, frame
 * part and a closed hinge body, each part recessed into the door edge and the
 * frame), drawn as an exploded assembly. Proportions follow a slim 160 mm hinge
 * set into 24 to 28 mm wide milled recesses.
 */
export function ExplodedHinge({ active, assembled }: ExplodedHingeProps) {
  const dim = (p: HingePart): number => (active.length === 0 || active.includes(p) ? 1 : 0.22);
  const label = (x: number, y: number, text: string, size = 11.5) => (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={size}
      letterSpacing="0.8"
      fill="#fcf9f8"
      opacity={0.85}
      className="xv-label"
      fontFamily="Inter, sans-serif"
    >
      {text}
    </text>
  );
  const asm = (px: number): CSSProperties => ({ '--asm': `${px}px` }) as CSSProperties;

  return (
    <svg
      viewBox="0 62 520 232"
      className={`xv h-full w-full ${assembled ? 'is-assembled' : ''}`}
      role="img"
      aria-label="Exploded plan section of a concealed hinge: frame, frame part, hinge body with slide bearings, door part and door, with a low-voltage feed running through the hinge"
      fill="none"
      strokeLinejoin="round"
    >
      <defs>
        <pattern
          id="xv-hatch"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke={LINE} strokeOpacity="0.42" />
        </pattern>
      </defs>

      <line
        x1="10"
        y1="150"
        x2="510"
        y2="150"
        stroke={LINE}
        strokeOpacity="0.3"
        strokeDasharray="6 5"
      />

      <g className="xv-part" style={{ ...asm(118), opacity: dim('members') }}>
        <rect x="20" y="80" width="110" height="140" fill={FILL} stroke={LINE} strokeWidth="1.5" />
        <rect x="20" y="80" width="110" height="140" fill="url(#xv-hatch)" />
        <rect x="96" y="124" width="35" height="52" fill={VOID} />
        <path d="M130 124 H96 V176 H130" stroke={LINE} strokeWidth="1.5" />
        {label(75, 246, 'FRAME')}
      </g>

      <g className="xv-part" style={{ ...asm(-118), opacity: dim('members') }}>
        <rect x="390" y="90" width="110" height="120" fill={FILL} stroke={LINE} strokeWidth="1.5" />
        <rect x="390" y="90" width="110" height="120" fill="url(#xv-hatch)" />
        <rect x="389" y="124" width="35" height="52" fill={VOID} />
        <path d="M390 124 H424 V176 H390" stroke={LINE} strokeWidth="1.5" />
        {label(445, 246, 'DOOR')}
      </g>

      <g className="xv-part" style={{ ...asm(64), opacity: dim('plates') }}>
        {[138, 162].map((y) => (
          <g key={y}>
            <rect x="136" y={y - 1.5} width="48" height="3" fill={LINE} />
            <rect x="184" y={y - 4.5} width="5" height="9" fill={LINE} />
          </g>
        ))}
        <rect
          x="150"
          y="126"
          width="34"
          height="48"
          rx="5"
          fill={FILL_HI}
          stroke={LINE}
          strokeWidth="1.5"
        />
        <circle cx="167" cy="150" r="7" stroke={LINE} strokeOpacity="0.6" />
        {label(167, 246, 'FRAME PART')}
      </g>

      <g className="xv-part" style={{ ...asm(-64), opacity: dim('plates') }}>
        {[138, 162].map((y) => (
          <g key={y}>
            <rect x="336" y={y - 1.5} width="48" height="3" fill={LINE} />
            <rect x="331" y={y - 4.5} width="5" height="9" fill={LINE} />
          </g>
        ))}
        <rect
          x="336"
          y="126"
          width="34"
          height="48"
          rx="5"
          fill={FILL_HI}
          stroke={LINE}
          strokeWidth="1.5"
        />
        <circle cx="353" cy="150" r="7" stroke={LINE} strokeOpacity="0.6" />
        {label(353, 246, 'DOOR PART')}
      </g>

      <g style={{ opacity: dim('body') }} className="xv-body">
        <rect
          x="208"
          y="130"
          width="104"
          height="40"
          rx="8"
          fill={FILL}
          stroke={LINE}
          strokeOpacity="0.6"
          strokeDasharray="3 3"
        />
        <line
          x1="222"
          y1="138"
          x2="298"
          y2="162"
          stroke={LINE}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="222"
          y1="162"
          x2="298"
          y2="138"
          stroke={FILL_HI}
          strokeWidth="9"
          strokeLinecap="round"
        />
        <line
          x1="222"
          y1="162"
          x2="298"
          y2="138"
          stroke={LINE}
          strokeWidth="6"
          strokeLinecap="round"
        />
        {[
          [222, 138],
          [222, 162],
          [298, 138],
          [298, 162],
          [260, 150],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="6" fill={VOID} stroke={LINE} strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r="2.4" fill={LINE} />
          </g>
        ))}
        {label(260, 268, 'HINGE BODY')}
        <text
          x="260"
          y="283"
          textAnchor="middle"
          fontSize="11"
          letterSpacing="1"
          fill="#fcf9f8"
          opacity="0.55"
          className="xv-label"
          fontFamily="Inter, sans-serif"
        >
          slide bearings
        </text>
      </g>

      <g style={{ opacity: dim('feed') }} className="xv-feed">
        <path
          d="M167 174 C167 206 222 208 260 196 S353 206 353 174"
          stroke={LINE}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 5"
        />
        <circle cx="167" cy="174" r="3" fill={LINE} />
        <circle cx="353" cy="174" r="3" fill={LINE} />
        {label(260, 224, 'LOW-VOLTAGE FEED', 10.5)}
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
