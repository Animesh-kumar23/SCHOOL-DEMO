import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

/**
 * Single-document collection holding site-wide settings. We always read/write the
 * one doc with key "site".
 */
const settingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "site" },
    schoolName: { type: String, default: "Greenfield International School" },
    tagline: { type: String, default: "" },
    logoUrl: { type: String, default: "" },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    heroImages: { type: [String], default: [] },
    themeColor: { type: String, default: "" },
    socials: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      youtube: { type: String, default: "" },
      twitter: { type: String, default: "" },
    },
    // Founder's Message shown on the home and about pages. Fully editable from
    // the admin Settings page. `message` holds the full text; blank lines split
    // it into paragraphs on the public site.
    founder: {
      name: { type: String, default: "" },
      designation: { type: String, default: "" },
      photo: { type: String, default: "" },
      message: { type: String, default: "" },
    },
    mapEmbedUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export type SettingsDoc = InferSchemaType<typeof settingsSchema>;

export const Settings =
  (models.Settings as Model<SettingsDoc>) ||
  model<SettingsDoc>("Settings", settingsSchema);
