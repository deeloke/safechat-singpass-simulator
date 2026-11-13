import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { SingpassLogo } from "../SingpassLogo";
import { SimulatorBadge } from "../SimulatorBadge";

interface Props { onLogin: () => void }

export function LoginScreen({ onLogin }: Props) {
  const [nric, setNric] = useState("");
  const [passcode, setPasscode] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);

  const attempt = () => {
    if (nric.trim().toUpperCase() === "S5812346A" && passcode === "123456") {
      setError(false);
      onLogin();
    } else {
      setError(true);
    }
  };

  const inputStyle = (err: boolean): React.CSSProperties => ({
    width: "100%", height: 52, borderRadius: 12,
    border: err ? "1.5px solid #e2231a" : "1.5px solid #e5e5ea",
    background: "#f2f2f7", padding: "0 16px",
    fontSize: 16, fontWeight: 500, color: "#1c1c1e",
    fontFamily: "'Poppins', sans-serif", outline: "none", boxSizing: "border-box",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f2f2f7", fontFamily: "'Poppins', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#ffffff", paddingTop: 52, paddingBottom: 28, paddingLeft: 24, paddingRight: 24, borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <SingpassLogo size={26} />
        <p style={{ fontSize: 13, color: "#8e8e93", marginTop: 6 }}>Sign in to your account</p>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", scrollbarWidth: "none" }}>
        {/* Demo hint */}
        <div style={{
          background: "#f0faf8", border: "1.5px dashed #34c759", borderRadius: 14,
          padding: "13px 16px", marginBottom: 18, display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1c7a50", marginBottom: 4 }}>Demo Account</p>
            <p style={{ fontSize: 14, color: "#1c1c1e", lineHeight: 1.6 }}>
              NRIC: <strong style={{ fontFamily: "monospace", letterSpacing: "0.06em" }}>S9123456A</strong><br />
              Passcode: <strong>123456</strong>
            </p>
          </div>
        </div>

        {/* Form card */}
        <div style={{ background: "#ffffff", borderRadius: 18, padding: "22px 18px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          <p style={{ fontSize: 19, fontWeight: 800, color: "#1c1c1e", marginBottom: 20 }}>Log In</p>

          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#8e8e93", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            NRIC / FIN
          </label>
          <input
            type="text"
            value={nric}
            maxLength={9}
            onChange={e => { setNric(e.target.value); setError(false); }}
            placeholder="e.g. S9123456A"
            style={{ ...inputStyle(error), marginBottom: 16 }}
          />

          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#8e8e93", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            6-Digit Passcode
          </label>
          <div style={{ position: "relative", marginBottom: error ? 14 : 22 }}>
            <input
              type={showPass ? "text" : "password"}
              value={passcode}
              maxLength={6}
              inputMode="numeric"
              onChange={e => { setPasscode(e.target.value); setError(false); }}
              placeholder="••••••"
              style={{ ...inputStyle(error), paddingRight: 48, letterSpacing: showPass ? "normal" : "0.18em" }}
            />
            <button
              onClick={() => setShowPass(v => !v)}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 4, color: "#8e8e93" }}
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div style={{ background: "#fff2f2", border: "1px solid rgba(226,35,26,0.2)", borderRadius: 10, padding: "11px 14px", marginBottom: 16, display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ color: "#e2231a", fontSize: 15, flexShrink: 0 }}>⚠️</span>
              <p style={{ fontSize: 13, color: "#e2231a", lineHeight: 1.5 }}>
                Incorrect NRIC or passcode. Please use the demo account provided.
              </p>
            </div>
          )}

          <button onClick={attempt} style={{
            width: "100%", height: 52, borderRadius: 13, background: "#e2231a",
            color: "#fff", fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer",
            fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 14px rgba(226,35,26,0.28)",
          }}>
            Log In
          </button>

          <p style={{ fontSize: 13, color: "#e2231a", textAlign: "center", marginTop: 16, fontWeight: 600 }}>
            Forgot passcode?
          </p>
        </div>

        <p style={{ fontSize: 12, color: "#aeaeb2", textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
          This simulator uses fictional data only.<br />No real Singpass account is needed.
        </p>
      </div>

      <div style={{ padding: "8px 0 32px", display: "flex", justifyContent: "center" }}>
        <SimulatorBadge />
      </div>
    </div>
  );
}
