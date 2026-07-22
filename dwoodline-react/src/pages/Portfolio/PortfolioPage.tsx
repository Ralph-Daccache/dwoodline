import { useState } from 'react';
import { Carousel, type PortfolioSlide } from '@/components/Carousel/Carousel';
import { GalleryModal } from '@/components/GalleryModal/GalleryModal';
import { useHtmlScrollSnap } from '@/hooks/useHtmlScrollSnap';
import { useSectionScroll } from '@/hooks/useSectionScroll';

interface CategorySection {
  id: string;
  heading: string;
  slides: PortfolioSlide[];
}

const CATEGORIES: CategorySection[] = [
  {
    id: 'residential',
    heading: 'Residential',
    slides: [
      {
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBo9EdbdFsjsDzDV3L5NVDS5FzxmiAGo11Mzbp6B3wMhH3NuaScmGOylEAU8xKpgaSAsr0SNlE0N1XfNfaK_idLfOt0xupZimkCigAgEsiDaLVSSQrg9vshKNIxoZnF1mgb8ZjNQ-TXgOEsKMZjDAkVDQDeLRJiu35GzX_Uomrfm9qIv49Md1Nq-xR-vCB7itKISNwGno7PV2Z0M1RqmE3Wo_FvRY1I_kB-tn6YPJKWkgQ-E-XcecXxz1qi6PV7QvToOr6pZM9bSKQ',
        location: 'Milan, Italy',
        year: '2024',
        title: 'The Obsidian Penthouse',
        description:
          'A structural dialogue between darkness and light. We sculpted this private residence using Calacatta marble and hand-charred cedar, creating a retreat that defies the urban noise through material silence.',
      },
      {
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAtf4BwXmDqgDsLDpb2PepQ_KfmgXtcF8nJ0E6AdDb5i_b-YTvZUe3jKiH7BOty7XMmOq5mW8W_Ows1NtQMxfHwny5cMCVnMUK6XB2nH1O18wmr6M38bIPEBwjQQY2aHdJKeYqA8VAiExkA4NXvSG5kOZ4tgmswTKzSYZYOnlGSzUq4OlkJnmEBuerI63hRqUxwk08NUsz524rFAZnFHzJfxejobeLnSNFi2TzV63ecZm_lCMtnwxg6owocW9ZM7HKFuyTxu1aO-Jk',
        location: 'Santorini, Greece',
        year: '2023',
        title: 'Amanita Sky Suites',
        description:
          "Redefining coastal luxury through the lens of tectonic precision. The suites utilize the cliffside's natural basalt geometry to frame the Aegean Sea within monolithic white architectural volumes.",
      },
    ],
  },
  {
    id: 'hospitality',
    heading: 'Hospitality',
    slides: [
      {
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ9eRwwgbAKxpxfJ0NERJe8sohHkN1gbBNMtG3bwkzDL3MaSJHuyuZhYpOaJxdEYu65l8WpBfRqm466oD5gzB4VqMsAHXqwWWeU5WxPMYEsRK-MOWtQ_VVJoHLnd3g2TMMk-aiW7PbOkRhwSXPoQgtq6pkVMfJc4U4qz36FFuARV94CXsdrd7X4YyPJqKRavOJxZK_nmIvo7u-wL4ncujMarntjui04YkD8Rjp1BOWN8701UB2VXBS1JKwc1Vcf-sM4Sg4vDZT6us',
        location: 'Paris, France',
        year: '2024',
        title: 'The Ritz Suites',
        description:
          'A modern interpretation of Parisian grandeur. Integrating silk-panelled walls with brushed brass accents to redefine the classical luxury experience for the 21st century.',
      },
      {
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCV8hcd2lzItm6fkkqKcso0XU6Z-dC_Cl0wwnyHNkBlLsLdiOdQt66FCJEK1Fvs7Z47BbU_c17i7C5UfABSZ9IZKEd8xgHOQKgPtfl7kIwZMIQZYtEZL1oM6MCwFTbb02M2GcPZ-elQa1OyXv6cAs6ckvCcGWzMEkM0t2QtthQN-nDb0WHvQHkt7rutbB2xFahP7Fg_W6qQ9klr1j3PjGRh1W6Q_ffEUoOr303N7SG7e7BKD32GYkDkjl6JD85y7NGbciNE0PMoWTo',
        location: 'Zurich, Switzerland',
        year: '2025',
        title: 'Zenith Wellness Club',
        description:
          'Minimalist spa architecture focused on light and silence. We utilized sand-blasted glass and rough-hewn granite to create a sensory journey through natural textures.',
      },
    ],
  },
  {
    id: 'commercial',
    heading: 'Commercial',
    slides: [
      {
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuASEMcfBX8ZALZP_1J47nIfOVsJ8uuK9OzqeTkoskiszglyBjItVcVZ5dq8pHyc2vD5NUi3X30JAMLWYtCjTCZUD_82yzKsmYc4eeUq4B7_m-_TW-zN2m8w1LIutnXYNPzWUV2Jwkn8_z57AX30bc-jOMOAcJX9GqJ8TW9SUSqVPbdpQSkJvt8ZpLZ_iDqL7Fba2S2vzb8zKnIr5SOb6rUNjbwSYwA38RW2iCxuxI_h8nc6PaDRBcb9_QP245hK4Zgbq5BS2w-5h0k',
        location: 'Berlin, Germany',
        year: '2024',
        title: 'Corporate Headquarters',
        description:
          'A workspace designed for cognitive clarity. We integrated dynamic lighting systems with raw industrial concrete and precision-milled aluminum to foster innovation through environment.',
      },
      {
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBy3ojPOJRsri6crpJYfpgA1Bp7cjr5d1T6BkbWn5U6W9YXO7waYT1L8ElGVnZAelAcw0jQCxj1cbbmcNNlU34qH-l_7IaYY81EwwdGrFgTWCQHpGaeW3yH_CZ8nrWPwih3mL3sUZIFkitnsWpWcD2pDKnX00oYnPHAq-S0J8g6B97i0kOJD53t3zzxLV74MqY7Fz69byrxDFBXQh_M2GV6T0C23Of4IvUykmlIrA1Yv1aBPbANKPFm7XyEPJwpuhK1_dXFQdXtKbI',
        location: 'Tokyo, Japan',
        year: '2023',
        title: 'The Linear Office',
        description:
          'Focusing on horizontal flow. This creative studio utilizes floor-to-ceiling glass and minimal partition walls to create a continuous, breathable environment for collaboration.',
      },
    ],
  },
];

export function PortfolioPage() {
  useHtmlScrollSnap('portfolio');
  useSectionScroll();
  const [galleryProject, setGalleryProject] = useState<string | null>(null);

  return (
    <main>
      {/* Hero Section */}
      <section className="px-[80px] snap-target pt-[160px] pb-[80px]">
        <div className="flex flex-col gap-unit">
          <span className="font-technical-label text-technical-label text-secondary uppercase tracking-[0.2em]">
            Portfolio — 2024
          </span>
          <h1 className="font-display-hero text-display-hero text-on-background">
            Architectural Narratives
          </h1>
        </div>
      </section>

      {CATEGORIES.map((category) => (
        <section key={category.id} className="snap-target pt-[80px] pb-[40px]">
          <div className="px-[80px] mb-8">
            <h2 className="text-secondary uppercase tracking-[0.4em] border-b border-secondary/20 pb-4 inline-block font-headline-md text-headline-md">
              {category.heading}
            </h2>
          </div>
          <Carousel
            carouselId={category.id}
            slides={category.slides}
            onViewProject={setGalleryProject}
          />
        </section>
      ))}

      <GalleryModal projectName={galleryProject} onClose={() => setGalleryProject(null)} />
    </main>
  );
}
