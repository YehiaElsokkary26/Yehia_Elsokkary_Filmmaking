import ScrollReveal from './ScrollReveal';
import { scatteredPolaroids } from '@/data/portfolioData';
import yehiaPortrait from '@/assets/yehia-portrait.png';

const AboutSection = () => {
  return (
    <section className="section-padding relative overflow-hidden" id="about">
      {/* Video background with 75% opacity */}
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/about-bg.mp4"
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-background/75" />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <ScrollReveal variant="left" className="order-2 lg:order-1">
            <div className="editorial-divider !mx-0 mb-8" />
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-5 font-semibold">About Me</p>
            <h2 className="font-about text-4xl md:text-6xl lg:text-7xl text-foreground mb-8 leading-tight">
              Behind<br />the Lens
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6 text-base">
              I'm a visual storyteller based in Cairo. My work spans photography, videography, and filmmaking — 
              always searching for the authentic moment, the raw emotion, the light that transforms an ordinary 
              scene into something unforgettable.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-10 text-base">
              Whether it's a rooftop golden hour shoot, a cinematic music video, or a candid documentary piece, 
              I bring the same dedication to every frame. Let's create something beautiful together.
            </p>
            <a
              href="#contact"
              className="btn-pill border-2 text-primary-foreground"
              style={{ backgroundColor: 'hsl(var(--burgundy))', borderColor: 'hsl(var(--burgundy))' }}
            >
              Work With Me
            </a>
          </ScrollReveal>
          <ScrollReveal variant="right" className="order-1 lg:order-2">
            <div className="relative">
              <div className="film-frame-border">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={yehiaPortrait}
                    alt="Yehia — photographer portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Scattered polaroids around the about video */}
              <div className="hidden lg:block absolute -top-8 -right-16 w-28 polaroid" style={{ transform: 'rotate(8deg)' }}>
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img src={scatteredPolaroids[1].src} alt={scatteredPolaroids[1].alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="polaroid-caption !text-[9px]">{scatteredPolaroids[1].caption}</p>
              </div>
              <div className="hidden lg:block absolute -bottom-6 -left-14 w-24 polaroid" style={{ transform: 'rotate(-6deg)' }}>
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img src={scatteredPolaroids[3].src} alt={scatteredPolaroids[3].alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="polaroid-caption !text-[9px]">{scatteredPolaroids[3].caption}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
