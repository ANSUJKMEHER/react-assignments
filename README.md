# Exactspace Technologies – React Frontend Internship Assignments

This repository contains the independent implementations for the **Front End / UI Developer Internship** selection process at **Exactspace Technologies Pvt. Ltd., Bangalore**.

Exactspace specializes in AI technology for mission-critical industrial applications, enabling the real-time monitoring and operation of high-stress industrial machinery. This project delivers two production-quality single-page React applications built with strict adherence to the company's technical specifications and visual references.

---

## 🌐 Live Deployments

Both applications are configured for instant live evaluation:

- 🚀 **Combined Showcase Portal:** [https://ansujkmeher.github.io/react-assignments/](https://ansujkmeher.github.io/react-assignments/)
- 💬 **Live Chat Application:** [https://ansujkmeher.github.io/react-assignments/chat/](https://ansujkmeher.github.io/react-assignments/chat/)
- 🖼️ **Live Photo Gallery:** [https://ansujkmeher.github.io/react-assignments/gallery/](https://ansujkmeher.github.io/react-assignments/gallery/)

---

## Repository Structure & Overview

```text
react-assignments/
├── chat-app/                             # Assignment 1: Single-Page Team Chat Application
│   ├── assets/                           # Original visual reference GIF preserved
│   ├── reactjs_chat_assignment.md        # Original assignment specifications preserved
│   ├── package.json                      # Independent React + Vite environment
│   ├── vite.config.js                    # Vite bundler configuration
│   ├── server/                           # Real-Time WebSocket Server (Stretch Goal 3)
│   │   ├── index.js                      # Express + Socket.IO server
│   │   └── package.json
│   └── src/
│       ├── App.jsx                       # Main chat layout & state orchestration
│       ├── App.css                       # Scoped CSS matching Slack/Discord reference design
│       ├── components/
│       │   ├── ChatHeader.jsx            # Channel header, chatter topic, live sync badge
│       │   ├── MessageList.jsx           # Chronological thread with auto-scrolling
│       │   ├── MessageItem.jsx           # Avatar initials, bubble, @mentions, like counter
│       │   ├── ChatInput.jsx             # Text input, keyboard submit, triggers
│       │   ├── MentionDropdown.jsx       # Floating @mention autocomplete menu
│       │   └── EmojiPicker.jsx           # Quick emoji picker popover
│       ├── constants/
│       │   └── users.js                  # Mandatory user list: Alan, Bob, Carol, Dean, Elin
│       └── utils/
│           └── avatarHelper.js           # Initials generator and color mapping
│
└── photo-gallery/                        # Assignment 2: Infinite-Scroll Photo Gallery
    ├── photo-gallery.jpg                 # Original visual reference image preserved
    ├── photo-gallery.png                 # Original visual reference screenshot preserved
    ├── reactjs_photo_gallery_assignment.md # Original assignment specifications preserved
    ├── package.json                      # Independent React + Vite environment
    ├── vite.config.js                    # Vite config with CORS reverse proxy
    └── src/
        ├── App.jsx                       # Main gallery layout & infinite scroll orchestration
        ├── App.css                       # 1-column layout matching reference screenshot
        ├── components/
        │   ├── Header.jsx                # "Photo gallery" classic serif heading
        │   ├── PhotoList.jsx             # 1-column photo list & scroll sentinel
        │   ├── PhotoCard.jsx             # Image, author, FontAwesome thumbs-up & counter
        │   ├── SkeletonLoader.jsx        # Smooth shimmer loading state
        │   └── ErrorState.jsx            # API error banner with retry & demo data toggle
        ├── hooks/
        │   └── useInfiniteScroll.js      # Reusable IntersectionObserver hook
        └── services/
            ├── api.js                    # Picsum Photos API fetcher with timeout protection
            └── mockData.js               # Resilient offline dataset matching reference photos
```

---

## Assignment 1: React Team Chat Application (`chat-app/`)

### Objective
Create a single-page team chat application based on the provided reference (`team-chat-intro.gif`), featuring random user assignment, real-time message threading, interactive like reactions, and advanced chat utilities.

### Implemented Features
1. **Chat Header:**
   - Channel title: `Introductions`
   - Subtitle: `This Channel Is For Company Wide Chatter`
   - Participant counter (`5 | 100`) and live WebSocket connection indicator.
2. **Message Input & Submission:**
   - Input with placeholder `Type Message`.
   - Submit via `Enter` key or clicking the `Send` icon.
   - Whitespace trimming and empty-message submission prevention.
3. **Chronological Message Thread:**
   - User avatars with dynamic initials and distinct background colors.
   - Author name and formatted 24-hour timestamp (`HH:mm`).
   - Clean white message bubbles with subtle border and soft shadows.
   - Automatic smooth scroll to the latest message on submission.
4. **Random Username Assignment:**
   - Strictly draws from the mandatory user list:
     ```javascript
     const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
     ```
5. **Independent Like Counters:**
   - Every message features its own like button with an independent counter.
   - Functional state updates prevent race conditions and cross-item mutation.
6. **Stretch Goal 1 – Emoji Options:**
   - Integrated emoji picker popover with frequently used reactions (`👋`, `👏`, `👍`, `❤️`, `🔥`, `🚀`, `✨`, `🎉`, etc.).
   - Inserts selected emoji at current cursor position in the message box.
7. **Stretch Goal 2 – `@Mentions` Autocomplete:**
   - Typing `@` triggers an autocomplete dropdown displaying all available team members.
   - Supports keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`, `Tab`, `Escape`) or mouse click.
   - Selected users are inserted as `@Username` and rendered in the chat bubble as highlighted tags.
8. **Stretch Goal 3 – Real-Time WebSockets (Socket.IO):**
   - Express.js + Socket.IO server broadcast engine (`chat-app/server/`).
   - Multi-tab synchronization of chat messages and live like counts.
   - Graceful fallback: App operates in standalone local mode seamlessly if the WebSocket server is offline.

---

## Assignment 2: Infinite-Scroll Photo Gallery (`photo-gallery/`)

### Objective
Create a single-page infinite-scrolling photo gallery consuming paginated feeds from the Picsum Photos REST API (`https://picsum.photos/v2/list?page={page}&limit={limit}`), strictly replicating the 1-column layout of `photo-gallery.png`.

### Implemented Features
1. **Strict 1-Column Layout Replication:**
   - Preserves the exact visual reference layout (`photo-gallery.png` / `photo-gallery.jpg`).
   - Rectangular photo thumbnail on the **LEFT** (`240px × 160px`).
   - Horizontally aligned text on the **RIGHT**: `Author: {author}`.
   - Right-side classic bold serif heading: `Photo gallery`.
2. **Official FontAwesome Thumbs-Up Integration:**
   - Uses `@fortawesome/react-fontawesome` and `@fortawesome/free-solid-svg-icons` (`faThumbsUp`).
   - Styled with the authentic bright blue accent color (`#1877f2`) matching the reference image.
   - Independent like counter initialized to `0` that increments on every click.
3. **Infinite Scroll via `IntersectionObserver`:**
   - Sentinel element observed at the bottom of the feed with `250px` root margin for smooth prefetching.
   - Appends incoming pages (`page=1`, `page=2`, `page=3`, ...) without replacing earlier images.
   - Automatically halts pagination when the API returns an empty array.
   - Strict in-flight request guarding prevents duplicate or runaway fetch calls.
4. **Resilient Network & Error Handling:**
   - Built-in timeout protection (`AbortController`) against public API timeouts.
   - Error banner with an instant **Retry** button and clear diagnostic messages.
   - **Offline Demonstration Mode:** If the external Picsum Photos API experiences downtime or Cloudflare 522 timeouts, users can load the verified reference dataset matching the exact photos from `photo-gallery.png` (Alejandro Escamilla, Vadim Sherbakov, Alex, Daniel Genser, etc.) with a clear disclaimer.
   - Skeleton loading placeholders and broken image fallback handling.

---

## Getting Started & Execution Instructions

### Prerequisites
- Node.js (v18+ or v20+ recommended; verified on Node v26)
- npm (v9+ or v11+)

---

### Method A: Running from Root Directory

From the project root:

```bash
# 1. Run the Chat Application (Vite Frontend)
npm run dev:chat
# Accessible at: http://localhost:5173/

# 2. (Optional) Run the Chat WebSocket Server (for real-time multi-tab sync)
npm run start:chat-server
# Running at: http://localhost:5001/

# 3. Run the Photo Gallery (Vite Frontend)
npm run dev:gallery
# Accessible at: http://localhost:5174/
```

---

### Method B: Running Each Application Independently

#### 1. Running Chat App
```bash
cd chat-app
npm install
npm run dev
# Open http://localhost:5173 in your browser

# Optional: To start the Socket.IO server
cd server
npm install
npm start
```

#### 2. Running Photo Gallery
```bash
cd photo-gallery
npm install
npm run dev
# Open http://localhost:5174 in your browser
```

---

## Production Build Verification

Both applications can be compiled for production with zero errors:

```bash
# Build Chat App
cd chat-app
npm run build

# Build Photo Gallery
cd photo-gallery
npm run build
```

---

## Verification & Testing Summary

| Test Area | Scenarios Verified | Status |
|---|---|---|
| **Chat App: Submission** | Send via Enter key, Send button click, empty/whitespace prevention | **Passed** |
| **Chat App: Random Users** | Uniform random selection from `["Alan", "Bob", "Carol", "Dean", "Elin"]` | **Passed** |
| **Chat App: Likes** | Independent per-message counters, rapid multi-click increment | **Passed** |
| **Chat App: Emojis** | Popover palette toggle, cursor insertion, thread display | **Passed** |
| **Chat App: Mentions** | `@` trigger, suggestions menu, arrow keys/click selection, styled tag | **Passed** |
| **Chat App: Socket.IO** | Multi-tab message & like broadcasting with graceful offline fallback | **Passed** |
| **Gallery: 1-Column View** | Thumbnail on left, author & blue FontAwesome thumbs-up on right | **Passed** |
| **Gallery: Likes** | Independent counter per photo starting at 0, unaffected by other items | **Passed** |
| **Gallery: Pagination** | IntersectionObserver trigger, page incrementing, duplicate prevention | **Passed** |
| **Gallery: Resiliency** | Timeout handling, retry button, offline fallback toggle | **Passed** |
| **Responsive Design** | Desktop fidelity verified against references; mobile breakpoints verified | **Passed** |

---

## Submission Details

- **Candidate:** Ansuj K Meher
- **Role:** Front End / UI Developer Intern (8 Months, Onsite)
- **Company:** Exactspace Technologies Pvt. Ltd., Bangalore
- **Submission Repository:** `https://github.com/ANSUJKMEHER/react-assignments`
