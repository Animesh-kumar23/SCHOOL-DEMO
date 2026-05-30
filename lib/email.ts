import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactEmailInput {
  name: string;
  phone: string;
  message: string;
}

export async function sendContactEmail(input: ContactEmailInput) {
  const to = process.env.CONTACT_INBOX_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!process.env.RESEND_API_KEY || !to) {
    throw new Error("Missing RESEND_API_KEY or CONTACT_INBOX_EMAIL");
  }

  return resend.emails.send({
    from,
    to,
    subject: `New website enquiry from ${input.name}`,
    text: [
      `Name: ${input.name}`,
      `Phone: ${input.phone}`,
      "",
      input.message,
    ].join("\n"),
  });
}
