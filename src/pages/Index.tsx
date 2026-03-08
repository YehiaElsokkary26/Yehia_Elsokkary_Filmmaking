import HeroVideo from '@/components/HeroVideo';
import MarqueeStrip from '@/components/MarqueeStrip';
import FeaturedWork from '@/components/FeaturedWork';
import AboutSection from '@/components/AboutSection';
import VideoShowcase from '@/components/VideoShowcase';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <main>
      <HeroVideo />
      <MarqueeStrip />
      <FeaturedWork />
      <AboutSection />
      <VideoShowcase />
      <ContactSection />
    </main>
  );
};

export default Index;
