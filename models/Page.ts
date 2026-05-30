import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

/**
 * Singleton-style editable pages. `key` identifies the page ("home", "about", ...).
 * `blocks` is intentionally flexible (Mixed) so the admin can edit varied content
 * sections without a schema migration per page.
 */
const pageSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      enum: ["home", "about", "academics", "admissions", "principal"],
    },
    title: { type: String, default: "" },
    blocks: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export type PageDoc = InferSchemaType<typeof pageSchema>;

export const Page =
  (models.Page as Model<PageDoc>) || model<PageDoc>("Page", pageSchema);
