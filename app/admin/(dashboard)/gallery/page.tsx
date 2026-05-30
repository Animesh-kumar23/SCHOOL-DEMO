import { connectDB } from "@/lib/db";
import { Gallery } from "@/models/Gallery";
import { serialize } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { GalleryTable } from "@/components/admin/resource-tables";

export const dynamic = "force-dynamic";

export default async function GalleryListPage() {
  await connectDB();
  const rows = serialize(await Gallery.find().sort({ publishedAt: -1 }).lean());

  return (
    <div>
      <AdminPageHeader
        title="Gallery"
        description="Photo albums grouped by category."
        actionLabel="Add album"
        actionHref="/admin/gallery/new"
      />
      <GalleryTable rows={rows} />
    </div>
  );
}
