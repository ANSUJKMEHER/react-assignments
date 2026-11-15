import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

export default function PhotoCard({ photo, likes = 0, onLike }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Resize URL for fast loading if original is huge (Picsum URLs often default to 5000px, but Picsum supports /id/{id}/450/300)
  const getOptimizedImageUrl = (item) => {
    if (!item.download_url) return '';
    if (item.download_url.includes('picsum.photos/id/')) {
      return `https://picsum.photos/id/${item.id}/450/300`;
    }
    return item.download_url;
  };

  const initialUrl = getOptimizedImageUrl(photo);
  const [currentSrc, setCurrentSrc] = useState(initialUrl);

  return (
    <article className="photo-card" data-photo-id={photo.id}>
      <div className="photo-media-wrapper">
        {!imageLoaded && !imageError && (
          <div className="photo-skeleton" aria-hidden="true" />
        )}

        {imageError ? (
          <div className="photo-fallback">
            <span>Image unavailable</span>
          </div>
        ) : (
          <img
            src={currentSrc}
            alt={`Photo taken by ${photo.author}`}
            className={`photo-image ${imageLoaded ? 'loaded' : ''}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              // If optimized URL fails, try raw download_url as fallback
              if (currentSrc !== photo.download_url && photo.download_url) {
                setCurrentSrc(photo.download_url);
              } else {
                setImageError(true);
              }
            }}
          />
        )}
      </div>

      <div className="photo-info-wrapper">
        <span className="photo-author">
          Author: {photo.author}
        </span>

        <button
          type="button"
          className="thumbs-up-btn"
          onClick={() => onLike(photo.id)}
          aria-label={`Like photo by ${photo.author}. Current count: ${likes}`}
          title="Thumbs up"
        >
          <FontAwesomeIcon icon={faThumbsUp} className="thumbs-up-icon" />
          <span className="thumbs-up-count">{likes}</span>
        </button>
      </div>
    </article>
  );
}
