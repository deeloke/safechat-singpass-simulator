import { useState, useEffect } from "react";
import { X, Delete } from "lucide-react";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const DEMO_PASSCODE = "123456";

const dialPad = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["", "0", "⌫"],
];

export function PasscodeModal({ onSuccess, onCancel }: Props) {
  const [digits, setDigits] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  const [hint, setHint] = useState(false);

  const press = (key: string) => {
    if (key === "⌫") {
      setDigits(d => d.slice(0, -1));
      return;
    }
    if (key === "") return;
    if (digits.length >= 6) return;
    const next = [...digits, key];
    setDigits(next);
    if (next.length === 6) {
      if (next.join("") === DEMO_PASSCODE) {
        setTimeout(onSuccess, 180);
      } else {
        setTimeout(() => {
          setShake(true);
          setHint(true);
          setDigits([]);
          setTimeout(() => setShake(false), 500);
        }, 120);
      }
    }
  };

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 200,
      display: "flex", flexDirection: "column",
      background: "#ffffff", fontFamily: "'Poppins', sans-serif",
    }}>
      {/* Header */}
      <div style={{ paddingTop: 54, paddingBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "54px 20px 12px" }}>
        <div />
        <p style={{ fontSize: 17, fontWeight: 700, color: "#1c1c1e" }}>Enter Passcode</p>
        <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <X size={22} color="#8e8e93" strokeWidth={2} />
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0, padding: "0 24px" }}>
        {/* IC icon */}
        <div style={{ width: 64, height: 64, borderRadius: 18, background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, fontSize: 32 }}>
          🪪
        </div>

        <p style={{ fontSize: 17, fontWeight: 700, color: "#1c1c1e", marginBottom: 4 }}>Digital IC</p>
        <p style={{ fontSize: 13, color: "#8e8e93", marginBottom: 36, textAlign: "center", lineHeight: 1.5 }}>
          Enter your 6-digit passcode to view your full Digital IC details
        </p>

        {/* Dot indicators */}
        <div
          style={{
            display: "flex", gap: 14, marginBottom: 10,
            animation: shake ? "shake 0.4s ease" : "none",
          }}
        >
          <style>{`
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              20% { transform: translateX(-8px); }
              40% { transform: translateX(8px); }
              60% { transform: translateX(-6px); }
              80% { transform: translateX(6px); }
            }
          `}</style>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              width: 14, height: 14, borderRadius: "50%",
              background: i < digits.length ? "#e2231a" : "transparent",
              border: `2px solid ${i < digits.length ? "#e2231a" : "#c7c7cc"}`,
              transition: "all 0.15s ease",
            }} />
          ))}
        </div>

        {hint && (
          <p style={{ fontSize: 12, color: "#e2231a", marginBottom: 8, fontWeight: 600 }}>
            Incorrect passcode. Use demo: 123456
          </p>
        )}
        {!hint && <div style={{ height: 20 }} />}

        {/* Dial pad */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, width: "100%", maxWidth: 300, marginTop: 8 }}>
          {dialPad.flat().map((key, i) => (
            <button
              key={i}
              onClick={() => press(key)}
              style={{
                height: 72, borderRadius: 18,
                background: key === "" ? "transparent" : key === "⌫" ? "#f2f2f7" : "#f2f2f7",
                border: "none", cursor: key === "" ? "default" : "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                fontSize: key === "⌫" ? 14 : 26, fontWeight: 500, color: "#1c1c1e",
                fontFamily: "'Poppins', sans-serif",
                transition: "background 0.1s",
                visibility: key === "" ? "hidden" : "visible",
              }}
              onMouseDown={e => { if (key !== "") (e.currentTarget.style.background = "#e5e5ea"); }}
              onMouseUp={e => { if (key !== "") (e.currentTarget.style.background = "#f2f2f7"); }}
            >
              {key === "⌫" ? <Delete size={22} color="#1c1c1e" strokeWidth={1.8} /> : key}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 24px 40px" }}>
        <button onClick={onCancel} style={{ width: "100%", height: 48, borderRadius: 13, background: "none", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 600, color: "#e2231a", fontFamily: "'Poppins', sans-serif" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
