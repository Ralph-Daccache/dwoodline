import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PRIMARY_NAV, normalizePath } from '@/config/routes';
import { MaterialIcon } from '@/components/MaterialIcon/MaterialIcon';

const LINK_BASE = "font-['Noto_Serif'] text-sm tracking-[0.2em] uppercase";
const LINK_ACTIVE = 'text-white border-b border-white pb-1';
const LINK_INACTIVE = 'text-white/75';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Full-screen mobile overlay menu that slides down from the top. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = normalizePath(useLocation().pathname);
  const ref = useRef<HTMLDivElement>(null);

  // When closed, the overlay is only slid off-screen; mark it inert so its
  // links aren't tabbable or reachable by screen readers.
  useEffect(() => {
    if (ref.current) ref.current.inert = !open;
  }, [open]);

  return (
    <div
      id="mobileMenu"
      ref={ref}
      aria-hidden={!open}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-10 bg-brand md:hidden"
      style={{
        transform: open ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.5s ease-in-out',
      }}
    >
      <button
        type="button"
        className="absolute top-8 right-6"
        onClick={onClose}
        aria-label="Close menu"
      >
        <MaterialIcon
          name="close"
          className="text-white"
          style={{ fontSize: '28px', fontVariationSettings: "'wght' 200" }}
        />
      </button>
      {PRIMARY_NAV.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={onClose}
          className={`${LINK_BASE} ${pathname === item.path ? LINK_ACTIVE : LINK_INACTIVE}`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
