import { isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db";
import { Notice } from "@/models/Notice";
import { serialize } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { NoticeForm } from "@/components/admin/forms/notice-form";

export const dynamic = "force-dynamic";

export default async function EditNoticePage({
  params,
}: {
  params: { id: string };
}) {
  if (!isValidObjectId(params.id)) notFound();
  await connectDB();
  const doc = await Notice.findById(params.id).lean();
  if (!doc) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Notice" />
      <NoticeForm initial={serialize(doc)} />
    </div>
  );
}
