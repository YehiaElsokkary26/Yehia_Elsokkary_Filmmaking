import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Code-split every page — only the current route's JS is downloaded
const Index = lazy(() => import('./pages/Index'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PhotographyLanding = lazy(() => import('./pages/PhotographyLanding'));
const CategoryGallery = lazy(() => import('./pages/CategoryGallery'));
const VideoIndex = lazy(() => import('./pages/VideoIndex'));
const Filmmaking = lazy(() => import('./pages/Filmmaking'));
const BrandsAds = lazy(() => import('./pages/BrandsAds'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/photography" element={<PhotographyLanding />} />
            <Route path="/photography/:category" element={<CategoryGallery />} />
            <Route path="/video/:type" element={<VideoIndex />} />
            <Route path="/filmmaking" element={<Filmmaking />} />
            <Route path="/brands" element={<BrandsAds />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
