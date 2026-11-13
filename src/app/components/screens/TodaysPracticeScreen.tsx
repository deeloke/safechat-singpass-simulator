import { SimulatorBadge } from "../SimulatorBadge";
import { SingpassLogo } from "../SingpassLogo";

interface Props { onNext: () => void }

const activities = [
  { num: 1, title: "View Your Digital IC", desc: "Find your Digital IC and check your name and NRIC.", emoji: "🪪" },
  { num: 2, title: "Check Your Inbox", desc: "Open your Inbox and read your latest government message.", emoji: "📬" },
  { num: 3, title: "Access HealthHub", desc: "Find and open HealthHub through Singpass.", emoji: "🏥" },
];

export function TodaysPracticeScreen({ onNext }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f2f2f7", fontFamily: "'Poppins', sans-serif" }}>
      {/* Nav bar */}
      <div style={{ background: "#ffffff", paddingTop: 52, paddingBottom: 16, paddingLeft: 20, paddingRight: 20, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <SingpassLogo size={22} />
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1c1c1e", marginTop: 12, lineHeight: 1.2 }}>Today's Practice</h1>
        <p style={{ fontSize: 14, color: "#636366", marginTop: 6, lineHeight: 1.55 }}>
          You will practise three common tasks using the Singpass Learning Simulator.
        </p>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", scrollbarWidth: "none" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {activities.map(act => (
            <div key={act.num} style={{
              background: "#ffffff", borderRadius: 16, padding: "16px 18px",
              display: "flex", alignItems: "flex-start", gap: 14,
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: "#fef2f2",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, flexShrink: 0,
              }}>
                {act.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: "#e2231a",
                    background: "#fef2f2", borderRadius: 6, padding: "2px 7px",
                    letterSpacing: "0.05em", textTransform: "uppercase",
                  }}>Activity {act.num}</span>
                  <span style={{ fontSize: 16, color: "#34c759" }}>✓</span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#1c1c1e", marginBottom: 3 }}>{act.title}</p>
                <p style={{ fontSize: 13, color: "#636366", lineHeight: 1.5 }}>{act.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Info box */}
        <div style={{
          background: "#fff9e6", border: "1px solid rgba(255,196,0,0.4)", borderRadius: 14,
          padding: "13px 16px", marginTop: 14, display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>ℹ️</span>
          <p style={{ fontSize: 13, color: "#3a3a3c", lineHeight: 1.55 }}>
            This is a learning simulator. No real personal information or government services are used.
          </p>
        </div>
      </div>

      <div style={{ padding: "12px 16px 44px", background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <button onClick={onNext} style={{
          width: "100%", height: 54, borderRadius: 14, background: "#e2231a",
          color: "#fff", fontSize: 17, fontWeight: 700, border: "none", cursor: "pointer",
          fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 14px rgba(226,35,26,0.3)",
        }}>
          Start Practice
        </button>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <SimulatorBadge />
        </div>
      </div>
    </div>
  );
}
