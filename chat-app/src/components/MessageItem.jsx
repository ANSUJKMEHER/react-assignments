import React from 'react';
import { ThumbsUp } from 'lucide-react';
import { getInitials, getUserColor, formatTime } from '../utils/avatarHelper';

export default function MessageItem({ message, onLike }) {
  const { id, user, text, timestamp, likes = 0 } = message;
  const initials = getInitials(user);
  const colorInfo = getUserColor(user);
  const formattedTime = formatTime(timestamp);

  // Render text with styled @mentions
  const renderMessageContent = (content) => {
    if (!content) return null;
    const parts = content.split(/(@[A-Za-z0-9_]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        return (
          <span key={index} className="mention-highlight">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <article className="message-item" data-message-id={id}>
      <div 
        className="user-avatar" 
        style={{ backgroundColor: colorInfo.avatarBg }}
        aria-hidden="true"
        title={user}
      >
        <span className="avatar-initials">{initials}</span>
      </div>

      <div className="message-body">
        <div className="message-meta">
          <span className="author-name">{user}</span>
          <time className="message-timestamp" dateTime={new Date(timestamp).toISOString()}>
            {formattedTime}
          </time>
        </div>

        <div className="message-content-row">
          <div className="message-bubble">
            <p className="message-text">{renderMessageContent(text)}</p>
          </div>

          <button
            type="button"
            className={`like-button ${likes > 0 ? 'liked' : ''}`}
            onClick={() => onLike(id)}
            aria-label={`Like message from ${user}, currently ${likes} likes`}
            title="Like this message"
          >
            <ThumbsUp size={15} className="like-icon" />
            <span className="like-count">{likes}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
