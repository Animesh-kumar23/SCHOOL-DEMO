import { connectDB } from "@/lib/db";
import { News } from "@/models/News";
import { serialize } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { NewsTable } from "@/components/admin/resource-tables";

export const dynamic = "force-dynamic";

export default async function NewsListPage() {
  await connectDB();
  const rows = serialize(await News.find().sort({ publishedAt: -1 }).lean());

  return (
    <div>
      <AdminPageHeader
        title="News"
        description="Announcements and stories shown on the public site."
        actionLabel="Add article"
        actionHref="/admin/news/new"
      />
      <NewsTable rows={rows} />
    </div>
  );
}
