import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { GalleryForm } from "@/components/admin/forms/gallery-form";

export default function NewGalleryPage() {
  return (
    <div>
      <AdminPageHeader title="Add Album" />
      <GalleryForm />
    </div>
  );
}
