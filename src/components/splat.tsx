import type { Splat } from "../interfaces";

export function Splat({ splat }: { splat: Splat }) {
  return (
    <div
      key={splat.id}
      style={{
        position: "absolute",
        left: splat.x - 20,
        top: splat.y - 20,
        fontSize: 36,
        lineHeight: 1,
        pointerEvents: "none",
        zIndex: 20,
        animation: "splatAnim 0.5s ease-out forwards",
      }}
    >
      💥
    </div>
  );
}
