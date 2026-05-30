import { z } from "zod";

export const facultySchema = z.object({
  name: z.string().min(2, "Name is required"),
  designation: z.string().optional().or(z.literal("")),
  department: z.string().optional().or(z.literal("")),
  photo: z.string().optional().or(z.literal("")),
  qualifications: z.string().optional().or(z.literal("")),
  bio: z.string().optional().or(z.literal("")),
  order: z.coerce.number().int().default(0),
});

export type FacultyInput = z.infer<typeof facultySchema>;
