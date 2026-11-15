import React from 'react';

export default function SkeletonLoader({ count = 3 }) {
  return (
    <div className="skeleton-container" aria-label="Loading photos...">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="photo-card skeleton-card">
          <div className="photo-media-wrapper skeleton-box" />
          <div className="photo-info-wrapper">
            <div className="skeleton-line author-placeholder" />
            <div className="skeleton-line icon-placeholder" />
          </div>
        </div>
      ))}
    </div>
  );
}
