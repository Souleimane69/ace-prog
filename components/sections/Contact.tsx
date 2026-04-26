"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

interface FormData {
  nom: string;
  tel: string;
  email: string;
  vehicule: string;
  service: string;
  message: string;
}

interface Errors {
  nom?: string;
  email?: string;
  message?: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#22252E",
  border: "1px solid #3D4250",
  borderRadius: "4px",
  color: "#f5f5f5",
  fontFamily: "var(--font-body)",
  fontSize: "1rem",
  padding: "0.75rem 1rem",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontSize: "0.85rem",
  fontWeight: 600,
  letterSpacing: "0.05em",
  color: "#a0a0a0",
  textTransform: "uppercase",
  marginBottom: "0.5rem",
};

const contactInfoItems = [
  {
    icon: "📍",
    label: "Zone d'intervention",
    value: "Toute la France",
  },
  {
    icon: "📞",
    label: "Téléphone",
    value: "06 58 22 02 24",
  },
  {
    icon: "✉",
    label: "Email",
    value: "contact@aceprog.com",
  },
  {
    icon: "🕐",
    label: "Horaires",
    value: "Lun – Ven : 8h – 18h",
  },
];

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    nom: "",
    tel: "",
    email: "",
    vehicule: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.nom.trim()) e.nom = "Le nom est requis.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Adresse email invalide.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Le message doit contenir au moins 10 caractères.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    // TODO: wire up to EmailJS / Resend / backend
    setSuccess(true);
    setForm({ nom: "", tel: "", email: "", vehicule: "", service: "", message: "" });
    setErrors({});
    setTimeout(() => setSuccess(false), 6000);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#e63946";
    e.target.style.boxShadow = "0 0 0 3px rgba(230,57,70,0.15)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#3D4250";
    e.target.style.boxShadow = "none";
  };

  return (
    <section
      id="contact"
      style={{
        padding: "7rem 2rem",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <SectionHeader tag="Contact" title="Prendre Rendez-vous" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "4rem",
        }}
        className="lg:grid-cols-2"
      >
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <p style={{ color: "#a0a0a0", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Vous avez un projet, une question ou souhaitez obtenir un devis ?
            Remplissez le formulaire ou contactez-nous directement. Nous vous
            répondons sous 24h.
          </p>

          {contactInfoItems.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1.5rem",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{item.icon}</span>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#666",
                    marginBottom: "0.25rem",
                  }}
                >
                  {item.label}
                </p>
                <p style={{ color: "#f5f5f5", fontFamily: "var(--font-body)" }}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          onSubmit={handleSubmit}
          noValidate
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {/* Row: Nom + Tel */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ gap: "1rem" }}
          >
            <div>
              <label style={labelStyle} htmlFor="nom">
                Nom *
              </label>
              <input
                id="nom"
                name="nom"
                type="text"
                required
                autoComplete="name"
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  ...inputStyle,
                  borderColor: errors.nom ? "#e63946" : "#3D4250",
                }}
              />
              {errors.nom && (
                <span style={{ color: "#e63946", fontSize: "0.8rem" }}>
                  {errors.nom}
                </span>
              )}
            </div>
            <div>
              <label style={labelStyle} htmlFor="tel">
                Téléphone
              </label>
              <input
                id="tel"
                name="tel"
                type="tel"
                autoComplete="tel"
                value={form.tel}
                onChange={(e) => setForm({ ...form, tel: e.target.value })}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle} htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                ...inputStyle,
                borderColor: errors.email ? "#e63946" : "#3D4250",
              }}
            />
            {errors.email && (
              <span style={{ color: "#e63946", fontSize: "0.8rem" }}>
                {errors.email}
              </span>
            )}
          </div>

          {/* Vehicule */}
          <div>
            <label style={labelStyle} htmlFor="vehicule">
              Véhicule (marque, modèle, année)
            </label>
            <input
              id="vehicule"
              name="vehicule"
              type="text"
              value={form.vehicule}
              onChange={(e) => setForm({ ...form, vehicule: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
            />
          </div>

          {/* Service */}
          <div>
            <label style={labelStyle} htmlFor="service">
              Service souhaité
            </label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              <option value="">-- Choisir --</option>
              <option>Reprogrammation moteur</option>
              <option>Diagnostic électronique</option>
              <option>Optimisation performance</option>
              <option>Intervention calculateur</option>
              <option>Prestation personnalisée</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label style={labelStyle} htmlFor="message">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                ...inputStyle,
                resize: "vertical",
                borderColor: errors.message ? "#e63946" : "#3D4250",
              }}
            />
            {errors.message && (
              <span style={{ color: "#e63946", fontSize: "0.8rem" }}>
                {errors.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              background: "#e63946",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-display)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "1.1rem",
              borderRadius: "4px",
              transition: "background 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#c0392b";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 30px rgba(230,57,70,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#e63946";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            Envoyer la demande
          </button>

          {/* Success */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: "4px",
                padding: "1rem",
                color: "#4ade80",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
              }}
              role="status"
            >
              ✓ Merci ! Votre demande a été envoyée. Nous vous recontactons sous 24h.
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
