import { connectDB } from "@/lib/db";
import { Settings } from "@/models/Settings";
import { serialize } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { SettingsForm } from "@/components/admin/forms/settings-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await connectDB();
  let doc = await Settings.findOne({ key: "site" }).lean();
  if (!doc) {
    const created = await Settings.create({ key: "site" });
    doc = created.toObject();
  }

  return (
    <div>
      <AdminPageHeader
        title="Settings"
        description="School identity, contact details and social links."
      />
      <SettingsForm initial={serialize(doc)} />
    </div>
  );
}
