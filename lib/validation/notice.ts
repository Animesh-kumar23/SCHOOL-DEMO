import { z } from "zod";

export const noticeCategories = [
  "general",
  "examination",
  "admission",
  "circular",
  "holiday",
] as const;

export const noticeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  pdfUrl: z.string().min(1, "Attach a PDF or document"),
  category: z.enum(noticeCategories).default("general"),
  publishedAt: z.coerce.date().optional(),
});

export type NoticeInput = z.infer<typeof noticeSchema>;
