import React, { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import { getRandomUser, USER_LIST } from './constants/users';
import './App.css';

// Initial messages closely mirroring the team-chat reference GIF
const INITIAL_MESSAGES = [
  {
    id: 'seed-1',
    user: 'Alan',
    text: 'Welcome to Team Chat. 👋👋 Send a message now to start interacting with other users in the app. ⬇️',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    likes: 2
  },
  {
    id: 'seed-2',
    user: 'Bob',
    text: 'Hey everyone!',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    likes: 1
  },
  {
    id: 'seed-3',
    user: 'Carol',
    text: 'Oh hi, Bob! Elin and Dean are around, too...',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    likes: 0
  }
];

export default function App() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineCount, setOnlineCount] = useState(USER_LIST.length);

  // Initialize optional Socket.IO connection for real-time multi-tab chatter
  useEffect(() => {
    let socketInstance = null;
    try {
      socketInstance = io('http://localhost:5001', {
        autoConnect: true,
        reconnectionAttempts: 3,
        timeout: 2000
      });

      socketInstance.on('connect', () => {
        setIsConnected(true);
      });

      socketInstance.on('disconnect', () => {
        setIsConnected(false);
      });

      socketInstance.on('clients_count', (count) => {
        setOnlineCount(Math.max(count, USER_LIST.length));
      });

      // Receive broadcasted message from other tabs
      socketInstance.on('chat_message', (incomingMsg) => {
        setMessages((prev) => {
          // Avoid duplicate insertion
          if (prev.some((m) => m.id === incomingMsg.id)) {
            return prev;
          }
          return [...prev, incomingMsg];
        });
      });

      // Receive broadcasted like updates
      socketInstance.on('like_message', ({ messageId, likes }) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === messageId ? { ...m, likes } : m))
        );
      });

      setSocket(socketInstance);
    } catch {
      // Graceful fallback to standalone local state mode
      setIsConnected(false);
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  // Send message handler with mandatory random user assignment
  const handleSendMessage = useCallback(
    (text) => {
      const randomUser = getRandomUser(); // Mandatory: Alan, Bob, Carol, Dean, Elin
      const newMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        user: randomUser,
        text,
        timestamp: new Date().toISOString(),
        likes: 0
      };

      // Update local state immediately
      setMessages((prev) => [...prev, newMessage]);

      // Broadcast if socket connected
      if (socket && isConnected) {
        socket.emit('chat_message', newMessage);
      }
    },
    [socket, isConnected]
  );

  // Independent like increment handler
  const handleLikeMessage = useCallback(
    (messageId) => {
      let updatedLikes = 0;

      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === messageId) {
            updatedLikes = (msg.likes || 0) + 1;
            return { ...msg, likes: updatedLikes };
          }
          return msg;
        })
      );

      // Broadcast like change cleanly outside state updater
      if (socket && isConnected) {
        socket.emit('like_message', { messageId, likes: updatedLikes });
      }
    },
    [socket, isConnected]
  );

  return (
    <div className="chat-app-root">
      <div className="chat-app-window">
        <ChatHeader
          memberCount={100}
          activeCount={onlineCount}
          isConnected={isConnected}
        />
        <MessageList messages={messages} onLike={handleLikeMessage} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
