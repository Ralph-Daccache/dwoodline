import type { CSSProperties } from 'react';

interface MaterialIconProps {
  /** Ligature name, e.g. "menu", "arrow_forward". */
  name: string;
  className?: string;
  style?: CSSProperties;
}

/** Thin wrapper around a Material Symbols Outlined glyph. */
export function MaterialIcon({ name, className, style }: MaterialIconProps) {
  const classes = className
    ? `material-symbols-outlined ${className}`
    : 'material-symbols-outlined';
  return (
    <span className={classes} style={style} aria-hidden="true">
      {name}
    </span>
  );
}
