import { isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db";
import { News } from "@/models/News";
import { serialize } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { NewsForm } from "@/components/admin/forms/news-form";

export const dynamic = "force-dynamic";

export default async function EditNewsPage({
  params,
}: {
  params: { id: string };
}) {
  if (!isValidObjectId(params.id)) notFound();
  await connectDB();
  const doc = await News.findById(params.id).lean();
  if (!doc) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Article" />
      <NewsForm initial={serialize(doc)} />
    </div>
  );
}
