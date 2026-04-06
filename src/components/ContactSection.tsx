import { Instagram, Phone } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const ContactSection = () => {
  return (
    <section className="relative overflow-hidden" id="contact">
      {/* Full-page video background at 50% opacity */}
      <video
        src="/videos/upload-2.mp4"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        autoPlay muted loop playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-background/40" />

      <div className="relative z-10 section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="editorial-divider mb-8" />
            <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-5">Get in Touch</p>
            <h2 className="editorial-heading text-5xl md:text-7xl lg:text-8xl text-foreground mb-6">Let's Create</h2>
            <p className="handwritten text-lg text-muted-foreground mb-10">your vision, my lens ✦</p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="font-body text-muted-foreground text-base leading-relaxed max-w-lg mx-auto mb-12">
              Available for photography, videography, and film projects. 
              Reach out to discuss your next creative endeavor.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex items-center justify-center gap-6">
              <a href="tel:+201550654567" className="btn-pill text-primary-foreground hover:opacity-90" style={{ backgroundColor: 'hsl(var(--burgundy))' }}>
                <Phone size={16} className="inline mr-2" />
                +20 155 065 4567
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex items-center justify-center gap-8 mt-12">
              <a href="https://www.instagram.com/yehia.elsokkaryy?igsh=NWNwMTM1aDE2eTR0&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={22} />
              </a>
              <a href="tel:+201550654567" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Phone">
                <Phone size={22} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
