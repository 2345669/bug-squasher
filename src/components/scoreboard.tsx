export function Scoreboard({
  score,
  lives,
  highScore,
}: {
  score: number;
  lives: number;
  highScore: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 32,
        marginBottom: 12,
        fontSize: 16,
        fontWeight: 600,
      }}
    >
      <span style={{ color: "#58a6ff" }}>
        Score: <span style={{ color: "#7ee787" }}>{score}</span>
      </span>
      <span style={{ color: "#58a6ff" }}>
        Lives:{" "}
        <span style={{ color: lives <= 2 ? "#f85149" : "#ffa657" }}>
          {"❤️".repeat(Math.max(0, lives))}
        </span>
      </span>
      <span style={{ color: "#484f58", fontSize: 13 }}>Best: {highScore}</span>
    </div>
  );
}
