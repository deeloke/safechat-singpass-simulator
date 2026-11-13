import { useState, useCallback, type ReactNode } from "react";
import { SplashScreen } from "./components/screens/SplashScreen";
import { TodaysPracticeScreen } from "./components/screens/TodaysPracticeScreen";
import { HomeScreen } from "./components/screens/HomeScreen";
import { DigitalICScreen } from "./components/screens/DigitalICScreen";
import { InboxScreen } from "./components/screens/InboxScreen";
import { MessageDetailScreen } from "./components/screens/MessageDetailScreen";
import { HealthHubLoadingScreen } from "./components/screens/HealthHubLoadingScreen";
import { SuccessScreen } from "./components/screens/SuccessScreen";
import { AllDoneScreen } from "./components/screens/AllDoneScreen";

type Screen =
  | "splash" | "practice" | "home"
  | "digitalic" | "inbox" | "message"
  | "healthhub-loading" | "healthhub-success"
  | "all-done";

export type Activity = "digitalic" | "message" | "healthhub";

const noop = () => {};
const emptyCompleted = new Set<Activity>();

function PhoneShell({ children, minimal = false }: { children: ReactNode; minimal?: boolean }) {
  return (
    <div style={{
      width: 393, height: 852, borderRadius: 54, background: "#101010",
      boxShadow: minimal
        ? "0 2px 10px rgba(0,0,0,0.5)"
        : ["0 0 0 1px #333","0 0 0 4px #1a1a1a","0 0 0 5px #444","0 60px 120px rgba(0,0,0,0.8)"].join(", "),
      position: "relative", flexShrink: 0, overflow: "hidden",
    }}>
      <div style={{ position: "absolute", left: -4, top: 120, width: 4, height: 34, background: "#333", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", left: -4, top: 168, width: 4, height: 66, background: "#333", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", left: -4, top: 248, width: 4, height: 66, background: "#333", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", right: -4, top: 180, width: 4, height: 88, background: "#333", borderRadius: "0 2px 2px 0" }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 54, overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 13, left: "50%", transform: "translateX(-50%)",
          width: 130, height: 38, background: "#000", borderRadius: 22, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
        }}>
          <div style={{ width: 13, height: 13, borderRadius: "50%", background: "#111", border: "1px solid #222" }} />
          <div style={{ width: 18, height: 10, borderRadius: 10, background: "#111" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {children}
        </div>
        <div style={{
          position: "absolute", bottom: 9, left: "50%", transform: "translateX(-50%)",
          width: 130, height: 5, borderRadius: 3, background: "rgba(200,200,200,0.4)", zIndex: 100,
        }} />
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [completed, setCompleted] = useState<Set<Activity>>(new Set());
  const [overview, setOverview] = useState(false);

  const complete = useCallback((a: Activity) =>
    setCompleted(prev => new Set([...prev, a])), []);

  const go = useCallback((s: Screen) => setScreen(s), []);

  const allDone = completed.size === 3;

  const handleHealthHubDone = useCallback(() => {
    complete("healthhub");
    go("healthhub-success");
  }, [complete, go]);

  const overviewScreens: Array<{ key: Screen; label: string; content: ReactNode }> = [
    { key: "splash",            label: "1. Splash",            content: <SplashScreen onNext={noop} /> },
    { key: "practice",          label: "2. Today's Practice",  content: <TodaysPracticeScreen onNext={noop} /> },
    { key: "home",              label: "3. Home",              content: <HomeScreen completed={emptyCompleted} onDigitalIC={noop} onInbox={noop} onHealthHub={noop} /> },
    { key: "digitalic",         label: "4. Digital IC",        content: <DigitalICScreen onBack={noop} /> },
    { key: "inbox",             label: "5. Inbox",             content: <InboxScreen onBack={noop} onMessage={noop} /> },
    { key: "message",           label: "6. CPF Message",       content: <MessageDetailScreen onBack={noop} /> },
    { key: "healthhub-loading", label: "7. HH Loading",        content: <HealthHubLoadingScreen onDone={noop} /> },
    { key: "healthhub-success", label: "8. HH Success",        content: <SuccessScreen allDone={false} completed={emptyCompleted} onFinish={noop} /> },
    { key: "all-done",          label: "9. All Done",          content: <AllDoneScreen onRestart={noop} /> },
  ];

  return (
    <div style={{
      minHeight: "100vh", background: "#1a1a2e",
      fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <button
        onClick={() => setOverview(v => !v)}
        style={{
          position: "fixed", top: 16, right: 16, zIndex: 2000,
          background: overview ? "#e2231a" : "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.22)",
          color: "#ffffff", fontSize: 12, fontWeight: 700,
          borderRadius: 20, padding: "7px 14px", cursor: "pointer",
          fontFamily: "'Poppins', sans-serif", letterSpacing: "0.02em",
        }}
      >
        {overview ? "✕ Close Overview" : "⊞ All Screens"}
      </button>

      {overview && (
        <div style={{ minHeight: "100vh", overflowY: "auto", padding: "64px 16px 48px" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px 10px", maxWidth: 440, margin: "0 auto",
          }}>
            {overviewScreens.map(({ key, label, content }) => (
              <div
                key={key}
                onClick={() => { setOverview(false); go(key); }}
                style={{ cursor: "pointer" }}
              >
                <p style={{
                  fontSize: 8.5, fontWeight: 700, textAlign: "center", marginBottom: 5,
                  color: key === screen ? "#e2231a" : "rgba(255,255,255,0.4)",
                  textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: 1.4,
                }}>
                  {label}
                </p>
                <div style={{
                  width: Math.round(393 * 0.32),
                  height: Math.round(852 * 0.32),
                  borderRadius: Math.round(54 * 0.32),
                  overflow: "hidden",
                  boxShadow: key === screen
                    ? "0 0 0 2px #e2231a, 0 4px 14px rgba(0,0,0,0.6)"
                    : "0 2px 10px rgba(0,0,0,0.45)",
                  pointerEvents: "none",
                }}>
                  <div style={{ transform: "scale(0.32)", transformOrigin: "top left", width: 393, height: 852 }}>
                    <PhoneShell minimal>{content}</PhoneShell>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!overview && (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
            <PhoneShell>
              {screen === "splash" && (
                <SplashScreen onNext={() => go("practice")} />
              )}
              {screen === "practice" && (
                <TodaysPracticeScreen onNext={() => go("home")} />
              )}
              {screen === "home" && (
                <HomeScreen
                  completed={completed}
                  onDigitalIC={() => { complete("digitalic"); go("digitalic"); }}
                  onInbox={() => go("inbox")}
                  onHealthHub={() => go("healthhub-loading")}
                />
              )}
              {screen === "digitalic" && (
                <DigitalICScreen onBack={() => go("home")} />
              )}
              {screen === "inbox" && (
                <InboxScreen
                  onBack={() => go("home")}
                  onMessage={() => { complete("message"); go("message"); }}
                />
              )}
              {screen === "message" && (
                <MessageDetailScreen onBack={() => go("inbox")} />
              )}
              {screen === "healthhub-loading" && (
                <HealthHubLoadingScreen onDone={handleHealthHubDone} />
              )}
              {screen === "healthhub-success" && (
                <SuccessScreen
                  allDone={allDone}
                  completed={completed}
                  onFinish={() => allDone ? go("all-done") : go("home")}
                />
              )}
              {screen === "all-done" && (
                <AllDoneScreen onRestart={() => { setCompleted(new Set()); go("home"); }} />
              )}
            </PhoneShell>
          </div>

          <p style={{
            position: "fixed", bottom: 18, left: 0, right: 0,
            textAlign: "center", fontSize: 11,
            color: "rgba(255,255,255,0.2)", letterSpacing: "0.04em",
          }}>
            Singpass Learning Simulator — Educational use only
          </p>
        </>
      )}
    </div>
  );
}
