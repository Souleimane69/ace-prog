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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-blanc.png"
          alt="Ace Prog"
          style={{ height: "48px", width: "auto", objectFit: "contain", marginBottom: "0.75rem" }}
        />
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
