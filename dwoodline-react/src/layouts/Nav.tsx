import { Link, useLocation } from 'react-router-dom';
import { PRIMARY_NAV } from '@/config/routes';
import { SITE } from '@/config/site';
import { MaterialIcon } from '@/components/MaterialIcon/MaterialIcon';

const LINK_BASE =
  "font-['Noto_Serif'] text-sm tracking-[0.2em] uppercase transition-all duration-500";
const LINK_ACTIVE =
  'text-[#1A1A1A] dark:text-[#F5F5F7] border-b border-[#1A1A1A] dark:border-[#F5F5F7] pb-1 hover:text-[#1A1A1A] dark:hover:text-[#F5F5F7]';
const LINK_INACTIVE =
  'text-[#1A1A1A]/50 dark:text-[#F5F5F7]/50 hover:text-[#1A1A1A] dark:hover:text-[#F5F5F7]';

interface NavProps {
  onOpenMenu: () => void;
}

/** Fixed top navigation, identical on every page (active link tracks the route). */
export function Nav({ onOpenMenu }: NavProps) {
  const { pathname } = useLocation();
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[#1A1A1A]/10 dark:border-[#F5F5F7]/10 bg-[#F5F5F7]/80 backdrop-blur-md dark:bg-[#1A1A1A]/80 flex justify-between items-center px-6 md:px-[80px] py-8">
      <div className="text-2xl font-light tracking-[0.3em] uppercase text-[#1A1A1A] dark:text-[#F5F5F7]">
        {SITE.brand}
      </div>
      <div className="hidden md:flex items-center gap-stack-lg">
        {PRIMARY_NAV.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${LINK_BASE} ${pathname === item.path ? LINK_ACTIVE : LINK_INACTIVE}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <button type="button" className="md:hidden" onClick={onOpenMenu} aria-label="Open menu">
        <MaterialIcon name="menu" className="text-primary" />
      </button>
    </nav>
  );
}
