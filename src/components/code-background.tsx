import { useRef } from "react";
import { CODE_SNIPPETS } from "@/constants";

export function CodeBackground() {
  const indices = useRef(
    [...Array(8)].map(() => Math.floor(Math.random() * CODE_SNIPPETS.length)),
  );

  return (
    <>
      {indices.current.map((snippetIdx, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 30 + i * 56,
            left: 24,
            color: "#fff",
            fontSize: 14,
            whiteSpace: "nowrap",
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              color: "#30363d",
              fontSize: 12,
              width: 20,
              textAlign: "right",
            }}
          >
            {i + 1}
          </span>
          <span>{CODE_SNIPPETS[snippetIdx]}</span>
        </div>
      ))}
    </>
  );
}
