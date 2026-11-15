import React, { useEffect, useRef } from 'react';

const COMMON_EMOJIS = [
  "👋", "👏", "👍", "❤️", "🔥", "🚀", "✨", "🎉",
  "😊", "😂", "😃", "🤔", "🙌", "💯", "🌟", "💡",
  "😎", "🥳", "🤝", "💪", "⚡", "🎯", "☕", "💻"
];

export default function EmojiPicker({ onSelectEmoji, onClose }) {
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose();
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="emoji-picker-popover" ref={containerRef} role="dialog" aria-label="Emoji Picker">
      <div className="emoji-picker-header">
        <span className="emoji-picker-title">Frequently Used</span>
      </div>
      <div className="emoji-grid">
        {COMMON_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            className="emoji-btn"
            onClick={() => onSelectEmoji(emoji)}
            title={`Insert ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
