import nodemailer from "nodemailer"

function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
}

export async function sendNewLeadEmail(lead) {
  const transporter = createTransporter()
  if (!transporter) return

  const to = process.env.ADMIN_EMAIL_TO || process.env.SMTP_USER
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://scraply-auto.vercel.app"
  const vehicle = [lead.vehicle_year, lead.vehicle_make, lead.vehicle_model, lead.vehicle_trim]
    .filter(Boolean).join(" ")

  await transporter.sendMail({
    from: `"Scraply Auto" <${process.env.SMTP_USER}>`,
    to,
    subject: `New Lead — ${lead.first_name} ${lead.last_name || ""} · ${vehicle || lead.city}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto">
        <div style="background:#ea580c;padding:20px 24px;border-radius:12px 12px 0 0">
          <h1 style="color:white;margin:0;font-size:20px">New Lead Received</h1>
        </div>
        <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#6b7280;width:120px">Name</td><td style="padding:8px 0;font-weight:600;color:#0f172a">${lead.first_name} ${lead.last_name || ""}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Phone</td><td style="padding:8px 0"><a href="tel:${lead.phone}" style="color:#16a34a;font-weight:600">${lead.phone}</a></td></tr>
            ${lead.email ? `<tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${lead.email}" style="color:#2563eb">${lead.email}</a></td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#6b7280">City</td><td style="padding:8px 0;color:#0f172a">${lead.city || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Vehicle</td><td style="padding:8px 0;color:#0f172a">${vehicle || "—"}</td></tr>
            ${lead.condition ? `<tr><td style="padding:8px 0;color:#6b7280">Condition</td><td style="padding:8px 0;color:#0f172a">${lead.condition}</td></tr>` : ""}
            ${lead.message ? `<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">Message</td><td style="padding:8px 0;color:#0f172a">${lead.message}</td></tr>` : ""}
          </table>
          <div style="margin-top:20px">
            <a href="${siteUrl}/admin/leads/${lead.id}" style="display:inline-block;background:#ea580c;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">
              View Lead in Admin →
            </a>
          </div>
        </div>
      </div>
    `,
  })
}
