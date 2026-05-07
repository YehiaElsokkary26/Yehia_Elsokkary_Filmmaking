import { useRef, VideoHTMLAttributes } from 'react';

interface HoverVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  /** The element whose hover should trigger playback. Defaults to the video itself. */
  hoverTargetSelector?: string;
}

/**
 * Video that only plays while the user hovers over it (or its parent group).
 * On mobile (no hover), it stays paused on its poster frame to keep the page light.
 * Always muted + playsInline so it can resume instantly without user gesture.
 */
const HoverVideo = ({ hoverTargetSelector, className, ...props }: HoverVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    v.play().catch(() => {});
  };

  const pause = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    // reset so next hover starts fresh
    try { v.currentTime = 0; } catch { /* ignore */ }
  };

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
      {...props}
    />
  );
};

export default HoverVideo;
