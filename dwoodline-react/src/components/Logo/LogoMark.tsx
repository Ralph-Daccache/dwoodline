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
      viewBox="350 385 890 530"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M372 408 L708 411 C790 412 842 470 840 540 C839 570 828 592 815 612 L650 888 Q645 897 640 888 L368 418 Q364 408 372 408 Z"
        className={outlineClassName}
        stroke="currentColor"
        strokeWidth="19"
        strokeLinejoin="round"
      />
      <path
        d="M1045 398 L1215 398 Q1232 402 1226 417 L946 892 Q934 910 920 892 L804 714 Q797 702 805 690 L935 463 Q980 398 1045 398 Z"
        className={solidClassName}
        fill="currentColor"
      />
    </svg>
  );
}
