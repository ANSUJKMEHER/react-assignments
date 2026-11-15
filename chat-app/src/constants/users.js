// Mandatory user list per assignment specifications
export const USER_LIST = ["Alan", "Bob", "Carol", "Dean", "Elin"];

// Consistent avatar background colors matching team chat references
export const USER_COLORS = {
  Alan: {
    bg: "#e0e7ff",
    text: "#3730a3",
    avatarBg: "#4f46e5"
  },
  Bob: {
    bg: "#dcfce7",
    text: "#166534",
    avatarBg: "#16a34a"
  },
  Carol: {
    bg: "#ffedd5",
    text: "#9a3412",
    avatarBg: "#ea580c"
  },
  Dean: {
    bg: "#f3e8ff",
    text: "#6b21a8",
    avatarBg: "#9333ea"
  },
  Elin: {
    bg: "#ffe4e6",
    text: "#9f1239",
    avatarBg: "#e11d48"
  }
};

/**
 * Randomly pick a username from the mandatory user list
 */
export function getRandomUser() {
  const index = Math.floor(Math.random() * USER_LIST.length);
  return USER_LIST[index];
}
