import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userName={session.user?.name} />
      <main className="flex-1 overflow-x-hidden bg-muted/30">
        <div className="container max-w-none py-8">{children}</div>
      </main>
    </div>
  );
}
