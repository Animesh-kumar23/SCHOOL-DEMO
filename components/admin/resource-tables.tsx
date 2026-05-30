"use client";

import { cn, formatDate } from "@/lib/utils";
import { DataTable } from "@/components/admin/data-table";

function Pill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "green" | "amber";
}) {
  const tones = {
    default: "bg-secondary text-secondary-foreground",
    green: "bg-emerald-100 text-emerald-800",
    amber: "bg-amber-100 text-amber-800",
  };
  return (
    <span className={cn("rounded px-2 py-0.5 text-xs font-medium capitalize", tones[tone])}>
      {children}
    </span>
  );
}

function StatusPill({ isDraft }: { isDraft?: boolean }) {
  return isDraft ? (
    <Pill tone="amber">Draft</Pill>
  ) : (
    <Pill tone="green">Published</Pill>
  );
}

export function NewsTable({ rows }: { rows: any[] }) {
  return (
    <DataTable
      rows={rows}
      resourceLabel="article"
      searchKeys={["title", "excerpt"]}
      editHref={(r) => `/admin/news/${r._id}/edit`}
      apiPath="/api/news"
      columns={[
        {
          key: "title",
          label: "Title",
          render: (r) => <span className="font-medium">{r.title}</span>,
        },
        {
          key: "category",
          label: "Category",
          render: (r) => <Pill>{r.category}</Pill>,
        },
        {
          key: "publishedAt",
          label: "Published",
          render: (r) => formatDate(r.publishedAt),
        },
        {
          key: "isDraft",
          label: "Status",
          render: (r) => <StatusPill isDraft={r.isDraft} />,
        },
      ]}
    />
  );
}

export function EventsTable({ rows }: { rows: any[] }) {
  return (
    <DataTable
      rows={rows}
      resourceLabel="event"
      searchKeys={["title", "venue"]}
      editHref={(r) => `/admin/events/${r._id}/edit`}
      apiPath="/api/events"
      columns={[
        {
          key: "title",
          label: "Title",
          render: (r) => <span className="font-medium">{r.title}</span>,
        },
        {
          key: "eventDate",
          label: "Date",
          render: (r) => formatDate(r.eventDate),
        },
        { key: "venue", label: "Venue" },
        {
          key: "isDraft",
          label: "Status",
          render: (r) => <StatusPill isDraft={r.isDraft} />,
        },
      ]}
    />
  );
}

export function NoticesTable({ rows }: { rows: any[] }) {
  return (
    <DataTable
      rows={rows}
      resourceLabel="notice"
      searchKeys={["title"]}
      editHref={(r) => `/admin/notices/${r._id}/edit`}
      apiPath="/api/notices"
      columns={[
        {
          key: "title",
          label: "Title",
          render: (r) => <span className="font-medium">{r.title}</span>,
        },
        {
          key: "category",
          label: "Category",
          render: (r) => <Pill>{r.category}</Pill>,
        },
        {
          key: "publishedAt",
          label: "Published",
          render: (r) => formatDate(r.publishedAt),
        },
      ]}
    />
  );
}

export function GalleryTable({ rows }: { rows: any[] }) {
  return (
    <DataTable
      rows={rows}
      resourceLabel="album"
      searchKeys={["title"]}
      editHref={(r) => `/admin/gallery/${r._id}/edit`}
      apiPath="/api/gallery"
      columns={[
        {
          key: "title",
          label: "Title",
          render: (r) => <span className="font-medium">{r.title}</span>,
        },
        {
          key: "category",
          label: "Category",
          render: (r) => <Pill>{r.category}</Pill>,
        },
        {
          key: "images",
          label: "Photos",
          render: (r) => `${r.images?.length ?? 0} photos`,
        },
      ]}
    />
  );
}

export function FacultyTable({ rows }: { rows: any[] }) {
  return (
    <DataTable
      rows={rows}
      resourceLabel="member"
      searchKeys={["name", "department", "designation"]}
      editHref={(r) => `/admin/faculty/${r._id}/edit`}
      apiPath="/api/faculty"
      columns={[
        {
          key: "name",
          label: "Name",
          render: (r) => <span className="font-medium">{r.name}</span>,
        },
        { key: "designation", label: "Designation" },
        { key: "department", label: "Department" },
        { key: "order", label: "Order" },
      ]}
    />
  );
}
