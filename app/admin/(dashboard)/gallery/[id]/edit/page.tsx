import { isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db";
import { Gallery } from "@/models/Gallery";
import { serialize } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { GalleryForm } from "@/components/admin/forms/gallery-form";

export const dynamic = "force-dynamic";

export default async function EditGalleryPage({
  params,
}: {
  params: { id: string };
}) {
  if (!isValidObjectId(params.id)) notFound();
  await connectDB();
  const doc = await Gallery.findById(params.id).lean();
  if (!doc) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Album" />
      <GalleryForm initial={serialize(doc)} />
    </div>
  );
}
