import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const newsSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, default: "General", trim: true },
    excerpt: { type: String, default: "" },
    body: { type: String, default: "" }, // HTML from Tiptap
    coverImage: { type: String, default: "" },
    publishedAt: { type: Date, default: Date.now },
    isDraft: { type: Boolean, default: false },
  },
  { timestamps: true }
);

newsSchema.index({ publishedAt: -1 });

export type NewsDoc = InferSchemaType<typeof newsSchema>;

export const News =
  (models.News as Model<NewsDoc>) || model<NewsDoc>("News", newsSchema);
