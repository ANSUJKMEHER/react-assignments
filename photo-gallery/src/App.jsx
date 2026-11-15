import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import PhotoList from './components/PhotoList';
import ErrorState from './components/ErrorState';
import SkeletonLoader from './components/SkeletonLoader';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { fetchPhotos } from './services/api';
import { getFallbackPhotos } from './services/mockData';
import './App.css';

const ITEMS_PER_PAGE = 10;

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [likesMap, setLikesMap] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [isFallbackMode, setIsFallbackMode] = useState(false);

  // Guard against double invocation in React StrictMode
  const isFetchingRef = useRef(false);

  const loadPhotosForPage = useCallback(async (pageNum, useFallback = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      let newPhotos = [];
      if (useFallback) {
        newPhotos = getFallbackPhotos(pageNum);
      } else {
        newPhotos = await fetchPhotos(pageNum, ITEMS_PER_PAGE);
      }

      if (newPhotos.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prev) => {
          // Filter duplicates by id
          const existingIds = new Set(prev.map((p) => p.id));
          const uniqueNew = newPhotos.filter((p) => !existingIds.has(p.id));
          return [...prev, ...uniqueNew];
        });
        setPage(pageNum);
      }
    } catch (err) {
      setError(err.message || 'Failed to load photos');
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadPhotosForPage(1, isFallbackMode);
  }, [loadPhotosForPage, isFallbackMode]);

  // Load next page
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore && !error) {
      loadPhotosForPage(page + 1, isFallbackMode);
    }
  }, [isLoading, hasMore, error, page, isFallbackMode, loadPhotosForPage]);

  // Infinite scroll hook
  const sentinelRef = useInfiniteScroll(handleLoadMore, {
    hasMore,
    isLoading,
    rootMargin: '250px'
  });

  // Independent like increment
  const handleLike = useCallback((photoId) => {
    setLikesMap((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1
    }));
  }, []);

  // Retry primary API
  const handleRetry = () => {
    setIsFallbackMode(false);
    setError(null);
    const targetPage = photos.length === 0 ? 1 : page + 1;
    loadPhotosForPage(targetPage, false);
  };

  // Switch to fallback dataset
  const handleUseFallback = () => {
    setIsFallbackMode(true);
    setError(null);
    setPhotos([]);
    loadPhotosForPage(1, true);
  };

  return (
    <div className="gallery-page-container">
      {isFallbackMode && (
        <aside className="fallback-banner" role="status">
          <span>
            ℹ️ <strong>Offline Demonstration Mode:</strong> Displaying local verified photos due to Picsum Photos API unavailability.
          </span>
          <button type="button" className="btn-switch-live" onClick={handleRetry}>
            Try Live API
          </button>
        </aside>
      )}

      <div className="gallery-layout-grid">
        <main className="gallery-feed-wrapper">
          {error && photos.length === 0 ? (
            <ErrorState
              error={error}
              onRetry={handleRetry}
              onUseFallback={handleUseFallback}
            />
          ) : (
            <>
              {photos.length === 0 && isLoading ? (
                <SkeletonLoader count={4} />
              ) : (
                <PhotoList
                  photos={photos}
                  likesMap={likesMap}
                  onLike={handleLike}
                  sentinelRef={sentinelRef}
                  isLoading={isLoading}
                  hasMore={hasMore}
                  error={error}
                />
              )}

              {error && photos.length > 0 && (
                <div className="inline-pagination-error">
                  <p>{error}</p>
                  <button type="button" className="btn-retry-inline" onClick={handleRetry}>
                    Retry next page
                  </button>
                </div>
              )}
            </>
          )}
        </main>

        <aside className="gallery-header-column">
          <Header />
        </aside>
      </div>
    </div>
  );
}
