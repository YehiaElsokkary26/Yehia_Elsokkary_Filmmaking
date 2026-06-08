import { Instagram, Phone, Mail, ArrowUp, Linkedin } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const ContactSection = () => {
  return (
    <section className="relative overflow-hidden bg-card" id="contact">
      {/* Top rule */}
      <div className="section-rule" />

      <div className="section-padding pb-0">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="label-overline">Get in Touch</span>
            {/* Using Cormorant Garamond for typographic consistency with portfolio headings */}
            <h2 className="font-fashion-heading text-6xl md:text-8xl lg:text-9xl text-foreground mt-4 mb-3">
              Let's Create
            </h2>
            <p className="handwritten text-lg text-muted-foreground mb-10">your vision, my lens ✦</p>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-md mx-auto mb-12">
              Available for photography, videography, and film projects.
              Reach out to discuss your next creative endeavor.
            </p>
          </ScrollReveal>

          {/* Primary CTAs */}
          <ScrollReveal delay={280}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:yehia.elsokkary@gmail.com"
                className="btn-pill bg-accent text-accent-foreground hover:bg-accent/85"
              >
                <Mail size={14} />
                yehia.elsokkary@gmail.com
              </a>
              <a
                href="tel:+201550654567"
                className="btn-pill border border-border text-foreground/70 hover:border-accent hover:text-accent transition-colors"
              >
                <Phone size={14} />
                +20 155 065 4567
              </a>
            </div>
          </ScrollReveal>

          {/* Social links row */}
          <ScrollReveal delay={400}>
            <div className="flex items-center justify-center gap-10 mt-14">
              <a
                href="https://www.instagram.com/yehia.elsokkaryy?igsh=NWNwMTM1aDE2eTR0&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
                <span className="font-body text-[9px] tracking-[0.15em] uppercase">Instagram</span>
              </a>
              <a
                href="https://linkedin.com/in/yehia-elsokkary"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
                <span className="font-body text-[9px] tracking-[0.15em] uppercase">LinkedIn</span>
              </a>
              <a
                href="mailto:yehia.elsokkary@gmail.com"
                className="flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
                <span className="font-body text-[9px] tracking-[0.15em] uppercase">Email</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Footer bar */}
      <ScrollReveal delay={500}>
        <div className="border-t border-border mt-20 px-6 md:px-12 lg:px-24 py-8">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">
              © {new Date().getFullYear()} Yehia Elsokkary — All rights reserved
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-body text-[9px] tracking-[0.2em] uppercase text-muted-foreground/50 hover:text-accent transition-colors duration-300 flex items-center gap-2"
            >
              <ArrowUp size={10} />
              Back to Top
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default ContactSection;
