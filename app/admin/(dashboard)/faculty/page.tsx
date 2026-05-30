import { connectDB } from "@/lib/db";
import { Faculty } from "@/models/Faculty";
import { serialize } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FacultyTable } from "@/components/admin/resource-tables";

export const dynamic = "force-dynamic";

export default async function FacultyListPage() {
  await connectDB();
  const rows = serialize(await Faculty.find().sort({ order: 1 }).lean());

  return (
    <div>
      <AdminPageHeader
        title="Faculty"
        description="Teaching and administrative staff shown on the public site."
        actionLabel="Add member"
        actionHref="/admin/faculty/new"
      />
      <FacultyTable rows={rows} />
    </div>
  );
}
