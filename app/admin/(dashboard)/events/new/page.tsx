import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EventForm } from "@/components/admin/forms/event-form";

export default function NewEventPage() {
  return (
    <div>
      <AdminPageHeader title="Add Event" />
      <EventForm />
    </div>
  );
}
