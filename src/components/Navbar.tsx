import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { photographyCategories } from '@/data/portfolioData';

const navLinks = [
  { label: 'Work', path: '/#work' },
  { label: 'Photography', path: '/photography' },
  { label: 'Filmmaking', path: '/filmmaking' },
  { label: 'Brands', path: '/brands' },
  { label: 'Reels', path: '/#reels' },
  { label: 'About', path: '/#about' },
  { label: 'Contact', path: '/#contact' },
];

const Wordmark = ({ scrolled }: { scrolled: boolean }) => (
  <div className="flex flex-col leading-[1.05]">
    <span className={`font-heading text-[11px] tracking-[0.28em] uppercase transition-colors duration-300 ${scrolled ? 'text-foreground' : 'text-studio-white'}`}>
      YEHIA
    </span>
    <span className="font-heading text-[11px] tracking-[0.28em] uppercase text-accent">
      ELSOKKARY
    </span>
  </div>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [photoHover, setPhotoHover] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleNavClick = useCallback((path: string) => {
    setOpen(false);
    setPhotoHover(false);
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const isActive = (path: string) =>
    path !== '/' &&
    (location.pathname === path || (path !== '/#' && location.pathname.startsWith(path.replace('/#', '/'))));

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 lg:px-12">
          {/* Wordmark */}
          <Link to="/" onClick={() => handleNavClick('/')}>
            <Wordmark scrolled={scrolled} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.label === 'Photography' && setPhotoHover(true)}
                onMouseLeave={() => link.label === 'Photography' && setPhotoHover(false)}
              >
                <Link
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`font-body text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-accent'
                      : scrolled
                      ? 'text-foreground/50 hover:text-foreground'
                      : 'text-studio-white/55 hover:text-studio-white'
                  }`}
                >
                  {link.label}
                </Link>

                {/* Photography hover dropdown */}
                {link.label === 'Photography' && photoHover && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
                    <div className="bg-card border border-border rounded-lg shadow-lg p-4 flex gap-3 min-w-[300px]">
                      {photographyCategories.map((cat) => (
                        <Link
                          key={cat.slug}
                          to={`/photography/${cat.slug}`}
                          className="group flex-1 text-center"
                          onClick={() => setPhotoHover(false)}
                        >
                          <div className="polaroid !transform-none !p-1 !pb-5">
                            <div className="aspect-[3/4] overflow-hidden bg-muted">
                              <img
                                src={cat.thumbnail}
                                alt={cat.label}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <p className="polaroid-caption !text-[9px] !pt-1 !text-foreground/40">{cat.label.replace(' Photography', '')}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Hire Me CTA — always filled */}
          <Link
            to="/#contact"
            onClick={() => handleNavClick('/#contact')}
            className="hidden md:inline-flex items-center gap-2 font-body text-[10px] font-bold tracking-[0.22em] uppercase transition-all duration-300 rounded-full px-5 py-2 bg-accent text-accent-foreground hover:bg-accent/85"
          >
            Hire Me
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-1 transition-colors z-[51] relative ${scrolled || open ? 'text-foreground' : 'text-studio-white'}`}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[49] bg-background/98 backdrop-blur-md flex flex-col md:hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border/20">
            <div className="flex flex-col leading-[1.05]">
              <span className="font-heading text-[11px] tracking-[0.28em] uppercase text-foreground">YEHIA</span>
              <span className="font-heading text-[11px] tracking-[0.28em] uppercase text-accent">ELSOKKARY</span>
            </div>
          </div>

          {/* Nav links — vertically centered */}
          <div className="flex-1 flex flex-col justify-center px-8 gap-0">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`font-heading text-[clamp(28px,7vw,44px)] tracking-wide py-3 border-b border-border/20 transition-colors duration-200 ${
                  isActive(link.path) ? 'text-accent' : 'text-foreground/55 hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="px-8 pb-12 pt-6">
            <a
              href="/#contact"
              onClick={() => { setOpen(false); handleNavClick('/#contact'); }}
              className="btn-pill bg-accent text-accent-foreground w-full justify-center"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
