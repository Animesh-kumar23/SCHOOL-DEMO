import { z } from "zod";

export const settingsSchema = z.object({
  schoolName: z.string().min(2, "School name is required"),
  tagline: z.string().optional().or(z.literal("")),
  logoUrl: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  email: z.email("Enter a valid email").optional().or(z.literal("")),
  heroImages: z.array(z.string()).default([]),
  themeColor: z.string().optional().or(z.literal("")),
  socials: z
    .object({
      facebook: z.string().optional().or(z.literal("")),
      instagram: z.string().optional().or(z.literal("")),
      youtube: z.string().optional().or(z.literal("")),
      twitter: z.string().optional().or(z.literal("")),
    })
    .default({}),
  mapEmbedUrl: z.string().optional().or(z.literal("")),
});

export type SettingsInput = z.infer<typeof settingsSchema>;
