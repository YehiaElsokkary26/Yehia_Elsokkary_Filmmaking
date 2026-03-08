import ScrollReveal from './ScrollReveal';

const AboutSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden paper-texture" id="about">
      <div className="max-w-6xl mx-auto">
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
              className="btn-pill border-2 border-foreground/20 text-foreground hover:bg-foreground hover:text-primary-foreground"
            >
              Work With Me
            </a>
          </ScrollReveal>
          <ScrollReveal variant="right" className="order-1 lg:order-2">
            <div className="film-frame-border">
              <div className="aspect-[4/5] overflow-hidden relative">
                <video
                  src="/videos/reel-2.mp4"
                  className="w-full h-full object-cover"
                  muted loop playsInline autoPlay
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
