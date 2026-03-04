# Bug Squasher

A React coding challenge disguised as an arcade game. Bugs are crawling across your codebase — click them before they escape!

The game _works_, but it's full of... well, bugs. Your mission is to dig into the code, find the broken pieces, and fix them one by one.

## Getting Started

```bash
npm install
npm run dev
```

## The Challenge

Open `src/App.tsx` — each task is marked with a `🔧` comment in the relevant file.

### Task 1 — Fix the score (Easy)

**File:** `src/hooks/use-squash.ts`

You're clicking bugs, splats are flying, but the score stays at zero. Something is missing in the click handler. Find it and fix it.

### Task 2 — Clean up escaped bugs (Medium)

**File:** `src/hooks/use-game-loop.ts`

Bugs that crawl off-screen are never removed. They pile up invisibly, and lives never go down. Implement the cleanup logic using `src/utils/is-bug-off-screen.ts` to filter out escaped bugs and decrement lives.

### Task 3 — Game over screen (Medium)

**Files:** `src/components/game-over.tsx` + `src/App.tsx`

The game has no end. When lives hit zero... nothing happens. Build the `GameOver` component (show the final score, the best score, and a "Play Again" button) and wire it into `App.tsx`.

### Task 4 — Dynamic difficulty (Medium)

**File:** `src/hooks/use-game-loop.ts`

The spawn rate never changes. Whether your score is 0 or 50, bugs trickle in at the same pace. Make the game ramp up — faster spawns, faster bugs, or both — as the player's score climbs.

### Task 5 — Tailwind CSS migration (Bonus)

All styles are currently inline. Set up [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite) and replace them with utility classes.

## Tech Stack

- React 19
- TypeScript
- Vite
