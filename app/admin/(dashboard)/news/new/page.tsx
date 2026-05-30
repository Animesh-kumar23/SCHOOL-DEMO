import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { NewsForm } from "@/components/admin/forms/news-form";

export default function NewNewsPage() {
  return (
    <div>
      <AdminPageHeader title="Add Article" />
      <NewsForm />
    </div>
  );
}
