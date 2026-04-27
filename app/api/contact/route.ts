import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const { nom, tel, email, vehicule, service, message } = await req.json();

  if (!nom || !email || !message) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "ACE Prog <onboarding@resend.dev>",
    to: "souleimanehadbi@gmail.com",
    replyTo: email,
    subject: `Nouvelle demande de devis – ${nom}`,
    html: `
      <h2>Nouvelle demande de devis</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:6px 12px;font-weight:bold">Nom</td><td style="padding:6px 12px">${nom}</td></tr>
        <tr style="background:#f5f5f5"><td style="padding:6px 12px;font-weight:bold">Téléphone</td><td style="padding:6px 12px">${tel || "—"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold">Email</td><td style="padding:6px 12px">${email}</td></tr>
        <tr style="background:#f5f5f5"><td style="padding:6px 12px;font-weight:bold">Véhicule</td><td style="padding:6px 12px">${vehicule || "—"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold">Service</td><td style="padding:6px 12px">${service || "—"}</td></tr>
        <tr style="background:#f5f5f5"><td style="padding:6px 12px;font-weight:bold">Message</td><td style="padding:6px 12px;white-space:pre-wrap">${message}</td></tr>
      </table>
    `,
  });

  if (error) {
    console.error("Resend error:", JSON.stringify(error));
    return NextResponse.json({ error: "Erreur lors de l'envoi.", detail: error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
