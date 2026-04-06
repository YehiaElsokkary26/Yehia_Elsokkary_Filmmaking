import { Megaphone, X } from 'lucide-react';
import { useState } from 'react';

const MarqueeStripBottom = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const message = "Available for bookings — Photography · Videography · Film ✦ Let's create together";

  return (
    <div className="relative bg-foreground text-primary-foreground overflow-hidden z-40">
      <div className="flex items-center">
        <div className="flex-1 overflow-hidden py-3 marquee-container" role="marquee" aria-live="off">
          <div className="marquee-content">
            {[0, 1].map((dup) => (
              <span key={dup} className="inline-flex items-center gap-8 px-8 whitespace-nowrap">
                <Megaphone size={12} className="text-accent shrink-0" />
                <span className="font-body text-xs font-semibold tracking-wider">{message}</span>
                <span className="text-accent text-xs">✦</span>
                <span className="font-body text-xs font-semibold tracking-wider">{message}</span>
                <span className="text-accent text-xs">✦</span>
              </span>
            ))}
          </div>
        </div>
        <button onClick={() => setVisible(false)} className="shrink-0 p-3 hover:text-accent transition-colors" aria-label="Dismiss">
          <X size={12} />
        </button>
      </div>
    </div>
  );
};

export default MarqueeStripBottom;
