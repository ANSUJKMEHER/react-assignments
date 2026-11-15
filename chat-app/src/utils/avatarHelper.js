import { USER_COLORS } from "../constants/users.js";

export function getInitials(name) {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function getUserColor(name) {
  if (USER_COLORS[name]) {
    return USER_COLORS[name];
  }
  return {
    bg: "#f1f5f9",
    text: "#334155",
    avatarBg: "#64748b"
  };
}

export function formatTime(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (isNaN(date.getTime())) {
    return "";
  }
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}
