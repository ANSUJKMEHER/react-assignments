import React from 'react';

export default function ErrorState({ error, onRetry, onUseFallback }) {
  return (
    <div className="gallery-error-banner" role="alert">
      <div className="error-icon" aria-hidden="true">⚠️</div>
      <div className="error-content">
        <h2 className="error-heading">Unable to Load Photos from API</h2>
        <p className="error-description">{error}</p>
        <div className="error-actions">
          <button type="button" className="btn-retry" onClick={onRetry}>
            🔄 Retry API Connection
          </button>
          {onUseFallback && (
            <button type="button" className="btn-fallback" onClick={onUseFallback}>
              📁 Load Offline Demo Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
