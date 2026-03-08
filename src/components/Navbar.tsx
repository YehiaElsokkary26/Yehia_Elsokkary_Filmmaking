import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/#work' },
  { label: 'Reels', path: '/#reels' },
  { label: 'About', path: '/#about' },
  { label: 'Contact', path: '/#contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (path: string) => {
    setOpen(false);
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-background/95 backdrop-blur-md border-b border-border/20'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => handleNavClick(link.path)}
              className={`font-body text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
                scrolled
                  ? (location.pathname === link.path ? 'text-foreground' : 'text-muted-foreground hover:text-foreground')
                  : (location.pathname === link.path ? 'text-studio-white' : 'text-studio-white/60 hover:text-studio-white')
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/#contact"
          onClick={() => handleNavClick('/#contact')}
          className={`hidden md:block font-body text-[11px] font-bold tracking-[0.2em] uppercase transition-colors ${
            scrolled ? 'text-primary hover:text-primary/70' : 'text-accent hover:text-accent/70'
          }`}
        >
          Hire Me
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden transition-colors ${scrolled ? 'text-foreground' : 'text-studio-white'}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border/20 animate-fade-in">
          <div className="flex flex-col px-6 py-8 gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleNavClick(link.path)}
                className="font-heading text-2xl tracking-wide text-muted-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
