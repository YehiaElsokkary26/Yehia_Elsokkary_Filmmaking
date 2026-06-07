/**
 * Enhanced video poster resolution utility
 * with caching and intelligent fallbacks
 */

// Cache for poster URLs to avoid repeated string operations
const posterCache = new Map<string, string>();

export const getVideoPoster = (src: string): string | undefined => {
  // Check cache first
  if (posterCache.has(src)) {
    return posterCache.get(src);
  }

  const fileName = src.split('/').pop()?.replace(/\.mp4$/i, '.jpg');
  const posterUrl = fileName ? `/video-posters/${fileName}` : undefined;
  
  // Cache the result
  if (posterUrl) {
    posterCache.set(src, posterUrl);
  }
  
  return posterUrl;
};

/**
 * Preload video poster image for better performance
 * Loads image resource in background
 */
export const preloadPoster = (src: string): void => {
  const posterUrl = getVideoPoster(src);
  if (!posterUrl) return;

  // Don't preload if already cached
  if (posterCache.has(src)) return;

  const img = new Image();
  img.src = posterUrl;
};

/**
 * Generate responsive video sources for different formats
 * Supports both MP4 (H.264) and WebM (VP9) for browser compatibility
 */
export const getVideoSources = (
  baseSrc: string
): Array<{ src: string; type: string; codec?: string }> => {
  const fileName = baseSrc.split('/').pop()?.replace(/\.mp4$/i, '');
  if (!fileName) return [];

  return [
    // WebM for modern browsers (better compression)
    {
      src: `/videos/${fileName}.webm`,
      type: 'video/webm',
      codec: 'vp9',
    },
    // MP4 fallback for older browsers
    {
      src: `/videos/${fileName}.mp4`,
      type: 'video/mp4',
      codec: 'h264',
    },
  ];
};

/**
 * Batch load video posters for performance
 * Useful when you know you'll need multiple posters
 */
export const preloadPosters = (sources: string[]): Promise<void[]> => {
  return Promise.all(
    sources.map(
      (src) =>
        new Promise<void>((resolve) => {
          const posterUrl = getVideoPoster(src);
          if (!posterUrl) {
            resolve();
            return;
          }

          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Resolve even on error
          img.src = posterUrl;
        })
    )
  );
};

/**
 * Get optimal video quality based on connection speed
 * Uses Network Information API if available
 */
export const getOptimalVideoQuality = (): 'low' | 'medium' | 'high' => {
  if (typeof navigator === 'undefined') return 'medium';

  // Network Information API
  const connection = (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  if (!connection) return 'medium';

  const effectiveType = connection.effectiveType;
  const downlink = connection.downlink || 0;

  // 4g + good downlink = high quality
  if (effectiveType === '4g' && downlink > 2) return 'high';
  // 3g or slow connection = low quality
  if (effectiveType === '3g' || effectiveType === '2g') return 'low';

  return 'medium';
};
