import { useState } from "react";
import cpfLogo from "@/imports/image-4.png";
import { Settings, MoreHorizontal, Home, QrCode, Inbox, CheckCircle, Circle } from "lucide-react";
import { SimulatorBadge } from "../SimulatorBadge";
import { PasscodeModal } from "../PasscodeModal";
import type { Activity } from "../../../App";

interface Props {
  completed: Set<Activity>;
  onDigitalIC: () => void;
  onInbox: () => void;
  onHealthHub: () => void;
}

// Faithful replica of the real Singpass pink NRIC card
function NricCard({ onViewFull }: { onViewFull: () => void }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{
        borderRadius: 16, overflow: "hidden",
        background: "linear-gradient(135deg, #fde8e8 0%, #f9c8c6 35%, #f4a8a5 65%, #ee9090 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.13)",
        border: "1px solid rgba(255,255,255,0.6)",
      }}>
        {/* Card top: red header bar */}
        <div style={{ background: "#e2231a", padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: "#ffffff", letterSpacing: "0.08em", lineHeight: 1.2 }}>REPUBLIC OF SINGAPORE</p>
            <p style={{ fontSize: 8.5, fontWeight: 500, color: "rgba(255,255,255,0.85)", letterSpacing: "0.06em" }}>NATIONAL DIGITAL IDENTITY CARD</p>
          </div>
          {/* Lion crest */}
          <div style={{ width: 36, height: 36, borderRadius: 6, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
            🦁
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: "14px 14px 12px", display: "flex", gap: 14, alignItems: "center", position: "relative" }}>
          {/* Faint watermark swirl */}
          <div style={{ position: "absolute", right: 10, top: 0, bottom: 0, display: "flex", alignItems: "center", opacity: 0.07, fontSize: 90, pointerEvents: "none", userSelect: "none" }}>🦁</div>

          {/* Photo placeholder */}
          <div style={{
            width: 68, height: 82, borderRadius: 6, overflow: "hidden", flexShrink: 0,
            background: "rgba(255,255,255,0.35)", border: "1.5px solid rgba(255,255,255,0.5)",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
          }}>
            <svg viewBox="0 0 68 82" width="68" height="82" fill="none">
              <rect width="68" height="82" fill="rgba(200,160,150,0.3)" />
              {/* Simple person silhouette */}
              <circle cx="34" cy="26" r="14" fill="rgba(150,100,80,0.5)" />
              <ellipse cx="34" cy="70" rx="26" ry="18" fill="rgba(120,80,60,0.4)" />
            </svg>
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 9, color: "rgba(0,0,0,0.5)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 1 }}>Name</p>
            <p style={{ fontSize: 14, fontWeight: 800, color: "#1c1c1e", marginBottom: 10, letterSpacing: "-0.1px" }}>TAN AH KOW</p>

            <p style={{ fontSize: 9, color: "rgba(0,0,0,0.5)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>NRIC number</p>
            <p style={{ fontSize: 15, fontWeight: 800, color: "#1c1c1e", fontFamily: "monospace", letterSpacing: "0.08em" }}>
              S<span style={{ color: "#e2231a" }}>••••</span>346A
            </p>
          </div>
        </div>
      </div>

      {/* Show barcode / View full link below card */}
      <button
        onClick={onViewFull}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          marginTop: 10, width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: "4px 0",
        }}
      >
        {/* Barcode icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          {[0,2,3,5,6,8,9,11,12,14].map((x, i) => (
            <rect key={i} x={x} y={1} width={i % 3 === 0 ? 2 : 1} height={14} fill="#e2231a" />
          ))}
        </svg>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#e2231a" }}>Show full details</span>
      </button>
    </div>
  );
}

// Card tab pill
function CardTab({ label, active }: { label: string; active: boolean }) {
  return (
    <div style={{
      padding: "6px 14px", borderRadius: 20,
      background: active ? "#e2231a" : "#ffffff",
      border: active ? "none" : "1.5px solid #e5e5ea",
      fontSize: 13, fontWeight: 600,
      color: active ? "#ffffff" : "#636366",
      cursor: "pointer", flexShrink: 0,
    }}>
      {label}
    </div>
  );
}

// My Profile icon row
const profileItems = [
  { emoji: "📁", label: "Documents" },
  { emoji: "👤", label: "Personal" },
  { emoji: "💵", label: "Finance" },
  { emoji: "🚗", label: "Vehicle" },
];

function GovLogo({ src, bg, alt, pad = 8 }: { src: string; bg: string; alt: string; pad?: number }) {
  return (
    <div style={{
      width: 56, height: 56, borderRadius: "50%", background: bg, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.12)", overflow: "hidden",
    }}>
      <img
        src={src}
        alt={alt}
        style={{ width: 56 - pad * 2, height: 56 - pad * 2, objectFit: "contain" }}
        onError={e => { (e.currentTarget.style.display = "none"); }}
      />
    </div>
  );
}

const favourites = [
  {
    label: "CPF",
    sub: "Digital Services",
    key: null,
    logo: () => (
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: "transparent", border: "1.5px solid rgba(0,135,61,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
        <div style={{ width: 50, height: 50, borderRadius: 12, backgroundColor: "#005B52", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: 14, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>CPF</div>
      </div>
    ),
  },
  {
    label: "HealthHub",
    sub: "",
    key: "healthhub",
    logo: () => <GovLogo src="https://cdn.healthhub.sg/-/media/project/synapxe/healthhub/logo/healthhub-logo/healthhub-logo.svg" bg="#ffffff" alt="HealthHub" pad={6} />,
  },
  {
    label: "MyICA",
    sub: "",
    key: null,
    logo: () => <GovLogo src="https://www.google.com/s2/favicons?domain=ica.gov.sg&sz=128" bg="#ffffff" alt="ICA" pad={8} />,
  },
  {
    label: "IRAS",
    sub: "myTax Portal",
    key: null,
    logo: () => <GovLogo src="https://www.google.com/s2/favicons?domain=iras.gov.sg&sz=128" bg="#ffffff" alt="IRAS" pad={8} />,
  },
  {
    label: "HDB",
    sub: "e-Services",
    key: null,
    logo: () => <GovLogo src="https://www.google.com/s2/favicons?domain=hdb.gov.sg&sz=128" bg="#ffffff" alt="HDB" pad={8} />,
  },
  {
    label: "SkillsFuture",
    sub: "Credits",
    key: null,
    logo: () => <div style={{ width: "100%", height: "100%", borderRadius: 12, backgroundColor: "#002B49", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: 11, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>SF</div>,
  },
];

const practiceSteps = [
  { key: "digitalic" as Activity, label: "View Digital IC" },
  { key: "message"   as Activity, label: "Read CPF Message" },
  { key: "healthhub" as Activity, label: "Access HealthHub" },
];

export function HomeScreen({ completed, onDigitalIC, onInbox, onHealthHub }: Props) {
  const [showPasscode, setShowPasscode] = useState(false);
  const doneCount = completed.size;

  const handleViewFull = () => setShowPasscode(true);
  const handlePasscodeSuccess = () => { setShowPasscode(false); onDigitalIC(); };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f2f2f7", fontFamily: "'Poppins', sans-serif", position: "relative" }}>

      {/* Passcode modal overlay */}
      {showPasscode && (
        <PasscodeModal onSuccess={handlePasscodeSuccess} onCancel={() => setShowPasscode(false)} />
      )}

      {/* ── Floating progress card — hovers above My Cards ── */}
      <div style={{
        position: "absolute", left: 16, right: 16, zIndex: 50,
        top: 148,
        background: doneCount === 3 ? "#f0faf4" : "#ffffff",
        borderRadius: 16,
        boxShadow: "0 4px 20px rgba(0,0,0,0.13)",
        border: `1.5px solid ${doneCount === 3 ? "rgba(52,199,89,0.35)" : "rgba(226,35,26,0.15)"}`,
        padding: "12px 14px",
        transition: "all 0.3s ease",
        pointerEvents: "none",
      }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: doneCount === 3 ? "#1c7a50" : "#1c1c1e" }}>
            {doneCount === 3 ? "🎉 All activities complete!" : "Today's Practice"}
          </p>
          <span style={{
            fontSize: 12, fontWeight: 700,
            color: doneCount === 3 ? "#34c759" : "#e2231a",
            background: doneCount === 3 ? "rgba(52,199,89,0.12)" : "rgba(226,35,26,0.08)",
            borderRadius: 20, padding: "2px 8px",
          }}>
            {doneCount} of 3
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, borderRadius: 4, background: "#f2f2f7", marginBottom: 8, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 4,
            background: doneCount === 3 ? "#34c759" : "#e2231a",
            width: `${(doneCount / 3) * 100}%`,
            transition: "width 0.4s ease",
          }} />
        </div>

        {/* Step list — vertical so labels are never truncated */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {practiceSteps.map((step) => {
            const done = completed.has(step.key);
            return (
              <div key={step.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {done
                  ? <CheckCircle size={13} color="#34c759" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  : <Circle size={13} color="#c7c7cc" strokeWidth={2} style={{ flexShrink: 0 }} />}
                <span style={{
                  fontSize: 11, fontWeight: done ? 700 : 500, lineHeight: 1.3,
                  color: done ? "#1c7a50" : "#8e8e93",
                }}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>

        {/* ── White header section ── */}
        <div style={{ background: "#ffffff", padding: "52px 20px 20px" }}>
          {/* Top row: greeting + settings */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 14, color: "#636366", fontWeight: 500, marginBottom: 2 }}>Welcome back,</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: "#1c1c1e", letterSpacing: "-0.4px", lineHeight: 1.15 }}>Tan Ah Kow</p>
            </div>
            <button style={{ width: 38, height: 38, borderRadius: "50%", background: "#f2f2f7", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 4 }}>
              <Settings size={20} color="#636366" strokeWidth={1.8} />
            </button>
          </div>

          {/* Spacer so My Cards clears the taller floating progress card */}
          <div style={{ height: 150 }} />

          {/* ── My Cards ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <p style={{ fontSize: 17, fontWeight: 800, color: "#1c1c1e" }}>My Cards</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <MoreHorizontal size={20} color="#8e8e93" strokeWidth={2} />
              {/* Scan/eye icon */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 5V3h3M15 3h3v2M2 15v2h3M15 17h3v-2" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card type tabs */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none", marginBottom: 14 }}>
            <CardTab label="NRIC" active={true} />
            <CardTab label="Driving Licence" active={false} />
            <CardTab label="CHAS card" active={false} />
          </div>

          {/* NRIC card */}
          <NricCard onViewFull={handleViewFull} />
        </div>

        {/* ── My Profile ── */}
        <div style={{ background: "#ffffff", marginTop: 10, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <p style={{ fontSize: 17, fontWeight: 800, color: "#1c1c1e" }}>My Profile</p>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#e2231a", cursor: "pointer" }}>View all</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {profileItems.map(item => (
              <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
                  {item.emoji}
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#1c1c1e", textAlign: "center", lineHeight: 1.3 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Favourites ── */}
        <div style={{ background: "#ffffff", marginTop: 10, padding: "18px 20px 20px" }}>
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <p style={{ fontSize: 17, fontWeight: 800, color: "#1c1c1e" }}>Favourites</p>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#e2231a", cursor: "pointer" }}>Edit Favourites</span>
          </div>

          {/* Subtitle */}
          <p style={{ fontSize: 13, color: "#636366", lineHeight: 1.55, marginBottom: 14 }}>
            Customise your favourite shortcuts. We show the most popular shortcuts by default.
          </p>

          {/* Icon grid */}
          <div style={{
            padding: "4px 0 12px",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px 8px" }}>
              {favourites.map((fav) => (
                <button
                  key={fav.label}
                  onClick={() => { if (fav.key === "healthhub") onHealthHub(); }}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
                    background: "none", border: "none",
                    cursor: fav.key ? "pointer" : "default",
                    padding: 0,
                  }}
                >
                  {fav.logo()}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                    <span style={{
                      fontSize: 12, fontWeight: 600, color: "#1c1c1e",
                      textAlign: "center", lineHeight: 1.3, maxWidth: 80,
                      wordBreak: "break-word",
                    }}>
                      {fav.label}
                    </span>
                    {fav.sub && (
                      <span style={{
                        fontSize: 10, color: "#8e8e93", textAlign: "center",
                        lineHeight: 1.2, maxWidth: 80, wordBreak: "break-word",
                      }}>
                        {fav.sub}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: "14px 0 12px", display: "flex", justifyContent: "center" }}>
          <SimulatorBadge />
        </div>
      </div>

      {/* ── Bottom tab bar ── */}
      <div style={{
        background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.08)",
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", paddingBottom: 24,
        flexShrink: 0,
      }}>
        {[
          { icon: Home, label: "HOME", active: true, action: undefined },
          { icon: QrCode, label: "SCAN", active: false, action: undefined },
          { icon: Inbox, label: "INBOX", active: false, action: onInbox },
        ].map(item => (
          <button
            key={item.label}
            onClick={() => item.action?.()}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, paddingTop: 10, background: "none", border: "none", cursor: "pointer" }}
          >
            <div style={{ position: "relative", display: "inline-flex" }}>
              <item.icon size={24} color={item.active ? "#e2231a" : "#8e8e93"} strokeWidth={item.active ? 2.5 : 1.8} />
              {item.label === "INBOX" && !completed.has("message") && (
                <span style={{
                  position: "absolute",
                  top: -2,
                  right: -4,
                  minWidth: 16,
                  height: 16,
                  borderRadius: 8,
                  background: "#e2231a",
                  color: "#ffffff",
                  fontSize: 10,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 4px",
                  border: "1.5px solid #ffffff"
                }}>1</span>
              )}
            </div>
            <span style={{ fontSize: 10, fontWeight: item.active ? 800 : 500, color: item.active ? "#e2231a" : "#8e8e93", letterSpacing: "0.04em" }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
