import type { Bug } from "@/interfaces";
import { randomBetween } from "./random-between";
import { BUG_EMOJIS, GAME_HEIGHT, GAME_WIDTH } from "@/constants";

export function createBug(): Bug {
  const edge = Math.floor(Math.random() * 4);
  let x: number, y: number, direction: number;

  switch (edge) {
    case 0: // top
      x = randomBetween(50, GAME_WIDTH - 50);
      y = -20;
      direction = randomBetween(Math.PI * 0.2, Math.PI * 0.8);
      break;
    case 1: // right
      x = GAME_WIDTH + 20;
      y = randomBetween(50, GAME_HEIGHT - 50);
      direction = randomBetween(Math.PI * 0.7, Math.PI * 1.3);
      break;
    case 2: // bottom
      x = randomBetween(50, GAME_WIDTH - 50);
      y = GAME_HEIGHT + 20;
      direction = randomBetween(-Math.PI * 0.8, -Math.PI * 0.2);
      break;
    default: // left
      x = -20;
      y = randomBetween(50, GAME_HEIGHT - 50);
      direction = randomBetween(-Math.PI * 0.3, Math.PI * 0.3);
      break;
  }

  return {
    id: crypto.randomUUID(),
    x,
    y,
    speed: randomBetween(1.5, 3.5),
    direction,
    emoji: BUG_EMOJIS[Math.floor(Math.random() * BUG_EMOJIS.length)],
    size: randomBetween(24, 38),
    wobble: randomBetween(0, Math.PI * 2),
  };
}