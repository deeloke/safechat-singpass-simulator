import { ArrowLeft, ExternalLink } from "lucide-react";
import { SingpassLogo } from "../SingpassLogo";
import { SimulatorBadge } from "../SimulatorBadge";

interface Props { onBack: () => void }

export function MessageDetailScreen({ onBack }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f2f2f7", fontFamily: "'Poppins', sans-serif" }}>
      {/* Nav */}
      <div style={{ background: "#ffffff", paddingTop: 52, paddingBottom: 14, paddingLeft: 16, paddingRight: 16, borderBottom: "1px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: "50%", background: "#f2f2f7", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ArrowLeft size={18} color="#1c1c1e" strokeWidth={2} />
        </button>
        <SingpassLogo size={20} />
        <span style={{ fontSize: 13, color: "#8e8e93", fontWeight: 500 }}>/ Inbox</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px", scrollbarWidth: "none" }}>

        {/* Message card */}
        <div style={{ background: "#ffffff", borderRadius: 18, overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>

          {/* CPF green header band */}
          <div style={{ background: "linear-gradient(135deg, #00873d, #006830)", padding: "20px 20px 18px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>CPF Board</p>
            <p style={{ fontSize: 17, fontWeight: 800, color: "#ffffff", lineHeight: 1.3 }}>
              Your 2099 Statement of Account is ready
            </p>
          </div>

          {/* CPF logo band */}
          <div style={{ background: "#f0faf4", padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", overflow: "hidden" }}>
              <img
                src="https://www.cpf.gov.sg/content/dam/web/global/global-header/cpf-logo.svg"
                alt="CPF Board"
                style={{ width: 42, height: 42, objectFit: "contain" }}
              />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#00873d" }}>Central Provident Fund Board</p>
              <p style={{ fontSize: 11, color: "#8e8e93", marginTop: 1 }}>Official Singapore Government Message</p>
            </div>
          </div>

          {/* Message body */}
          <div style={{ padding: "20px 20px 24px" }}>
            <p style={{ fontSize: 15, color: "#3a3a3c", lineHeight: 1.75, marginBottom: 0 }}>
              Dear <strong style={{ color: "#1c1c1e", fontFamily: "'Courier New', monospace", letterSpacing: "0.04em" }}>SXXXX346A</strong>,
            </p>
            <p style={{ fontSize: 15, color: "#3a3a3c", lineHeight: 1.75, marginTop: 14, marginBottom: 14 }}>
              Your latest <strong style={{ color: "#1c1c1e" }}>CPF Yearly Statement of Account</strong> is ready for viewing. Check your balances, interest earned, CPF transactions and Government grants you have received.
            </p>
            <p style={{ fontSize: 15, color: "#3a3a3c", lineHeight: 1.75, marginBottom: 22 }}>
              Tap on the button below and log in to the CPF website with your Singpass to view your statement.
            </p>

            <button style={{
              width: "100%", height: 50, borderRadius: 13,
              background: "linear-gradient(135deg, #00873d, #006830)",
              color: "#ffffff", fontSize: 15, fontWeight: 700,
              border: "none", cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: "0 4px 14px rgba(0,135,61,0.3)",
            }}>
              <ExternalLink size={16} strokeWidth={2.5} />
              View Statement on CPF Website
            </button>

            <p style={{ fontSize: 11, color: "#aeaeb2", textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
              This is a simulated message. No real CPF data is accessed.
            </p>
          </div>
        </div>

        {/* Meta row */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 4px", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: "#8e8e93" }}>Received: 24 July 2099, 10:32 AM</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#34c759" }}>✓ Read</span>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 8, marginBottom: 4 }}>
          <SimulatorBadge />
        </div>
      </div>

      <div style={{ padding: "10px 16px 36px", background: "#f2f2f7", flexShrink: 0 }}>
        <button onClick={onBack} style={{
          width: "100%", height: 52, borderRadius: 13, background: "#e2231a",
          color: "#fff", fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer",
          fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 14px rgba(226,35,26,0.28)",
        }}>
          Back to Inbox
        </button>
      </div>
    </div>
  );
}
