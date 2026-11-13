import { SimulatorBadge } from "../SimulatorBadge";
import { SingpassLogo } from "../SingpassLogo";

interface Props { onNext: () => void }

export function SplashScreen({ onNext }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#ffffff", fontFamily: "'Poppins', sans-serif" }}>
      {/* Red top bar */}
      <div style={{ background: "#e2231a", height: 6, width: "100%" }} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 40px", gap: 0 }}>
        {/* Lion head crest SVG placeholder */}
        <div style={{ marginBottom: 28 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <rect width="80" height="80" rx="20" fill="#e2231a" />
            {/* Stylised S mark */}
            <text x="40" y="56" textAnchor="middle" fill="white" fontSize="44" fontWeight="900" fontFamily="Poppins, sans-serif">S</text>
          </svg>
        </div>

        <div style={{ marginBottom: 8 }}>
          <SingpassLogo size={34} />
        </div>
        <p style={{ fontSize: 14, color: "#8e8e93", fontWeight: 500, marginBottom: 48, letterSpacing: "0.04em" }}>
          Learning Simulator
        </p>

        <p style={{ fontSize: 16, color: "#3a3a3c", textAlign: "center", lineHeight: 1.65, marginBottom: 48, maxWidth: 260 }}>
          Practise using Singpass safely in a simulated environment.
        </p>
      </div>

      <div style={{ padding: "0 24px 48px" }}>
        <button
          onClick={onNext}
          style={{
            width: "100%", height: 54, borderRadius: 14, background: "#e2231a",
            color: "#fff", fontSize: 17, fontWeight: 700, border: "none", cursor: "pointer",
            fontFamily: "'Poppins', sans-serif", letterSpacing: "0.01em",
            boxShadow: "0 4px 16px rgba(226,35,26,0.35)",
          }}
        >
          Start
        </button>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <SimulatorBadge />
        </div>
      </div>
    </div>
  );
}
