import { z } from "zod";

/** Admin only toggles the resolved flag on a submission. */
export const submissionUpdateSchema = z.object({
  resolved: z.boolean(),
});

export type SubmissionUpdateInput = z.infer<typeof submissionUpdateSchema>;
