export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: "#111318",
        borderTop: "1px solid #3D4250",
        padding: "2.5rem 2rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.2rem",
            fontWeight: 800,
            letterSpacing: "0.08em",
            marginBottom: "0.5rem",
          }}
        >
          ACE<span style={{ color: "#e63946" }}>PROG</span>
        </p>
        <p style={{ color: "#666", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>
          Reprogrammation Moteur &amp; Électronique Automobile — Auvergne-Rhône-Alpes
        </p>
        <p style={{ color: "#444", fontSize: "0.75rem", marginTop: "1rem", fontFamily: "var(--font-body)" }}>
          © {year} Ace Prog. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
