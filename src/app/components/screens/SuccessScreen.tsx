import { CheckCircle, Circle } from "lucide-react";
import { SimulatorBadge } from "../SimulatorBadge";
import { SingpassLogo } from "../SingpassLogo";
import type { Activity } from "../../../App";

interface Props {
  allDone: boolean;
  completed: Set<Activity>;
  onFinish: () => void;
}

const remaining = [
  { key: "digitalic" as Activity, label: "View Your Digital IC" },
  { key: "message"   as Activity, label: "Read the CPF inbox message" },
  { key: "healthhub" as Activity, label: "Access HealthHub" },
];

const healthhubFeatures = [
  { emoji: "📅", label: "Check medical appointments" },
  { emoji: "📋", label: "View health records" },
  { emoji: "💊", label: "Manage medications" },
];

export function SuccessScreen({ allDone, completed, onFinish }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f2f2f7", fontFamily: "'Poppins', sans-serif" }}>
      {/* Nav */}
      <div style={{ background: "#ffffff", paddingTop: 52, paddingBottom: 14, paddingLeft: 20, paddingRight: 20, borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <SingpassLogo size={20} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px", scrollbarWidth: "none", display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* HealthHub success mark */}
        <div style={{ width: 84, height: 84, borderRadius: "50%", background: "#f0faf4", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, boxShadow: "0 4px 20px rgba(52,199,89,0.2)" }}>
          <CheckCircle size={52} color="#34c759" strokeWidth={1.5} />
        </div>

        <p style={{ fontSize: 20, fontWeight: 800, color: "#1c1c1e", textAlign: "center", lineHeight: 1.25, marginBottom: 8 }}>
          HealthHub Opened<br />Successfully
        </p>
        <p style={{ fontSize: 14, color: "#636366", textAlign: "center", lineHeight: 1.6, marginBottom: 20, maxWidth: 280 }}>
          You have successfully accessed HealthHub through Singpass.
        </p>

        {/* HealthHub features */}
        <div style={{ background: "#ffffff", borderRadius: 18, padding: "16px 18px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", width: "100%", marginBottom: 14 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>In HealthHub you can:</p>
          {healthhubFeatures.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: i < healthhubFeatures.length - 1 ? 12 : 0 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: "#f2f2f7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{f.emoji}</div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1c1c1e" }}>{f.label}</p>
            </div>
          ))}
        </div>

        {/* Activities checklist — always visible */}
        <div style={{ background: "#ffffff", borderRadius: 18, padding: "16px 18px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", width: "100%", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1c1c1e" }}>Practice Activities</p>
            <span style={{ fontSize: 13, fontWeight: 700, color: completed.size === 3 ? "#34c759" : "#e2231a" }}>
              {completed.size} / 3
            </span>
          </div>
          {remaining.map(step => {
            const done = completed.has(step.key);
            return (
              <div key={step.key} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                {done
                  ? <CheckCircle size={20} color="#34c759" strokeWidth={2} />
                  : <Circle size={20} color="#c7c7cc" strokeWidth={1.8} />}
                <p style={{ fontSize: 14, fontWeight: done ? 600 : 500, color: done ? "#1c7a50" : "#636366", textDecoration: done ? "none" : "none" }}>
                  {step.label}
                </p>
              </div>
            );
          })}

          {!allDone && (
            <div style={{ background: "#fff9e6", borderRadius: 10, padding: "9px 12px", marginTop: 8, border: "1px solid rgba(255,196,0,0.35)" }}>
              <p style={{ fontSize: 12, color: "#92600a", fontWeight: 600 }}>
                ⬅ Return home to complete the remaining activities
              </p>
            </div>
          )}
        </div>

        <SimulatorBadge />
      </div>

      <div style={{ padding: "10px 16px 36px", background: "#f2f2f7" }}>
        <button onClick={onFinish} style={{
          width: "100%", height: 52, borderRadius: 13,
          background: allDone ? "#34c759" : "#e2231a",
          color: "#fff", fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer",
          fontFamily: "'Poppins', sans-serif",
          boxShadow: allDone ? "0 4px 14px rgba(52,199,89,0.35)" : "0 4px 14px rgba(226,35,26,0.28)",
          transition: "background 0.3s ease",
        }}>
          {allDone ? "🎉 See Your Certificate" : "Back to Home"}
        </button>
      </div>
    </div>
  );
}
