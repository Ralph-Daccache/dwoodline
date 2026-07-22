import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from '@/layouts/SiteLayout';
import { ROUTES } from '@/config/routes';
import { HomePage } from '@/pages/Home/HomePage';
import { HeritagePage } from '@/pages/Heritage/HeritagePage';
import { ExpertisePage } from '@/pages/Expertise/ExpertisePage';
import { PortfolioPage } from '@/pages/Portfolio/PortfolioPage';
import { InquiryPage } from '@/pages/Inquiry/InquiryPage';

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.heritage} element={<HeritagePage />} />
          <Route path={ROUTES.expertise} element={<ExpertisePage />} />
          <Route path={ROUTES.portfolio} element={<PortfolioPage />} />
          <Route path={ROUTES.inquiry} element={<InquiryPage />} />
          <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
