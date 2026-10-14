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

export type HingePart = 'door' | 'cup' | 'plate' | 'fixings' | 'carcass';

interface ExplodedHingeProps {
  /** Parts to emphasise; everything else dims. Empty means no emphasis. */
  active: HingePart[];
  assembled: boolean;
}

const LINE = '#c4a98a';
const FILL = '#2a2928';
const FILL_HI = '#3b3a39';

/** Technical drawing of a concealed hinge, drawn as an exploded assembly. */
export function ExplodedHinge({ active, assembled }: ExplodedHingeProps) {
  const dim = (p: HingePart): number => (active.length === 0 || active.includes(p) ? 1 : 0.22);
  const label = (x: number, y: number, text: string) => (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize="13"
      letterSpacing="1.2"
      fill="#fcf9f8"
      opacity={0.85}
      className="xv-label"
      fontFamily="Inter, sans-serif"
    >
      {text}
    </text>
  );
  return (
    <svg
      viewBox="0 0 520 320"
      className={`xv h-full w-full ${assembled ? 'is-assembled' : ''}`}
      role="img"
      aria-label="Exploded view of a concealed hinge: door panel, hinge cup, mounting plate, fixings and carcass side"
      fill="none"
      strokeLinejoin="round"
    >
      <line
        x1="10"
        y1="170"
        x2="510"
        y2="170"
        stroke={LINE}
        strokeOpacity="0.35"
        strokeDasharray="6 5"
      />

      <g className="xv-part" style={{ '--asm': '70px', opacity: dim('door') } as CSSProperties}>
        <rect x="30" y="70" width="100" height="200" fill={FILL} stroke={LINE} strokeWidth="1.5" />
        <rect
          x="96"
          y="132"
          width="34"
          height="76"
          fill="#1c1b1b"
          stroke={LINE}
          strokeDasharray="4 3"
        />
        {[92, 112, 132, 152, 172, 192, 212, 232, 252].map((y) => (
          <line key={y} x1="38" y1={y} x2="88" y2={y} stroke={LINE} strokeOpacity="0.14" />
        ))}
        {label(80, 296, 'DOOR PANEL')}
      </g>

      <g className="xv-part" style={{ '--asm': '-10px', opacity: dim('cup') } as CSSProperties}>
        <rect
          x="170"
          y="140"
          width="46"
          height="60"
          rx="6"
          fill={FILL_HI}
          stroke={LINE}
          strokeWidth="1.5"
        />
        <rect
          x="216"
          y="162"
          width="58"
          height="16"
          fill={FILL_HI}
          stroke={LINE}
          strokeWidth="1.5"
        />
        <circle cx="274" cy="170" r="10" fill={FILL} stroke={LINE} strokeWidth="1.5" />
        <circle cx="274" cy="170" r="3.5" fill={LINE} />
        {label(220, 232, 'HINGE CUP')}
      </g>

      <g className="xv-part" style={{ '--asm': '-38px', opacity: dim('plate') } as CSSProperties}>
        <rect
          x="300"
          y="116"
          width="22"
          height="108"
          fill={FILL_HI}
          stroke={LINE}
          strokeWidth="1.5"
        />
        <circle cx="311" cy="138" r="3" stroke={LINE} />
        <circle cx="311" cy="202" r="3" stroke={LINE} />
        {label(311, 252, 'MOUNT PLATE')}
      </g>

      <g className="xv-part" style={{ '--asm': '-56px', opacity: dim('fixings') } as CSSProperties}>
        {[138, 202].map((y) => (
          <g key={y}>
            <rect x="342" y={y - 8} width="8" height="16" fill={LINE} />
            <rect x="350" y={y - 2} width="38" height="4" fill={LINE} />
          </g>
        ))}
        {label(372, 296, 'FIXINGS')}
      </g>

      <g
        className="xv-part"
        style={{ '--asm': '-138px', opacity: dim('carcass') } as CSSProperties}
      >
        <rect x="430" y="70" width="44" height="200" fill={FILL} stroke={LINE} strokeWidth="1.5" />
        <rect x="434" y="100" width="6" height="140" fill="#fcf9f8" fillOpacity="0.55" />
        <rect x="434" y="100" width="6" height="140" stroke={LINE} strokeOpacity="0.8" />
        {label(452, 52, 'CARCASS + LED')}
      </g>
    </svg>
  );
}
