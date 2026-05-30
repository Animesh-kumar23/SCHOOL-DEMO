import { connectDB } from "@/lib/db";
import { Submission } from "@/models/Submission";
import { serialize } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { SubmissionsInbox } from "@/components/admin/submissions-inbox";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  await connectDB();
  const rows = serialize(await Submission.find().sort({ createdAt: -1 }).lean());

  return (
    <div>
      <AdminPageHeader
        title="Contact Submissions"
        description="Enquiries received through the public contact form."
      />
      <SubmissionsInbox rows={rows} />
    </div>
  );
}
