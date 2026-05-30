import { connectDB } from "@/lib/db";
import { Notice } from "@/models/Notice";
import { serialize } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { NoticesTable } from "@/components/admin/resource-tables";

export const dynamic = "force-dynamic";

export default async function NoticesListPage() {
  await connectDB();
  const rows = serialize(await Notice.find().sort({ publishedAt: -1 }).lean());

  return (
    <div>
      <AdminPageHeader
        title="Notices"
        description="Circulars and downloadable documents."
        actionLabel="Add notice"
        actionHref="/admin/notices/new"
      />
      <NoticesTable rows={rows} />
    </div>
  );
}
