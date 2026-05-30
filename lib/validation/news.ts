import { z } from "zod";

export const newsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers and hyphens")
    .optional()
    .or(z.literal("")),
  category: z.string().optional().or(z.literal("")),
  excerpt: z.string().max(300, "Keep the excerpt under 300 characters").optional().or(z.literal("")),
  body: z.string().optional().or(z.literal("")),
  coverImage: z.string().optional().or(z.literal("")),
  publishedAt: z.coerce.date().optional(),
  isDraft: z.boolean().default(false),
});

export type NewsInput = z.infer<typeof newsSchema>;
