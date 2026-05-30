import Link from "next/link";
import { MapPin } from "lucide-react";

import { getDictionary, getLocale } from "@/lib/i18n";
import type { EventListItem } from "@/lib/content-types";

export function EventCard({ item }: { item: EventListItem }) {
  const dict = getDictionary(getLocale());
  const date = new Date(item.date);
  const day = date.getDate();
  const month = date.toLocaleString("en-IN", { month: "short" });

  return (
    <Link
      href={`/events/${item.slug}`}
      className="group flex gap-4 rounded-lg border bg-card p-4 shadow-sm transition hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-md bg-primary text-primary-foreground">
        <span className="text-xl font-bold leading-none">{day}</span>
        <span className="text-xs uppercase tracking-wide">{month}</span>
      </div>
      <div className="min-w-0">
        {item.isPast ? (
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {dict.common.pastEvent}
          </span>
        ) : (
          <span className="text-xs font-medium uppercase tracking-wide text-primary">
            {dict.common.upcoming}
          </span>
        )}
        <h3 className="truncate font-semibold leading-snug transition-colors group-hover:text-primary">
          {item.title}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          <span className="truncate">{item.venue}</span>
        </p>
      </div>
    </Link>
  );
}
