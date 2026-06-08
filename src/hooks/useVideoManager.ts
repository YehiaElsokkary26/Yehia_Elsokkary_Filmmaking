import { useEffect, useRef, useCallback } from 'react';

interface VideoManagerOptions {
  autoPlayOnIntersect?: boolean;
  pauseOnLeave?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
}

export const globalVideoPlaybackManager = {
  activeVideo: null as HTMLVideoElement | null,
  pause() {
    if (this.activeVideo && !this.activeVideo.paused) {
      this.activeVideo.pause();
      this.activeVideo = null;
    }
  },
  setActive(video: HTMLVideoElement) {
    if (this.activeVideo && this.activeVideo !== video) {
      this.pause();
    }
    this.activeVideo = video;
  },
};

/**
 * Hook to manage video playback with Intersection Observer
 * Prevents multiple videos from playing simultaneously
 * Automatically pauses videos outside viewport
 * Lazy loads video metadata
 */
export const useVideoManager = (
  videoRef: React.RefObject<HTMLVideoElement>,
  options: VideoManagerOptions = {}
) => {
  const {
    autoPlayOnIntersect = false,
    pauseOnLeave = true,
    rootMargin = '50px',
    threshold = 0.25,
  } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const isInViewport = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewport.current = entry.isIntersecting;

        if (prefersReduced) return;

        if (entry.isIntersecting) {
          // Load video metadata when entering viewport
          if (video.readyState === 0) {
            video.load();
          }
          if (autoPlayOnIntersect && video.paused) {
            video.play().catch(() => {
              // Autoplay prevented by browser
            });
          }
        } else if (pauseOnLeave && !video.paused) {
          // Pause and pause when leaving viewport
          globalVideoPlaybackManager.pause();
          video.currentTime = 0;
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(video);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
      // Cleanup when component unmounts
      if (!video.paused) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, [autoPlayOnIntersect, pauseOnLeave, rootMargin, threshold]);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    globalVideoPlaybackManager.setActive(video);
    video.play().catch(() => {});
  }, []);

  const pause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (globalVideoPlaybackManager.activeVideo === video) {
      globalVideoPlaybackManager.pause();
    }
    video.pause();
  }, []);

  const reset = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }, []);

  return {
    play,
    pause,
    reset,
    isInViewport: isInViewport.current,
  };
};
