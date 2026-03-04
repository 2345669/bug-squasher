import { INITIAL_LIVES } from "@/constants";

export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(13, 17, 23, 0.92)",
        zIndex: 50,
        gap: 20,
      }}
    >
      <div style={{ fontSize: 64 }}>🪲</div>
      <p
        style={{
          color: "#8b949e",
          fontSize: 14,
          maxWidth: 380,
          textAlign: "center",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        Bugs are crawling through the codebase!
        <br />
        Click them before they escape.
        <br />
        <span style={{ color: "#484f58", fontSize: 12 }}>
          (don't let more than {INITIAL_LIVES} escape)
        </span>
      </p>
      <button
        onClick={onStart}
        style={{
          padding: "12px 32px",
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "inherit",
          background: "linear-gradient(135deg, #238636, #2ea043)",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          letterSpacing: 0.5,
          transition: "transform 0.15s, box-shadow 0.15s",
          boxShadow: "0 4px 12px rgba(46, 160, 67, 0.3)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Start Debugging →
      </button>
    </div>
  );
}
