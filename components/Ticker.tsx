"use client";

const items = [
  "Stage 1",
  "Stage 2",
  "Stage 3",
  "E85 Éthanol",
  "N.LINK",
  "Reprogrammation Moteur",
  "Diagnostic Approfondi",
  "Clonage Calculateur",
  "Réparation ECU",
  "Clés & Serrures",
  "Boîte DSG",
  "BSI / UCH / BCM",
  "Rectification Kilométrique",
];

export default function Ticker() {
  return (
    <div
      style={{
        background: "#e63946",
        overflow: "hidden",
        padding: "0.65rem 0",
        position: "relative",
      }}
      aria-hidden="true"
    >
      <div
        className="ticker-track"
        style={{
          display: "flex",
          gap: "0",
          width: "max-content",
          animation: "tickerScroll 30s linear infinite",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#fff",
              whiteSpace: "nowrap",
              padding: "0 2.5rem",
            }}
          >
            {item}
            <span style={{ marginLeft: "2.5rem", opacity: 0.5 }}>◆</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
