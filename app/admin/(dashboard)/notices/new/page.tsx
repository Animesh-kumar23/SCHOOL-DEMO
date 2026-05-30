import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { NoticeForm } from "@/components/admin/forms/notice-form";

export default function NewNoticePage() {
  return (
    <div>
      <AdminPageHeader title="Add Notice" />
      <NoticeForm />
    </div>
  );
}
