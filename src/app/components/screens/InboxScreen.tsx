import { ArrowLeft, ChevronRight } from "lucide-react";
import { SingpassLogo } from "../SingpassLogo";
import { SimulatorBadge } from "../SimulatorBadge";

interface Props {
  onBack: () => void;
  onMessage: () => void;
}

const messages = [
  {
    id: "cpf",
    sender: "CPF Board",
    subject: "Your 2099 Statement of Account is ready",
    preview: "Your latest CPF Yearly Statement of Account is ready for viewing.",
    time: "10:32 AM",
    unread: true,
    emoji: "💰",
    emojiColor: "#fef2f2",
  },
  {
    id: "healthhub",
    sender: "HealthHub",
    subject: "Appointment Reminder",
    preview: "You have an upcoming appointment at Tan Tock Seng Hospital on 28 Jul 2026.",
    time: "Yesterday",
    unread: false,
    emoji: "🏥",
    emojiColor: "#f2f2f7",
  },
  {
    id: "iras",
    sender: "IRAS",
    subject: "Notice of Assessment",
    preview: "Your Notice of Assessment for Year of Assessment 2026 is ready.",
    time: "20 Jul",
    unread: false,
    emoji: "🧾",
    emojiColor: "#f2f2f7",
  },
];

export function InboxScreen({ onBack, onMessage }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f2f2f7", fontFamily: "'Poppins', sans-serif" }}>
      {/* Nav */}
      <div style={{ background: "#ffffff", paddingTop: 52, paddingBottom: 16, paddingLeft: 16, paddingRight: 20, borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: "50%", background: "#f2f2f7", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ArrowLeft size={18} color="#1c1c1e" strokeWidth={2} />
          </button>
          <SingpassLogo size={20} />
          <span style={{ fontSize: 13, color: "#8e8e93", fontWeight: 500 }}>/ Inbox</span>
          <span style={{ marginLeft: "auto", background: "#e2231a", color: "#fff", fontSize: 11, fontWeight: 700, borderRadius: 20, padding: "2px 8px" }}>1 New</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 16px", scrollbarWidth: "none" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>Messages</p>

        <div style={{ background: "#ffffff", borderRadius: 18, overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
          {messages.map((msg, i) => (
            <button
              key={msg.id}
              onClick={() => msg.id === "cpf" ? onMessage() : undefined}
              style={{
                width: "100%", display: "flex", alignItems: "flex-start", gap: 12,
                padding: "14px 16px", background: msg.unread ? "#fffafa" : "#ffffff",
                border: "none", cursor: msg.id === "cpf" ? "pointer" : "default", textAlign: "left",
                borderBottom: i < messages.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
              }}
            >
              {/* Unread dot */}
              <div style={{ paddingTop: 6, flexShrink: 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: msg.unread ? "#e2231a" : "transparent" }} />
              </div>

              {/* Icon */}
              <div style={{ width: 44, height: 44, borderRadius: 12, background: msg.emojiColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                {msg.emoji}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: msg.unread ? 800 : 600, color: "#1c1c1e" }}>{msg.sender}</span>
                  <span style={{ fontSize: 11, color: "#8e8e93", flexShrink: 0, marginLeft: 8, fontWeight: msg.unread ? 600 : 400 }}>{msg.time}</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: msg.unread ? 700 : 600, color: msg.unread ? "#1c1c1e" : "#3a3a3c", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{msg.subject}</p>
                <p style={{ fontSize: 12, color: "#8e8e93", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{msg.preview}</p>
              </div>

              <ChevronRight size={16} color="#c7c7cc" strokeWidth={2} style={{ flexShrink: 0, marginTop: 14 }} />
            </button>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <SimulatorBadge />
        </div>
      </div>
    </div>
  );
}
