export function SingpassLogo({ size = 22, dark = false }: { size?: number; dark?: boolean }) {
  const singColor = dark ? "#ffffff" : "#1c1c1e";
  const passColor = "#e2231a";
  return (
    <span style={{ fontSize: size, fontFamily: "'Poppins', sans-serif", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.3px" }}>
      <span style={{ color: singColor }}>sing</span><span style={{ color: passColor }}>pass</span>
    </span>
  );
}
