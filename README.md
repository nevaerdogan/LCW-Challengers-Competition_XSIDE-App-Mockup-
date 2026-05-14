# XSIDE - Mobile App Mockup

A fully interactive, web-based iPhone mockup for **XSIDE** — a fashion & lifestyle app concept designed for Gen Z shoppers. The prototype runs entirely in the browser inside a pixel-accurate iPhone frame and covers the complete user journey: onboarding, discovery, gamified engagement, and checkout.

> **Live Demo:** _deploy link here_

---

## Overview

XSIDE reimagines the mobile shopping experience by combining social discovery (stories, outfit feeds) with gamification (quizzes, mini-games, reward points). This mockup was built to validate the UX flow and visual direction before native development.

### Key Screens

| Screen | Description |
|---|---|
| **Welcome & Onboarding** | Animated splash, fashion image collage, branded CTA |
| **Home Feed** | Auto-scrolling hero carousel, Instagram-style stories, curated outfit grids, seasonal collections |
| **AI Stil Asistanı** | Chat UI with structured outfit cards, quick-reply chips, typing indicators |
| **Oyna & Kazan** | Two-tab game hub — 4-step style quiz + mini games (Stil Rush, Stil Yakala) |
| **Stil Yakala** | Emoji catch game with combo scoring, lives, visual feedback animations |
| **Game Rewards** | Post-game screen with coupon codes, progress bar, nearby store list |
| **Favoriler** | 2-column product grid with discount badges, add-to-cart confirmation |
| **Sepetim** | Full cart with quantity controls, subtotals, promo code input |
| **Hesabım** | Profile with XSIDE Club membership card, point balance, menu groups |
| **Bildirimler** | Slide-up sheet with category tabs (orders, recommendations, discounts, special) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19, TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4, inline styles for fine-grained control |
| Icons | Lucide React |
| State | `useState` / `useRef` — no external libraries |
| Animations | CSS `@keyframes`, `requestAnimationFrame` for game loops |
| Fonts | Inter (Google Fonts) |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── App.tsx                    # Screen routing, responsive viewport scaling
├── main.tsx                   # Entry point
├── index.css                  # Tailwind imports, global resets
├── assets/                    # Story photos, product images, banner assets
└── components/
    ├── IPhoneFrame.tsx        # iPhone 15 Pro shell with Dynamic Island
    ├── StatusBar.tsx          # iOS-style status bar (time, signal, battery)
    ├── BottomNav.tsx          # 5-tab bar with floating home button
    ├── FloatingButton.tsx     # Animated FAB (quiz/game toggle)
    ├── MainApp.tsx            # Tab router, overlay management
    ├── WelcomeScreen.tsx      # Splash screen
    ├── GetStartedScreen.tsx   # Onboarding with image collage
    ├── HeroBanner.tsx         # Auto-scroll carousel with dot indicators
    ├── StoriesBar.tsx         # Story avatars + full-screen viewer + product list
    ├── NotificationsSheet.tsx # Pull-up notification panel with tabs
    ├── CatchGame.tsx          # Falling-emoji catch game (rAF game loop)
    ├── GameRewardScreen.tsx   # Post-game reward & coupon screen
    └── tabs/
        ├── HomeTab.tsx        # Main feed (stories, banner, recommendations)
        ├── AITab.tsx          # AI style assistant chat interface
        ├── FavoritesTab.tsx   # Favorites product grid
        ├── CartTab.tsx        # Shopping cart with quantity controls
        ├── ProfileTab.tsx     # User profile & XSIDE Club membership
        └── GameTab.tsx        # Quiz + mini games hub
```

## Design Decisions

- **iPhone-first viewport:** The mockup renders inside a fixed 375×812 frame with `transform: scale()` to fit any screen. Mobile visitors get a larger scale factor for usability.
- **No routing library:** Screen and tab transitions are managed via state to keep the bundle lean and avoid unnecessary complexity for a prototype.
- **CSS-only animations:** All UI animations (floating watermarks, confetti, sparkles, game effects) use pure CSS `@keyframes` — no animation libraries.
- **Game loop via rAF:** The Stil Yakala mini-game uses `requestAnimationFrame` with `useRef` for mutable state to avoid stale closures, keeping 60fps on mobile.
- **Local assets over CDN:** Product and story images are bundled as local files for consistent offline-capable builds and zero external dependencies at runtime (except Google Fonts).
