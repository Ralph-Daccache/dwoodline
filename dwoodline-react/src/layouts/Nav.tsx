import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PRIMARY_NAV, ROUTES } from '@/config/routes';
import { SITE } from '@/config/site';
import { MaterialIcon } from '@/components/MaterialIcon/MaterialIcon';
import { LogoMark } from '@/components/Logo/LogoMark';

const LINK_BASE =
  "font-['Noto_Serif'] text-sm tracking-[0.2em] uppercase transition-all duration-500";
const LINK_ACTIVE = 'text-white border-b border-white pb-1 hover:text-white';
const LINK_INACTIVE = 'text-white/80 hover:text-white';

interface NavProps {
  onOpenMenu: () => void;
}

/** Fixed top navigation, identical on every page (active link tracks the route). */
export function Nav({ onOpenMenu }: NavProps) {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Solid tan at the top of the page; translucent and blurred once scrolling starts.
  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);
  return (
    <nav
      className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-[80px] py-[clamp(16px,3.5vw,32px)] transition-[background-color,backdrop-filter] duration-300 ${
        scrolled ? 'bg-brand/70 backdrop-blur-md' : 'bg-brand'
      }`}
    >
      <Link
        to={ROUTES.home}
        aria-label={`${SITE.brand}, home`}
        className="flex items-center gap-3 text-[clamp(18px,3vw,24px)] font-light tracking-[0.12em] text-white"
      >
        <LogoMark
          className="h-[clamp(24px,3.6vw,34px)] w-auto shrink-0"
          outlineClassName="text-white"
          solidClassName="text-white"
        />
        {SITE.brand}
      </Link>
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
        <MaterialIcon name="menu" className="text-white" />
      </button>
    </nav>
  );
}
