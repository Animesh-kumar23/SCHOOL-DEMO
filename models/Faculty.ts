import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const facultySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, default: "" },
    department: { type: String, default: "" },
    photo: { type: String, default: "" },
    qualifications: { type: String, default: "" },
    bio: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

facultySchema.index({ order: 1 });

export type FacultyDoc = InferSchemaType<typeof facultySchema>;

export const Faculty =
  (models.Faculty as Model<FacultyDoc>) ||
  model<FacultyDoc>("Faculty", facultySchema);
