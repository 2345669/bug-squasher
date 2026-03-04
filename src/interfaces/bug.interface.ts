export interface Bug {
  id: string;
  x: number;
  y: number;
  speed: number;
  direction: number; // angle in radians
  emoji: string;
  size: number;
  wobble: number;
}