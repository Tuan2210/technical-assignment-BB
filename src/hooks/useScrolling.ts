/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from "react";

interface UseScrollingOptions {
  isLoading: boolean;
  hasMore: boolean;
  onIntersect: () => void; // callback when the target is intersecting
}

/**
 * Custom hook handle infinite scrolling
 */
const useScrolling = ({
  isLoading,
  hasMore,
  onIntersect,
}: UseScrollingOptions) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        onIntersect();
      }
    };

    observer.current = new IntersectionObserver(callback);

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current && lastElementRef.current) {
        observer.current.unobserve(lastElementRef.current);
      }
    };
  }, [isLoading, hasMore, onIntersect]);

  return lastElementRef;
};

export default useScrolling;
