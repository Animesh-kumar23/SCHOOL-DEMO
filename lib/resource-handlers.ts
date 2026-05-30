import { createCrudHandlers } from "@/lib/crud";
import { CONTENT_TAGS } from "@/lib/queries";
import { News } from "@/models/News";
import { Event } from "@/models/Event";
import { Notice } from "@/models/Notice";
import { Gallery } from "@/models/Gallery";
import { Faculty } from "@/models/Faculty";
import { Submission } from "@/models/Submission";
import { newsSchema } from "@/lib/validation/news";
import { eventSchema } from "@/lib/validation/event";
import { noticeSchema } from "@/lib/validation/notice";
import { gallerySchema } from "@/lib/validation/gallery";
import { facultySchema } from "@/lib/validation/faculty";
import { submissionUpdateSchema } from "@/lib/validation/submission";

export const newsHandlers = createCrudHandlers({
  model: News,
  schema: newsSchema,
  searchFields: ["title", "excerpt"],
  sort: { publishedAt: -1 },
  slugFrom: "title",
  revalidateTags: [CONTENT_TAGS.news],
});

export const eventHandlers = createCrudHandlers({
  model: Event,
  schema: eventSchema,
  searchFields: ["title", "venue"],
  sort: { eventDate: -1 },
  slugFrom: "title",
  revalidateTags: [CONTENT_TAGS.events],
});

export const noticeHandlers = createCrudHandlers({
  model: Notice,
  schema: noticeSchema,
  searchFields: ["title"],
  sort: { publishedAt: -1 },
  revalidateTags: [CONTENT_TAGS.notices],
});

export const galleryHandlers = createCrudHandlers({
  model: Gallery,
  schema: gallerySchema,
  searchFields: ["title"],
  sort: { publishedAt: -1 },
  revalidateTags: [CONTENT_TAGS.gallery],
});

export const facultyHandlers = createCrudHandlers({
  model: Faculty,
  schema: facultySchema,
  searchFields: ["name", "department", "designation"],
  sort: { order: 1 },
  revalidateTags: [CONTENT_TAGS.faculty],
});

export const submissionHandlers = createCrudHandlers({
  model: Submission,
  schema: submissionUpdateSchema,
  searchFields: ["name", "email"],
  sort: { createdAt: -1 },
});
