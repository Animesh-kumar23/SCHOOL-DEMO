import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;
