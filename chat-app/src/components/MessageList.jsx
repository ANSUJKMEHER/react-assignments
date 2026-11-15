import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

export default function MessageList({ messages, onLike }) {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);
  const isFirstRender = useRef(true);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (bottomRef.current) {
      if (isFirstRender.current) {
        bottomRef.current.scrollIntoView({ behavior: 'auto' });
        isFirstRender.current = false;
      } else {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages.length]);

  return (
    <main className="message-list-container" ref={containerRef} aria-label="Chat messages thread">
      {messages.length === 0 ? (
        <div className="empty-chat-state">
          <p className="empty-title">Welcome to #Introductions</p>
          <p className="empty-desc">This is the start of the Introductions channel. Send a message to begin conversation!</p>
        </div>
      ) : (
        <div className="messages-thread">
          {messages.map((msg) => (
            <MessageItem key={msg.id} message={msg} onLike={onLike} />
          ))}
          <div ref={bottomRef} className="scroll-sentinel" aria-hidden="true" />
        </div>
      )}
    </main>
  );
}
