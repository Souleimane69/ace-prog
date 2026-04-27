import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { nom, tel, email, vehicule, service, message } = await req.json();

  if (!nom || !email || !message) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"ACE Prog" <${process.env.GMAIL_USER}>`,
      to: "contact@aceprog.com",
      replyTo: email,
      subject: `Nouvelle demande de devis – ${nom}`,
      html: `
        <h2 style="color:#e63946">Nouvelle demande de devis</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
          <tr><td style="padding:8px 14px;font-weight:bold;background:#f5f5f5">Nom</td><td style="padding:8px 14px">${nom}</td></tr>
          <tr><td style="padding:8px 14px;font-weight:bold">Téléphone</td><td style="padding:8px 14px">${tel || "—"}</td></tr>
          <tr><td style="padding:8px 14px;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:8px 14px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 14px;font-weight:bold">Véhicule</td><td style="padding:8px 14px">${vehicule || "—"}</td></tr>
          <tr><td style="padding:8px 14px;font-weight:bold;background:#f5f5f5">Service</td><td style="padding:8px 14px">${service || "—"}</td></tr>
          <tr><td style="padding:8px 14px;font-weight:bold;vertical-align:top">Message</td><td style="padding:8px 14px;white-space:pre-wrap">${message}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Mail error:", err);
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }
}
