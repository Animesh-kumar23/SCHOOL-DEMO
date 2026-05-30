import { Download, FileText } from "lucide-react";

import { cn, formatDate } from "@/lib/utils";
import type { NoticeItem } from "@/lib/content-types";

const categoryStyles: Record<NoticeItem["category"], string> = {
  general: "bg-secondary text-secondary-foreground",
  examination: "bg-blue-100 text-blue-800",
  admission: "bg-emerald-100 text-emerald-800",
  circular: "bg-amber-100 text-amber-800",
  holiday: "bg-rose-100 text-rose-800",
};

export function NoticeRow({ notice }: { notice: NoticeItem }) {
  return (
    <a
      href={notice.pdfUrl || "#"}
      target={notice.pdfUrl ? "_blank" : undefined}
      rel={notice.pdfUrl ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 border-b px-2 py-3 transition-colors last:border-0 hover:bg-accent/50"
    >
      <div className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
        <FileText className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
              categoryStyles[notice.category]
            )}
          >
            {notice.category}
          </span>
          <time className="text-xs text-muted-foreground">
            {formatDate(notice.date)}
          </time>
        </div>
        <p className="mt-0.5 truncate text-sm font-medium group-hover:text-primary">
          {notice.title}
        </p>
      </div>
      <Download className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
    </a>
  );
}
