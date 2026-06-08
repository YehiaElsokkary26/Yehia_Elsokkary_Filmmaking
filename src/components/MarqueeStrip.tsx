import { X } from 'lucide-react';
import { useState } from 'react';

const MarqueeStrip = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const message = 'Available for bookings — Photography · Videography · Film';

  return (
    <div className="relative bg-accent/10 border-y border-border overflow-hidden z-40">
      <div className="flex items-center">
        <div className="flex-1 overflow-hidden py-2.5 marquee-container" role="marquee" aria-live="off">
          <div className="marquee-content">
            {[0, 1].map((dup) => (
              <span key={dup} className="inline-flex items-center gap-10 px-10 whitespace-nowrap">
                <span className="text-accent text-[10px]">✦</span>
                <span className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/60">
                  {message}
                </span>
                <span className="text-accent text-[10px]">✦</span>
                <span className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/60">
                  Let's create together
                </span>
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 p-3 text-foreground/30 hover:text-foreground/60 transition-colors"
          aria-label="Dismiss"
        >
          <X size={11} />
        </button>
      </div>
    </div>
  );
};

export default MarqueeStrip;
