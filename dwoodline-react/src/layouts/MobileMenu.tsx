import { Link, useLocation } from 'react-router-dom';
import { PRIMARY_NAV } from '@/config/routes';
import { MaterialIcon } from '@/components/MaterialIcon/MaterialIcon';

const LINK_BASE = "font-['Noto_Serif'] text-sm tracking-[0.2em] uppercase";
const LINK_ACTIVE =
  'text-[#1A1A1A] dark:text-[#F5F5F7] border-b border-[#1A1A1A] dark:border-[#F5F5F7] pb-1';
const LINK_INACTIVE = 'text-[#1A1A1A]/50 dark:text-[#F5F5F7]/50';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Full-screen mobile overlay menu that slides down from the top. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { pathname } = useLocation();
  return (
    <div
      id="mobileMenu"
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-10 bg-[#F5F5F7] dark:bg-[#1A1A1A] md:hidden"
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
          className="text-[#1A1A1A] dark:text-[#F5F5F7]"
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
