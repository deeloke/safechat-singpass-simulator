import { useEffect, useRef } from "react";
import { SimulatorBadge } from "../SimulatorBadge";

interface Props { onDone: () => void }

export function HealthHubLoadingScreen({ onDone }: Props) {
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; });

  useEffect(() => {
    const t = setTimeout(() => onDoneRef.current(), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      background: "#f2f2f7", alignItems: "center", justifyContent: "center",
      fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        {/* HealthHub logo-style tile */}
        <div style={{
          width: 96, height: 96, borderRadius: 24,
          background: "linear-gradient(145deg, #ff6b6b 0%, #c0392b 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 28px rgba(192,57,43,0.4)",
        }}>
          <span style={{ fontSize: 48 }}>🏥</span>
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 22, fontWeight: 800, color: "#1c1c1e", marginBottom: 4 }}>HealthHub</p>
          <p style={{ fontSize: 14, color: "#8e8e93", fontWeight: 500 }}>Opening HealthHub...</p>
        </div>

        {/* Spinner */}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ animation: "spin 0.9s linear infinite" }}>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <circle cx="22" cy="22" r="17" stroke="#f2f2f7" strokeWidth="4" />
          <path d="M22 5 A17 17 0 0 1 39 22" stroke="#e2231a" strokeWidth="4" strokeLinecap="round" />
        </svg>

        <p style={{ fontSize: 12, color: "#aeaeb2", textAlign: "center", maxWidth: 240 }}>
          Connecting securely via Singpass...
        </p>
      </div>

      <div style={{ position: "absolute", bottom: 44 }}>
        <SimulatorBadge />
      </div>
    </div>
  );
}
