import { isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db";
import { Faculty } from "@/models/Faculty";
import { serialize } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FacultyForm } from "@/components/admin/forms/faculty-form";

export const dynamic = "force-dynamic";

export default async function EditFacultyPage({
  params,
}: {
  params: { id: string };
}) {
  if (!isValidObjectId(params.id)) notFound();
  await connectDB();
  const doc = await Faculty.findById(params.id).lean();
  if (!doc) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Faculty Member" />
      <FacultyForm initial={serialize(doc)} />
    </div>
  );
}
