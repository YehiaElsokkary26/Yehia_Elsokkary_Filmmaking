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

      <div className="relative z-[2] text-primary-foreground px-6 py-20 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="editorial-heading text-4xl md:text-6xl lg:text-7xl text-studio-white/90 mb-4">
              Your Name Here
            </h2>
            <p className="handwritten text-lg text-studio-white/30">Photographer · Videographer · Filmmaker ✦</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-studio-white/10 pt-10">
            <div className="flex items-center gap-6">
              <a href="#contact" className="font-body text-xs font-bold tracking-[0.2em] uppercase text-accent hover:opacity-70 transition-opacity">
                Hire Me
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity" aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href="mailto:hello@yourname.com" className="opacity-50 hover:opacity-100 transition-opacity" aria-label="Email">
                <Mail size={18} />
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
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
