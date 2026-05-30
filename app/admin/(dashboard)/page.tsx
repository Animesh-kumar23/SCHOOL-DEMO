import Link from "next/link";
import {
  CalendarDays,
  GraduationCap,
  Image as ImageIcon,
  Inbox,
  Megaphone,
  Newspaper,
} from "lucide-react";

import { connectDB } from "@/lib/db";
import { News } from "@/models/News";
import { Event } from "@/models/Event";
import { Notice } from "@/models/Notice";
import { Gallery } from "@/models/Gallery";
import { Faculty } from "@/models/Faculty";
import { Submission } from "@/models/Submission";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await connectDB();

  const [news, events, notices, gallery, faculty, submissions, unresolved] =
    await Promise.all([
      News.countDocuments(),
      Event.countDocuments(),
      Notice.countDocuments(),
      Gallery.countDocuments(),
      Faculty.countDocuments(),
      Submission.countDocuments(),
      Submission.countDocuments({ resolved: false }),
    ]);

  const cards = [
    { label: "News Articles", count: news, href: "/admin/news", icon: Newspaper },
    { label: "Events", count: events, href: "/admin/events", icon: CalendarDays },
    { label: "Notices", count: notices, href: "/admin/notices", icon: Megaphone },
    { label: "Gallery Albums", count: gallery, href: "/admin/gallery", icon: ImageIcon },
    { label: "Faculty", count: faculty, href: "/admin/faculty", icon: GraduationCap },
    {
      label: "Submissions",
      count: submissions,
      href: "/admin/submissions",
      icon: Inbox,
      badge: unresolved > 0 ? `${unresolved} new` : undefined,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your school website content from here.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href}>
            <Card className="transition hover:border-primary/40 hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <c.icon className="size-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{c.count}</span>
                    {c.badge ? (
                      <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-gold-foreground">
                        {c.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm text-muted-foreground">{c.label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
