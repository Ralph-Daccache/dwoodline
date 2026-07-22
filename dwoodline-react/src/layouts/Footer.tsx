import { Link } from 'react-router-dom';
import { FOOTER_COLUMNS, SITE } from '@/config/site';
import { ROUTES } from '@/config/routes';
import { SocialLinks } from '@/components/SocialLinks/SocialLinks';

const HEADING_CLASS =
  "font-['Inter'] text-[9px] tracking-[0.2em] uppercase text-[#F5F5F7]/60 pb-3 border-b border-[#F5F5F7]/10";
const LINK_CLASS =
  "font-['Inter'] text-[10px] tracking-widest uppercase text-[#F5F5F7]/40 hover:text-[#F5F5F7] transition-colors duration-300";

/** Unified footer, identical on every page. */
export function Footer() {
  return (
    <footer className="w-full bg-[#1A1A1A] dark:bg-[#0D0D0D] border-t border-[#F5F5F7]/10">
      <div className="px-6 md:px-[80px] pt-16 pb-12 flex flex-col lg:flex-row gap-16 justify-between">
        <div className="flex flex-col gap-6 min-w-[180px]">
          <div className="text-lg font-light tracking-widest text-[#F5F5F7] uppercase">
            {SITE.brand}
          </div>
          <div className="flex flex-col gap-1">
            {SITE.taglineLines.map((line) => (
              <p
                key={line}
                className="font-['Inter'] text-[10px] tracking-widest uppercase text-[#F5F5F7]/30"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
        <div className="flex gap-12 lg:gap-16 flex-wrap">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <span className={HEADING_CLASS}>{column.heading}</span>
              {column.links.map((link, index) => (
                <Link key={`${link.label}-${index}`} className={LINK_CLASS} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-3">
            <span className={HEADING_CLASS}>Connect</span>
            <Link className={LINK_CLASS} to={ROUTES.inquiry}>
              Start a Project
            </Link>
            <SocialLinks />
          </div>
        </div>
      </div>
      <div className="px-6 md:px-[80px] py-5 border-t border-[#F5F5F7]/5 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="font-['Inter'] text-[9px] tracking-[0.2em] uppercase text-[#F5F5F7]/25">
          {SITE.copyright}
        </p>
        <p className="font-['Inter'] text-[9px] tracking-[0.2em] uppercase text-[#F5F5F7]/20">
          {SITE.location}
        </p>
      </div>
    </footer>
  );
}
