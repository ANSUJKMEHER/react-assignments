import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to manage infinite scroll using IntersectionObserver
 * @param {Function} callback Function invoked when sentinel intersects
 * @param {Object} options Configuration options: hasMore, isLoading, rootMargin, threshold
 */
export function useInfiniteScroll(callback, { hasMore = true, isLoading = false, rootMargin = '200px', threshold = 0.1 } = {}) {
  const sentinelRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !isLoading) {
        callback();
      }
    },
    [callback, hasMore, isLoading]
  );

  useEffect(() => {
    const element = sentinelRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null, // viewport
      rootMargin,
      threshold
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [handleObserver, rootMargin, threshold]);

  return sentinelRef;
}
