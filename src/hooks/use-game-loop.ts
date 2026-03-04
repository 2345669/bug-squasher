import { useState, useCallback, useRef, useEffect } from "react";
import { SPAWN_INTERVAL_MS, TICK_INTERVAL_MS } from "../constants";
import { createBug } from "@/utils";
import type { Bug } from "@/interfaces";

export function useGameLoop() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [lives, setLives] = useState(0);
  const tickRef = useRef<number | null>(null);
  const spawnRef = useRef<number | null>(null);

  // ─── Bug Spawning ───────────────────────────────────────────────────────

  const startSpawning = useCallback(() => {
    spawnRef.current = window.setInterval(() => {
      // 🔧 TASK 4 (Bonus): This interval is constant. Make it dynamic
      // based on the current score. Hint: you could clear and restart
      // this interval with a shorter delay as score increases.
      // You might need a scoreRef to read the current score inside
      // the interval, since state values are stale in closures.
      setBugs((prev) => [...prev, createBug()]);
    }, SPAWN_INTERVAL_MS);
  }, []);

  // ─── Game Tick (movement) ───────────────────────────────────────────────

  const startTicking = useCallback(() => {
    tickRef.current = window.setInterval(() => {
      setBugs((prev) => {
        const updated = prev.map((bug) => {
          const wobbleOffset = Math.sin(bug.wobble) * 0.3;
          return {
            ...bug,
            x: bug.x + Math.cos(bug.direction + wobbleOffset) * bug.speed,
            y: bug.y + Math.sin(bug.direction + wobbleOffset) * bug.speed,
            wobble: bug.wobble + 0.15,
          };
        });

        // 🔧 TASK 2: Bugs that leave the screen are never cleaned up.
        //
        // Right now `updated` contains ALL bugs, including ones off screen.
        // Use the `isBugOffScreen` utility from @/utils to partition
        // the array into "visible" and "escaped" bugs.
        //
        // For each escaped bug, decrement lives by 1 using setLives.
        // Return only the visible bugs from this updater.
        //
        // Example approach:
        //   const visible = updated.filter(b => !isBugOffScreen(b));
        //   const escaped = updated.filter(b => isBugOffScreen(b));
        //   if (escaped.length > 0) {
        //     setLives(prev => prev - escaped.length);
        //   }
        //   return visible;
        //
        // Currently it just returns everything:
        return updated;
      });
    }, TICK_INTERVAL_MS);
  }, []);

  // ─── Start / Stop ───────────────────────────────────────────────────────

  const start = useCallback(
    (initialLives: number) => {
      setBugs([]);
      setLives(initialLives);
      startSpawning();
      startTicking();
    },
    [startSpawning, startTicking]
  );

  const stop = useCallback(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    if (spawnRef.current) clearInterval(spawnRef.current);
    tickRef.current = null;
    spawnRef.current = null;
  }, []);

  const removeBug = useCallback((bugId: string) => {
    setBugs((prev) => prev.filter((b) => b.id !== bugId));
  }, []);

  // Cleanup on unmount
  useEffect(() => stop, [stop]);

  return { bugs, lives, start, stop, removeBug };
}