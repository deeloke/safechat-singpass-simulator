export function SimulatorBadge({ light = false }: { light?: boolean }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: light ? "rgba(255,255,255,0.15)" : "rgba(226,35,26,0.08)",
      borderRadius: 20, padding: "4px 10px",
    }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: light ? "#ffffff" : "#e2231a", flexShrink: 0 }} />
      <span style={{
        fontSize: 10, fontWeight: 600, letterSpacing: "0.02em",
        color: light ? "rgba(255,255,255,0.85)" : "#e2231a",
        fontFamily: "'Poppins', sans-serif",
      }}>
        Learning Simulator • No real personal data is used
      </span>
    </div>
  );
}
