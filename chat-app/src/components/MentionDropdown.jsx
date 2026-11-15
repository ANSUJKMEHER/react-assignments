import React, { useEffect, useRef } from 'react';
import { getInitials, getUserColor } from '../utils/avatarHelper';

export default function MentionDropdown({ users, selectedIndex, onSelectUser, onClose }) {
  const listRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (listRef.current && !listRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!users || users.length === 0) return null;

  return (
    <div className="mention-dropdown" ref={listRef} role="listbox" aria-label="Mention User Suggestions">
      <div className="mention-header">Mention Member</div>
      {users.map((username, index) => {
        const color = getUserColor(username);
        const initials = getInitials(username);
        const isSelected = index === selectedIndex;

        return (
          <div
            key={username}
            className={`mention-option ${isSelected ? 'active' : ''}`}
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelectUser(username)}
            onMouseDown={(e) => e.preventDefault()} // Keep input focus
          >
            <div 
              className="mention-avatar" 
              style={{ backgroundColor: color.avatarBg }}
              aria-hidden="true"
            >
              <span>{initials}</span>
            </div>
            <div className="mention-details">
              <span className="mention-name">{username}</span>
              <span className="mention-handle">@{username.toLowerCase()}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
