import { connectDB } from "@/lib/db";
import { Event } from "@/models/Event";
import { serialize } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EventsTable } from "@/components/admin/resource-tables";

export const dynamic = "force-dynamic";

export default async function EventsListPage() {
  await connectDB();
  const rows = serialize(await Event.find().sort({ eventDate: -1 }).lean());

  return (
    <div>
      <AdminPageHeader
        title="Events"
        description="Upcoming and past school events."
        actionLabel="Add event"
        actionHref="/admin/events/new"
      />
      <EventsTable rows={rows} />
    </div>
  );
}
