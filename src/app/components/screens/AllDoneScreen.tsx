import { useEffect, useState } from "react";
import { SimulatorBadge } from "../SimulatorBadge";
import { SingpassLogo } from "../SingpassLogo";

interface Props { onRestart: () => void }

export function AllDoneScreen({ onRestart }: Props) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 80); return () => clearTimeout(t); }, []);

  const achievements = [
    { emoji: "🪪", label: "Viewed Your Digital IC" },
    { emoji: "📬", label: "Read Your CPF Inbox Message" },
    { emoji: "🏥", label: "Accessed HealthHub via Singpass" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#ffffff", fontFamily: "'Poppins', sans-serif", overflow: "hidden" }}>
      {/* Confetti dots */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {["#e2231a","#34c759","#007aff","#ff9500","#af52de","#e2231a","#34c759"].map((c, i) => (
          <div key={i} style={{
            position: "absolute",
            width: i % 2 === 0 ? 10 : 7, height: i % 2 === 0 ? 10 : 7,
            borderRadius: i % 3 === 0 ? "50%" : 2,
            background: c, opacity: 0.7,
            left: `${10 + i * 13}%`,
            top: show ? `${5 + (i % 4) * 6}%` : "-10%",
            transition: `top ${0.6 + i * 0.1}s ease`,
          }} />
        ))}
        {["#007aff","#ff9500","#e2231a","#34c759","#af52de","#ff9500"].map((c, i) => (
          <div key={`b${i}`} style={{
            position: "absolute",
            width: i % 2 === 0 ? 8 : 12, height: i % 2 === 0 ? 8 : 12,
            borderRadius: i % 2 === 0 ? "50%" : 2,
            background: c, opacity: 0.6,
            left: `${5 + i * 16}%`,
            top: show ? `${10 + (i % 3) * 5}%` : "-10%",
            transition: `top ${0.5 + i * 0.12}s ease ${i * 0.05}s`,
          }} />
        ))}
      </div>

      {/* Top red strip */}
      <div style={{ background: "#e2231a", height: 6, flexShrink: 0 }} />

      <div style={{
        flex: 1, overflowY: "auto", scrollbarWidth: "none",
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "36px 24px 24px",
        opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}>

        {/* Trophy */}
        <div style={{ fontSize: 80, marginBottom: 6, lineHeight: 1 }}>🏆</div>

        <p style={{ fontSize: 26, fontWeight: 900, color: "#1c1c1e", textAlign: "center", lineHeight: 1.2, marginBottom: 6 }}>
          Practice Complete!
        </p>
        <p style={{ fontSize: 14, color: "#636366", textAlign: "center", lineHeight: 1.6, marginBottom: 28, maxWidth: 280 }}>
          Congratulations! You have successfully completed all 3 activities. You are now ready to use the real Singpass app with confidence.
        </p>

        {/* Certificate-style card */}
        <div style={{
          width: "100%", borderRadius: 20, overflow: "hidden",
          boxShadow: "0 8px 32px rgba(226,35,26,0.18)",
          border: "2px solid #e2231a", marginBottom: 20,
        }}>
          {/* Card header */}
          <div style={{ background: "#e2231a", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <SingpassLogo dark size={18} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.8)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Learning Simulator</span>
          </div>

          {/* Card body */}
          <div style={{ background: "#ffffff", padding: "18px 20px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 2 }}>Certificate of Completion</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: "#1c1c1e", marginBottom: 16 }}>Tan Ah Kow</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {achievements.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "#f0faf4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                    {a.emoji}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#34c759", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: "#fff", fontSize: 11, fontWeight: 800 }}>✓</span>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1c1c1e" }}>{a.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #f2f2f7", marginTop: 16, paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontSize: 11, color: "#8e8e93" }}>Completed {new Date().toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric" })}</p>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#34c759" }}>✓ All done</p>
            </div>
          </div>
        </div>

        <div style={{ background: "#fef2f2", borderRadius: 14, padding: "14px 16px", width: "100%", marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#e2231a", marginBottom: 4 }}>You are ready! 🎉</p>
          <p style={{ fontSize: 13, color: "#3a3a3c", lineHeight: 1.55 }}>
            Download the real <strong>Singpass app</strong> from the App Store or Google Play and log in with your actual NRIC and Singpass password.
          </p>
        </div>

        <SimulatorBadge />
      </div>

      <div style={{ padding: "10px 16px 36px", background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.06)", flexShrink: 0 }}>
        <button onClick={onRestart} style={{
          width: "100%", height: 52, borderRadius: 13, background: "#e2231a",
          color: "#fff", fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer",
          fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 14px rgba(226,35,26,0.3)",
        }}>
          Practise Again
        </button>
      </div>
    </div>
  );
}
