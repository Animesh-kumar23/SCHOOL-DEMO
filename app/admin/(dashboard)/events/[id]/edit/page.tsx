import { isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db";
import { Event } from "@/models/Event";
import { serialize } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EventForm } from "@/components/admin/forms/event-form";

export const dynamic = "force-dynamic";

export default async function EditEventPage({
  params,
}: {
  params: { id: string };
}) {
  if (!isValidObjectId(params.id)) notFound();
  await connectDB();
  const doc = await Event.findById(params.id).lean();
  if (!doc) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Event" />
      <EventForm initial={serialize(doc)} />
    </div>
  );
}
