import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers and hyphens")
    .optional()
    .or(z.literal("")),
  body: z.string().optional().or(z.literal("")),
  eventDate: z.coerce.date({ message: "Event date is required" }),
  venue: z.string().optional().or(z.literal("")),
  coverImage: z.string().optional().or(z.literal("")),
  isDraft: z.boolean().default(false),
});

export type EventInput = z.infer<typeof eventSchema>;
