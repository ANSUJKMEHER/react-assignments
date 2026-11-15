import React from 'react';
import PhotoCard from './PhotoCard';
import SkeletonLoader from './SkeletonLoader';

export default function PhotoList({
  photos,
  likesMap,
  onLike,
  sentinelRef,
  isLoading,
  hasMore,
  error
}) {
  return (
    <div className="photo-list-column">
      {photos.map((photo) => (
        <PhotoCard
          key={`${photo.id}-${photo.author}`}
          photo={photo}
          likes={likesMap[photo.id] || 0}
          onLike={onLike}
        />
      ))}

      {photos.length === 0 && !isLoading && !error && (
        <div className="empty-gallery-notice">
          <p>No photos available to display.</p>
        </div>
      )}

      {isLoading && <SkeletonLoader count={2} />}

      {!hasMore && photos.length > 0 && (
        <div className="end-of-gallery-notice">
          <span>✓ You have reached the end of the photo gallery.</span>
        </div>
      )}

      {/* Sentinel element observed by IntersectionObserver */}
      {hasMore && !error && (
        <div ref={sentinelRef} className="infinite-scroll-sentinel" aria-hidden="true" />
      )}
    </div>
  );
}
