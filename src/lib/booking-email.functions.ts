import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().min(1).max(100),
  address: z.string().min(1).max(200),
  phone: z.string().min(5).max(30),
  email: z.string().email().max(200).optional().or(z.literal("")),
  binCount: z.string().max(20),
  binTypes: z.array(z.string().max(60)).max(10),
  timeWindow: z.string().max(40),
  binLocation: z.string().max(200),
  photoPermission: z.string().max(10),
});

export type BookingPayload = z.infer<typeof bookingSchema>;

const OWNER_EMAIL = "lunacleanseattle@moderncentral.net";

function rows(data: BookingPayload): Array<[string, string]> {
  return [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email || "(not provided)"],
    ["Street address", data.address],
    ["Bins to clean", data.binTypes.join(", ")],
    ["Number of bins", data.binCount],
    ["Preferred time", data.timeWindow],
    ["Bin location", data.binLocation],
    ["Photo permission", data.photoPermission],
  ];
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function table(data: BookingPayload) {
  return `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows(data)
    .map(
      ([label, value]: [string, string]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#64748b">${escapeHtml(label)}</td><td style="padding:6px 0;font-weight:600;color:#0f172a">${escapeHtml(value)}</td></tr>`
    )
    .join("")}</table>`;
}

async function sendEmail(opts: { apiKey: string; from: string; to: string; replyTo?: string | undefined; subject: string; html: string }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: opts.from,
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Email send failed (${res.status}): ${text}`);
  }
}

export const sendBookingEmails = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      console.warn("RESEND_API_KEY not configured — skipping booking emails");
      return { sent: false as const };
    }
    const from = process.env["BOOKING_FROM_EMAIL"] || "Luna Clean <onboarding@resend.dev>";

    await sendEmail({
      apiKey,
      from,
      to: OWNER_EMAIL,
      replyTo: data.email || undefined,
      subject: `New booking request — ${data.name}`,
      html: `<h2 style="font-family:Arial,sans-serif;color:#0f172a">New Luna Clean booking request</h2>${table(data)}`,
    });

    if (data.email) {
      await sendEmail({
        apiKey,
        from,
        to: data.email,
        replyTo: OWNER_EMAIL,
        subject: "Your Luna Clean booking request is in!",
        html: `<h2 style="font-family:Arial,sans-serif;color:#0f172a">Thanks, ${escapeHtml(data.name)}!</h2>
<p style="font-family:Arial,sans-serif;font-size:14px;color:#334155">We received your bin cleaning request and will confirm your appointment within 24 hours. Here's what you sent us:</p>
${table(data)}
<p style="font-family:Arial,sans-serif;font-size:14px;color:#334155">Need us sooner? Call or text (714) 912-3682.</p>`,
      });
    }

    return { sent: true as const };
  });
