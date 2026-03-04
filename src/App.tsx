/**
 * 🐛 BUG SQUASHER - The Interview Game
 *
 * Welcome candidate! This is a small React game where bugs crawl across
 * code snippets and you have to click them before they escape.
 *
 * The game works... mostly. There are a few things broken or missing
 * that we'd like you to fix. Each task is marked with a 🔧 comment
 * in the relevant file.
 *
 * TASKS:
 *
 * 🔧 TASK 1 (Easy) — hooks/use-squash.ts
 *    The score never updates when you squash a bug. Find the click
 *    handler and fix it.
 *
 * 🔧 TASK 2 (Medium) — hooks/use-game-loop.ts
 *    Bugs that escape the screen should be removed from state and
 *    decrement a "lives" counter. Currently escaped bugs just pile
 *    up invisibly. Implement the cleanup logic using utils/is-bug-off-screen.ts.
 *
 * 🔧 TASK 3 (Medium) — components/game-over.tsx + this file
 *    The game has no end state. Implement the GameOver component
 *    and wire it up here so it shows when lives reach 0.
 *
 * 🔧 TASK 4 (medium) — hooks/use-game-loop.ts
 *    The difficulty never increases. Make bugs spawn faster and/or
 *    move quicker as the score goes up.
 *
 * 🔧 TASK 5 (bonus) — Try to add Tailwind CSS to the project and replace all styles with Tailwind classes.
 * https://tailwindcss.com/docs/installation/using-vite
 *
 *
 * Good luck, and have fun! 🪲
 */

import { useCallback } from "react";
import { GAME_HEIGHT, GAME_WIDTH, INITIAL_LIVES } from "./constants";
import { useSquash, useGameLoop } from "@/hooks";
import {
  Bug,
  Splat,
  Scoreboard,
  CodeBackground,
  StartScreen,
} from "@/components";

type GameStatus = "idle" | "playing" | "gameover";

// 🔧 TASK 3: You'll need a state to track the game status.
// Currently the component only knows "idle" vs "playing".
// Add a "gameover" state and use a useEffect to watch `lives`.

function App() {
  const { bugs, lives, start, removeBug } = useGameLoop();
  const { score, splats, highScore, squash, reset } = useSquash();

  // Simple status tracking — you may want to replace this with
  // a proper state for Task 3
  const status: GameStatus =
    bugs.length === 0 && score === 0 ? "idle" : "playing";

  // ─── Squash handler (connects both hooks) ─────────────────────────────

  const handleSquash = useCallback(
    (bugId: string, x: number, y: number) => {
      removeBug(bugId);
      squash(x, y);
    },
    [removeBug, squash],
  );

  // ─── Start game ───────────────────────────────────────────────────────

  const handleStart = useCallback(() => {
    reset();
    start(INITIAL_LIVES);
  }, [reset, start]);

  // ─── 🔧 TASK 3: Handle game over ─────────────────────────────────────
  //
  // Add a useEffect that watches `lives`. When lives <= 0:
  //   1. Call stop() to clear intervals
  //   2. Update the game status to "gameover"
  //
  // Also create a handleRestart function that:
  //   1. Calls reset() on the squash hook
  //   2. Calls start(INITIAL_LIVES) on the game loop
  //   3. Sets status back to "playing"

  // ─── Render ───────────────────────────────────────────────────────────

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#0d1117",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        color: "#c9d1d9",
        padding: 20,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <h1
          style={{
            fontSize: 28,
            margin: 0,
            background: "linear-gradient(135deg, #58a6ff, #f778ba)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          🐛 Bug Squasher
        </h1>
      </div>

      {/* Scoreboard */}
      {status === "playing" && (
        <Scoreboard score={score} lives={lives} highScore={highScore} />
      )}

      {/* Game Area */}
      <div
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          background: "#161b22",
          border: "2px solid #30363d",
          borderRadius: 12,
          position: "relative" as const,
          overflow: "hidden",
          boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
          cursor: status === "playing" ? "crosshair" : "default",
        }}
      >
        <CodeBackground />

        {/* Bugs */}
        {bugs.map((bug) => (
          <Bug key={bug.id} bug={bug} onSquash={handleSquash} />
        ))}

        {/* Splats */}
        {splats.map((splat) => (
          <Splat key={splat.id} splat={splat} />
        ))}

        {/* Start Screen */}
        {status === "idle" && <StartScreen onStart={handleStart} />}

        {/* 🔧 TASK 3: Render <GameOver /> when status === "gameover" */}
        {/* {status === "gameover" && (
          <GameOver
            score={score}
            highScore={highScore}
            onRestart={handleRestart}
          />
        )} */}
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: 16,
          color: "#fff",
          fontSize: 12,
          textAlign: "center" as const,
        }}
      >
        hint: the bugs are in the code... literally and figuratively 🔧
      </p>

      {/* Keyframe animations */}
      <style>
        {`@keyframes splatAnim {
    0% { transform: scale(0.5); opacity: 1; }
    100% { transform: scale(1.8); opacity: 0; }
    }`}
      </style>
    </div>
  );
}

export default App;
