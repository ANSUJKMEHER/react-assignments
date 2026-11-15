import React, { useState, useRef, useEffect } from 'react';
import { Smile, Send } from 'lucide-react';
import EmojiPicker from './EmojiPicker';
import MentionDropdown from './MentionDropdown';
import { USER_LIST } from '../constants/users';

export default function ChatInput({ onSendMessage, disabled = false }) {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mentionQuery, setMentionQuery] = useState(null); // string or null
  const [mentionStartIndex, setMentionStartIndex] = useState(-1);
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);

  const inputRef = useRef(null);

  // Filter users based on query
  const filteredUsers = mentionQuery !== null
    ? USER_LIST.filter(u => u.toLowerCase().startsWith(mentionQuery.toLowerCase()))
    : [];

  const handleInputChange = (e) => {
    const value = e.target.value;
    const cursorPos = e.target.selectionStart;
    setText(value);

    // Check for @mention trigger
    const textBeforeCursor = value.slice(0, cursorPos);
    const lastAtPos = textBeforeCursor.lastIndexOf('@');

    if (lastAtPos !== -1) {
      // Check that @ is at start of string or preceded by whitespace
      const charBeforeAt = lastAtPos > 0 ? textBeforeCursor[lastAtPos - 1] : ' ';
      const textAfterAt = textBeforeCursor.slice(lastAtPos + 1);

      // If no space between @ and cursor, it's an active mention query
      if (/\s/.test(charBeforeAt) && !/\s/.test(textAfterAt)) {
        setMentionStartIndex(lastAtPos);
        setMentionQuery(textAfterAt);
        setSelectedMentionIndex(0);
        return;
      }
    }

    setMentionQuery(null);
    setMentionStartIndex(-1);
  };

  const insertMention = (username) => {
    if (mentionStartIndex === -1) return;

    const before = text.slice(0, mentionStartIndex);
    const after = text.slice(inputRef.current ? inputRef.current.selectionStart : text.length);
    const newText = `${before}@${username} ${after}`;

    setText(newText);
    setMentionQuery(null);
    setMentionStartIndex(-1);

    // Re-focus and set cursor position
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const newCursorPos = before.length + username.length + 2;
        inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 10);
  };

  const handleSelectEmoji = (emoji) => {
    const input = inputRef.current;
    if (!input) {
      setText(prev => prev + emoji);
      return;
    }

    const start = input.selectionStart || text.length;
    const end = input.selectionEnd || text.length;
    const updated = text.substring(0, start) + emoji + text.substring(end);
    setText(updated);

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 10);
  };

  const handleKeyDown = (e) => {
    // Handle mention navigation
    if (mentionQuery !== null && filteredUsers.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedMentionIndex((prev) => (prev + 1) % filteredUsers.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedMentionIndex((prev) => (prev - 1 + filteredUsers.length) % filteredUsers.length);
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        insertMention(filteredUsers[selectedMentionIndex]);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setMentionQuery(null);
        return;
      }
    }

    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;

    onSendMessage(trimmed);
    setText('');
    setMentionQuery(null);
    setMentionStartIndex(-1);
    setShowEmojiPicker(false);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <footer className="chat-input-wrapper">
      {mentionQuery !== null && filteredUsers.length > 0 && (
        <MentionDropdown
          users={filteredUsers}
          selectedIndex={selectedMentionIndex}
          onSelectUser={insertMention}
          onClose={() => setMentionQuery(null)}
        />
      )}

      {showEmojiPicker && (
        <EmojiPicker
          onSelectEmoji={handleSelectEmoji}
          onClose={() => setShowEmojiPicker(false)}
        />
      )}

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            className="chat-text-input"
            placeholder="Type Message"
            value={text}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-label="Type message"
            autoComplete="off"
          />

          <div className="input-actions">
            <button
              type="button"
              className={`action-btn emoji-trigger ${showEmojiPicker ? 'active' : ''}`}
              onClick={() => setShowEmojiPicker(prev => !prev)}
              aria-label="Open emoji picker"
              title="Add Emoji"
            >
              <Smile size={20} />
            </button>

            <button
              type="submit"
              className={`action-btn send-btn ${text.trim() ? 'active' : ''}`}
              disabled={!text.trim() || disabled}
              aria-label="Send message"
              title="Send Message (Enter)"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </form>
    </footer>
  );
}
