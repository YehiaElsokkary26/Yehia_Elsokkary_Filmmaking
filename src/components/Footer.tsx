import { Instagram, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0">
        <video
          src="/videos/reel-4.mp4"
          className="w-full h-full object-cover opacity-20"
          autoPlay muted loop playsInline
        />
        <div className="absolute inset-0 bg-foreground/90" />
      </div>

      <div className="relative z-[2] text-primary-foreground px-6 py-8 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="editorial-heading text-2xl md:text-3xl lg:text-4xl text-studio-white/90 mb-2">
              Yehia's Visuals
            </h2>
            <p className="handwritten text-sm text-studio-white/30">Photographer · Videographer · Filmmaker ✦</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-studio-white/10 pt-6">
            <div className="flex items-center gap-6">
              <a href="#contact" className="font-body text-xs font-bold tracking-[0.2em] uppercase text-accent hover:opacity-70 transition-opacity">
                Hire Me
              </a>
              <a href="https://www.instagram.com/yehia.elsokkaryy?igsh=NWNwMTM1aDE2eTR0&utm_source=qr" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="tel:+201550654567" className="opacity-50 hover:opacity-100 transition-opacity" aria-label="Phone">
                <Phone size={18} />
              </a>
            </div>

            <div className="flex gap-8 flex-wrap justify-center">
              {['Home', 'Work', 'Reels', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={item === 'Home' ? '#' : `#${item.toLowerCase()}`}
                  className="font-body text-[10px] opacity-30 hover:opacity-70 transition-opacity tracking-wider uppercase"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <p className="font-body text-[10px] opacity-20 tracking-wider text-center mt-10">
            © {new Date().getFullYear()} Yehia's Visuals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
