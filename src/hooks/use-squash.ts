import { useState, useCallback } from "react";
import { type Splat } from "@/interfaces";

const SPLAT_DURATION_MS = 600;

export function useSquash() {
  const [score, setScore] = useState(0);
  const [splats, setSplats] = useState<Splat[]>([]);
  const [highScore, setHighScore] = useState(0);

  const squash = useCallback((x: number, y: number) => {
    // Add a splat animation
    const splatId = crypto.randomUUID();
    setSplats((prev) => [
      ...prev,
      { id: splatId, x, y, timestamp: Date.now() },
    ]);
    setTimeout(() => {
      setSplats((prev) => prev.filter((s) => s.id !== splatId));
    }, SPLAT_DURATION_MS);

    // 🔧 TASK 1: The score should increase by 1 here.
    // Something is missing... What should we call?
    setScore((prev) => prev + 1);
  }, []);

  const reset = useCallback(() => {
    setScore((prev) => {
      setHighScore((hi) => Math.max(hi, prev));
      return 0;
    });
    setSplats([]);
  }, []);

  return { score, splats, highScore, squash, reset };
}
