import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const eventSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    body: { type: String, default: "" },
    eventDate: { type: Date, required: true },
    venue: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    isDraft: { type: Boolean, default: false },
  },
  { timestamps: true }
);

eventSchema.index({ eventDate: -1 });

export type EventDoc = InferSchemaType<typeof eventSchema>;

export const Event =
  (models.Event as Model<EventDoc>) || model<EventDoc>("Event", eventSchema);
