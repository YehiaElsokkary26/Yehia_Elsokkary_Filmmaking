import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PhotographyLanding from "./pages/PhotographyLanding";
import CategoryGallery from "./pages/CategoryGallery";
import VideoIndex from "./pages/VideoIndex";
import Filmmaking from "./pages/Filmmaking";
import BrandsAds from "./pages/BrandsAds";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/photography" element={<PhotographyLanding />} />
          <Route path="/photography/:category" element={<CategoryGallery />} />
          <Route path="/video/:type" element={<VideoIndex />} />
          <Route path="/filmmaking" element={<Filmmaking />} />
          <Route path="/brands" element={<BrandsAds />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
