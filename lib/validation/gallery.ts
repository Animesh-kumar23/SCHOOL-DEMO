import { z } from "zod";

export const galleryCategories = [
  "events",
  "campus",
  "sports",
  "academics",
  "cultural",
] as const;

export const galleryImageSchema = z.object({
  url: z.string().min(1),
  alt: z.string().optional().or(z.literal("")),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const gallerySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.enum(galleryCategories).default("events"),
  images: z.array(galleryImageSchema).min(1, "Add at least one image"),
  publishedAt: z.coerce.date().optional(),
});

export type GalleryInput = z.infer<typeof gallerySchema>;
