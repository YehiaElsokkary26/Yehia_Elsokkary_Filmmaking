import ScrollReveal from './ScrollReveal';
import { scatteredPolaroids } from '@/data/portfolioData';
import yehiaPortrait from '@/assets/yehia-portrait.webp';

const AboutSection = () => {
  return (
    <section className="section-padding relative overflow-hidden" id="about">
      {/* Atmospheric background — subtle warm radial glow instead of invisible video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_35%,hsl(38_52%_52%_/_0.07),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_80%,hsl(38_52%_52%_/_0.04),transparent_60%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          {/* ── Text column ───────────────────────────── */}
          <ScrollReveal variant="left" className="order-2 lg:order-1">
            <div className="editorial-divider !mx-0 mb-8" />
            <span className="label-overline">About Me</span>
            <h2 className="font-about text-5xl md:text-7xl lg:text-7xl text-foreground mt-4 mb-8 leading-tight">
              Behind<br />the Lens
            </h2>
            <p className="font-body text-foreground/65 leading-relaxed mb-5 text-base">
              I'm a visual storyteller based in Cairo. My work spans photography, videography, and filmmaking —
              always searching for the authentic moment, the raw emotion, the light that transforms an ordinary
              scene into something unforgettable.
            </p>
            <p className="font-body text-foreground/65 leading-relaxed mb-10 text-base">
              Whether it's a rooftop golden hour shoot, a cinematic music video, or a candid documentary piece,
              I bring the same dedication to every frame. Let's create something beautiful together.
            </p>
            <a
              href="#contact"
              className="btn-pill bg-accent text-accent-foreground hover:bg-accent/85"
            >
              Work With Me
            </a>
          </ScrollReveal>

          {/* ── Portrait column ────────────────────── */}
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

              {/* Scattered polaroid accents */}
              <div
                className="hidden lg:block absolute -top-10 -right-14 w-28 polaroid"
                style={{ transform: 'rotate(7deg)' }}
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={scatteredPolaroids[1].src}
                    alt={scatteredPolaroids[1].alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="polaroid-caption">{scatteredPolaroids[1].caption}</p>
              </div>

              <div
                className="hidden lg:block absolute -bottom-8 -left-12 w-24 polaroid"
                style={{ transform: 'rotate(-6deg)' }}
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={scatteredPolaroids[3].src}
                    alt={scatteredPolaroids[3].alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="polaroid-caption">{scatteredPolaroids[3].caption}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
