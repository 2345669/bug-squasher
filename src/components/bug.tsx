import type { Bug } from "../interfaces";

export function Bug({
  bug,
  onSquash,
}: {
  bug: Bug;
  onSquash: (bugId: string, x: number, y: number) => void;
}) {
  return (
    <div
      key={bug.id}
      onClick={(e) => {
        e.stopPropagation();
        onSquash(bug.id, bug.x, bug.y);
      }}
      style={{
        position: "absolute",
        left: bug.x - bug.size / 2,
        top: bug.y - bug.size / 2,
        fontSize: bug.size,
        lineHeight: 1,
        cursor: "pointer",
        transform: `rotate(${bug.direction + Math.PI / 2}rad)`,
        transition: "transform 0.1s",
        filter: "drop-shadow(0 0 6px rgba(255,200,0,0.3))",
        userSelect: "none",
        zIndex: 10,
      }}
    >
      {bug.emoji}
    </div>
  );
}
