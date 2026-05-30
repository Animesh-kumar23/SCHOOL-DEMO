import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

import { connectDB } from "@/lib/db";
import { Settings } from "@/models/Settings";
import { settingsSchema } from "@/lib/validation/settings";
import { CONTENT_TAGS } from "@/lib/queries";
import { badRequest, json, requireAuth, unauthorized } from "@/lib/api";

export async function GET() {
  if (!(await requireAuth())) return unauthorized();
  await connectDB();

  let doc = await Settings.findOne({ key: "site" }).lean();
  if (!doc) {
    const created = await Settings.create({ key: "site" });
    doc = created.toObject();
  }
  return json(doc);
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAuth())) return unauthorized();
  await connectDB();

  const body = await req.json().catch(() => null);
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error.flatten());

  const updated = await Settings.findOneAndUpdate(
    { key: "site" },
    { ...parsed.data, key: "site" },
    { new: true, upsert: true }
  ).lean();

  revalidateTag(CONTENT_TAGS.settings);
  return json(updated);
}
