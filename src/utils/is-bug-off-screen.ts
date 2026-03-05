import type { Bug } from "@/interfaces";
import { GAME_WIDTH, GAME_HEIGHT } from "@/constants";

export function isBugOffScreen(bug: Bug): boolean {
  if (bug.x < 0 || bug.x > GAME_WIDTH || bug.y < 0 || bug.y > GAME_HEIGHT) {
    return true;
  }
  return false;
}