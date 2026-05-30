import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FacultyForm } from "@/components/admin/forms/faculty-form";

export default function NewFacultyPage() {
  return (
    <div>
      <AdminPageHeader title="Add Faculty Member" />
      <FacultyForm />
    </div>
  );
}
