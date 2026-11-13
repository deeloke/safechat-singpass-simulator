import { ArrowLeft } from "lucide-react";
import { SimulatorBadge } from "../SimulatorBadge";
import { SingpassLogo } from "../SingpassLogo";

interface Props { onBack: () => void }

function Field({ label, value, mono = false, last = false }: { label: string; value: string; mono?: boolean; last?: boolean }) {
  return (
    <div style={{
      paddingBottom: last ? 0 : 14,
      marginBottom: last ? 0 : 14,
      borderBottom: last ? "none" : "1px solid #f2f2f7",
    }}>
      <p style={{
        fontSize: 11, color: "#8e8e93", fontWeight: 600,
        textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3,
      }}>
        {label}
      </p>
      <p style={{
        fontSize: 16, fontWeight: 700, color: "#1c1c1e",
        fontFamily: mono ? "'Courier New', monospace" : "'Poppins', sans-serif",
        letterSpacing: mono ? "0.08em" : "normal",
        lineHeight: 1.4,
      }}>
        {value}
      </p>
    </div>
  );
}

export function DigitalICScreen({ onBack }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f2f2f7", fontFamily: "'Poppins', sans-serif" }}>
      {/* Nav bar */}
      <div style={{
        background: "#ffffff", paddingTop: 52, paddingBottom: 14,
        paddingLeft: 16, paddingRight: 16,
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: "50%", background: "#f2f2f7",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ArrowLeft size={18} color="#1c1c1e" strokeWidth={2} />
        </button>
        <SingpassLogo size={20} />
        <p style={{ fontSize: 13, color: "#8e8e93", fontWeight: 500 }}>/ Digital IC</p>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 0", scrollbarWidth: "none" }}>

        {/* Physical-style IC card */}
        <div style={{
          borderRadius: 20, overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          background: "linear-gradient(140deg, #fde0e0 0%, #f8b8b5 40%, #f49d9a 70%, #ee8585 100%)",
          marginBottom: 16, position: "relative",
        }}>
          {/* Holographic shimmer */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
            pointerEvents: "none",
          }} />

          {/* Card top strip */}
          <div style={{
            background: "#e2231a", padding: "10px 18px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 800, color: "#ffffff", letterSpacing: "0.08em", textTransform: "uppercase" }}>Republic of Singapore</p>
              <p style={{ fontSize: 8, fontWeight: 500, color: "rgba(255,255,255,0.85)", letterSpacing: "0.05em" }}>NATIONAL DIGITAL IDENTITY CARD</p>
            </div>
            <span style={{ fontSize: 22 }}>🦁</span>
          </div>

          {/* Card body */}
          <div style={{ padding: "16px 18px 14px", display: "flex", gap: 16 }}>
            {/* Watermark */}
            <div style={{ position: "absolute", right: 10, top: 40, opacity: 0.06, fontSize: 80, pointerEvents: "none", userSelect: "none" }}>🦁</div>

            {/* Photo */}
            <div style={{
              width: 80, height: 98, borderRadius: 8, overflow: "hidden", flexShrink: 0,
              border: "2px solid rgba(0,0,0,0.15)", background: "rgba(0,0,0,0.1)",
              display: "flex", alignItems: "flex-end", justifyContent: "center",
            }}>
              <svg viewBox="0 0 80 98" width="80" height="98" fill="none">
                <rect width="80" height="98" fill="rgba(200,150,140,0.3)" />
                <circle cx="40" cy="32" r="18" fill="rgba(150,100,80,0.5)" />
                <ellipse cx="40" cy="80" rx="30" ry="20" fill="rgba(120,80,60,0.4)" />
              </svg>
            </div>

            {/* IC details preview */}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 9, color: "rgba(0,0,0,0.45)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 1 }}>Name</p>
              <p style={{ fontSize: 15, fontWeight: 900, color: "#1c1c1e", marginBottom: 10, lineHeight: 1.1 }}>TAN AH KOW</p>

              <p style={{ fontSize: 9, color: "rgba(0,0,0,0.45)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 1 }}>NRIC No.</p>
              <p style={{ fontSize: 15, fontWeight: 900, color: "#1c1c1e", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 10 }}>S5812346A</p>

              <div style={{ display: "flex", gap: 16 }}>
                <div>
                  <p style={{ fontSize: 9, color: "rgba(0,0,0,0.45)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 1 }}>DOB</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#1c1c1e" }}>15 Jan 1958</p>
                </div>
                <div>
                  <p style={{ fontSize: 9, color: "rgba(0,0,0,0.45)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 1 }}>Sex</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#1c1c1e" }}>Male</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card footer */}
          <div style={{ background: "rgba(0,0,0,0.07)", padding: "7px 18px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 10, color: "rgba(0,0,0,0.4)", fontWeight: 600 }}>Singapore Citizen</span>
            <span style={{ fontSize: 10, color: "rgba(0,0,0,0.4)", fontWeight: 600 }}>Singpass Verified ✓</span>
          </div>
        </div>

        {/* Full details card — fields in specified order */}
        <div style={{
          background: "#ffffff", borderRadius: 18, padding: "20px 18px",
          boxShadow: "0 1px 6px rgba(0,0,0,0.06)", marginBottom: 16,
        }}>
          <p style={{
            fontSize: 11, fontWeight: 700, color: "#8e8e93",
            textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 18,
          }}>
            Identity Details
          </p>

          <Field label="Name"                    value="TAN AH KOW" />
          <Field label="NRIC Number"             value="S5812346A" mono />
          <Field label="Date of Birth"           value="15 January 1958" />
          <Field label="Sex"                     value="Male" />
          <Field label="Nationality / Citizenship" value="Singapore Citizen" />
          <Field label="Date of Issue"           value="3 March 2008" />
          <Field
            label="Address"
            value={"Blk 123 Ang Mo Kio Avenue 6\n#08-456\nSingapore 560123"}
            last
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <SimulatorBadge />
        </div>
      </div>

      <div style={{ padding: "10px 16px 36px", background: "#f2f2f7", flexShrink: 0 }}>
        <button onClick={onBack} style={{
          width: "100%", height: 50, borderRadius: 13,
          background: "#ffffff", color: "#e2231a", fontSize: 15, fontWeight: 700,
          border: "1.5px solid rgba(226,35,26,0.2)", cursor: "pointer",
          fontFamily: "'Poppins', sans-serif",
        }}>
          ← Back
        </button>
      </div>
    </div>
  );
}
