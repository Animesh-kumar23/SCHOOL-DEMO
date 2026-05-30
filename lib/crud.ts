import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import type { Model } from "mongoose";
import type { ZodTypeAny } from "zod";

import { connectDB } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { badRequest, json, notFound, requireAuth, unauthorized } from "@/lib/api";

interface CrudConfig {
  model: Model<any>;
  /** Schema used to validate create/update payloads. */
  schema: ZodTypeAny;
  /** Fields searched (case-insensitive regex) by the ?q= query param. */
  searchFields?: string[];
  sort?: Record<string, 1 | -1>;
  /** When set, a unique `slug` is derived from this field on create/update. */
  slugFrom?: string;
  /** Cache tags to revalidate on the public site after a mutation. */
  revalidateTags?: string[];
}

type ItemContext = { params: { id: string } };

async function ensureUniqueSlug(
  model: Model<any>,
  base: string,
  excludeId?: string
): Promise<string> {
  const root = base || "item";
  let slug = root;
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const query: Record<string, unknown> = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const exists = await model.exists(query);
    if (!exists) return slug;
    n += 1;
    slug = `${root}-${n}`;
  }
}

export function createCrudHandlers(config: CrudConfig) {
  const {
    model,
    schema,
    searchFields = [],
    sort = { createdAt: -1 },
    slugFrom,
    revalidateTags = [],
  } = config;

  function revalidate() {
    for (const tag of revalidateTags) revalidateTag(tag);
  }

  async function applySlug(data: Record<string, any>, excludeId?: string) {
    if (!slugFrom) return;
    const provided = typeof data.slug === "string" ? data.slug : "";
    const source = provided || (data[slugFrom] as string) || "";
    const base = slugify(source);
    if (base) data.slug = await ensureUniqueSlug(model, base, excludeId);
    else delete data.slug;
  }

  async function listHandler(req: NextRequest) {
    if (!(await requireAuth())) return unauthorized();
    await connectDB();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
    const limit = Math.min(
      200,
      Math.max(1, parseInt(searchParams.get("limit") ?? "100", 10) || 100)
    );

    const filter: Record<string, unknown> = {};
    if (q && searchFields.length) {
      filter.$or = searchFields.map((field) => ({
        [field]: { $regex: q, $options: "i" },
      }));
    }

    const [items, total] = await Promise.all([
      model
        .find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      model.countDocuments(filter),
    ]);

    return json({ items, total, page, limit });
  }

  async function createHandler(req: NextRequest) {
    if (!(await requireAuth())) return unauthorized();
    await connectDB();

    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.flatten());

    const data = { ...(parsed.data as Record<string, any>) };
    await applySlug(data);

    const created = await model.create(data);
    revalidate();
    return json(created.toObject(), { status: 201 });
  }

  async function getHandler(_req: NextRequest, { params }: ItemContext) {
    if (!(await requireAuth())) return unauthorized();
    await connectDB();
    const item = await model.findById(params.id).lean();
    if (!item) return notFound();
    return json(item);
  }

  async function updateHandler(req: NextRequest, { params }: ItemContext) {
    if (!(await requireAuth())) return unauthorized();
    await connectDB();

    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.flatten());

    const data = { ...(parsed.data as Record<string, any>) };
    await applySlug(data, params.id);

    const updated = await model
      .findByIdAndUpdate(params.id, data, { new: true })
      .lean();
    if (!updated) return notFound();
    revalidate();
    return json(updated);
  }

  async function deleteHandler(_req: NextRequest, { params }: ItemContext) {
    if (!(await requireAuth())) return unauthorized();
    await connectDB();
    const deleted = await model.findByIdAndDelete(params.id);
    if (!deleted) return notFound();
    revalidate();
    return json({ ok: true });
  }

  return {
    collection: { GET: listHandler, POST: createHandler },
    item: { GET: getHandler, PATCH: updateHandler, DELETE: deleteHandler },
  };
}
