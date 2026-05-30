import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const submissionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    // Email is no longer collected by the public form; kept optional for old records.
    email: { type: String, default: "", trim: true, lowercase: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

submissionSchema.index({ createdAt: -1 });

export type SubmissionDoc = InferSchemaType<typeof submissionSchema>;

export const Submission =
  (models.Submission as Model<SubmissionDoc>) ||
  model<SubmissionDoc>("Submission", submissionSchema);
