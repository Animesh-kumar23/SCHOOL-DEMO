import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const noticeSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    pdfUrl: { type: String, default: "" }, // Cloudinary URL
    category: {
      type: String,
      enum: ["general", "examination", "admission", "circular", "holiday"],
      default: "general",
    },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

noticeSchema.index({ publishedAt: -1 });

export type NoticeDoc = InferSchemaType<typeof noticeSchema>;

export const Notice =
  (models.Notice as Model<NoticeDoc>) || model<NoticeDoc>("Notice", noticeSchema);
