import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const galleryImageSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, default: "" },
    width: { type: Number },
    height: { type: Number },
  },
  { _id: false }
);

const gallerySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["events", "campus", "sports", "academics", "cultural"],
      default: "events",
    },
    images: { type: [galleryImageSchema], default: [] },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export type GalleryDoc = InferSchemaType<typeof gallerySchema>;

export const Gallery =
  (models.Gallery as Model<GalleryDoc>) ||
  model<GalleryDoc>("Gallery", gallerySchema);
