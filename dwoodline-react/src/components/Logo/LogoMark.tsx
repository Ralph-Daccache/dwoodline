interface LogoMarkProps {
  className?: string;
  /** Colour of the outlined shape (defaults to the surrounding text colour). */
  outlineClassName?: string;
  /** Colour of the solid shape (defaults to the brand tan). */
  solidClassName?: string;
}

/**
 * The D Woodline mark: an outlined shape beside a solid one. Drawn as inline
 * SVG so it stays crisp at any size and can take the site's colours.
 */
export function LogoMark({
  className,
  outlineClassName = 'text-current',
  solidClassName = 'text-brand',
}: LogoMarkProps) {
  return (
    <svg
      viewBox="420 460 1080 660"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M452 492 L855 497 Q930 498 976 555 Q1022 612 1008 690 Q1002 715 990 735 L783 1085 Q778 1092 771 1085 L442 503 Q438 494 452 492 Z"
        className={outlineClassName}
        stroke="currentColor"
        strokeWidth="46"
        strokeLinejoin="round"
      />
      <path
        d="M1265 480 L1470 480 Q1486 484 1480 501 L1140 1086 Q1128 1100 1116 1087 L970 856 Q962 842 970 830 L1128 558 Q1180 480 1265 480 Z"
        className={solidClassName}
        fill="currentColor"
      />
    </svg>
  );
}
