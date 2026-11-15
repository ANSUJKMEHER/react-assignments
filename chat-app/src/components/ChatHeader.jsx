import React from 'react';
import { Users, Wifi, WifiOff } from 'lucide-react';

export default function ChatHeader({ memberCount = 100, activeCount = 5, isConnected = false }) {
  return (
    <header className="chat-header">
      <div className="header-left">
        <h1 className="channel-title">Introductions</h1>
        <p className="channel-subtitle">This Channel Is For Company Wide Chatter</p>
      </div>
      <div className="header-right">
        <div className="connection-pill" title={isConnected ? "WebSocket connected" : "Local mode active"}>
          {isConnected ? (
            <>
              <Wifi size={14} className="status-icon connected" />
              <span className="status-text">Live Sync</span>
            </>
          ) : (
            <>
              <span className="status-dot-local" />
              <span className="status-text">Stand-alone Mode</span>
            </>
          )}
        </div>
        <div className="member-counter" title="Active users in channel">
          <span className="counter-text">{activeCount} | {memberCount}</span>
          <Users size={18} className="users-icon" />
        </div>
      </div>
    </header>
  );
}
