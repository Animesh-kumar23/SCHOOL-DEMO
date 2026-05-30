import type { NextRequest } from "next/server";

import { connectDB } from "@/lib/db";
import { Submission } from "@/models/Submission";
import { contactSchema } from "@/lib/validation/contact";
import { sendContactEmail } from "@/lib/email";
import { badRequest, json, serverError } from "@/lib/api";

/** Public endpoint — the contact form posts here (no auth). */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error.flatten());

  const { name, phone, message } = parsed.data;

  try {
    await connectDB();
    await Submission.create({ name, phone, message });
  } catch (err) {
    console.error("Failed to save submission:", err);
    return serverError("Could not save your message. Please try again.");
  }

  // Best-effort notification — never block the visitor if email isn't configured.
  try {
    await sendContactEmail({ name, phone, message });
  } catch (err) {
    console.error("Contact email not sent (Resend not configured?):", err);
  }

  return json({ ok: true }, { status: 201 });
}
