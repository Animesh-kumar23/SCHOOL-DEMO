import { submissionHandlers } from "@/lib/resource-handlers";

// Submissions are created by the public contact form, not the admin — only list here.
export const { GET } = submissionHandlers.collection;
