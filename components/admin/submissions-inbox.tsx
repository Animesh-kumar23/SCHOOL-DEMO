"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Download, Mail, Phone, Trash2, Undo2 } from "lucide-react";

import { cn, formatDate } from "@/lib/utils";
import { deleteResource } from "@/lib/admin-client";
import { Button } from "@/components/ui/button";

export function SubmissionsInbox({ rows }: { rows: any[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function toggleResolved(row: any) {
    setBusy(row._id);
    await fetch(`/api/submissions/${row._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resolved: !row.resolved }),
    });
    setBusy(null);
    router.refresh();
  }

  async function remove(row: any) {
    if (!window.confirm("Delete this submission?")) return;
    setBusy(row._id);
    await deleteResource("/api/submissions", row._id);
    setBusy(null);
    router.refresh();
  }

  function exportCsv() {
    const headers = ["Name", "Email", "Phone", "Message", "Resolved", "Received"];
    const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [headers.join(",")].concat(
      rows.map((r) =>
        [
          r.name,
          r.email,
          r.phone,
          r.message,
          r.resolved ? "Yes" : "No",
          new Date(r.createdAt).toISOString(),
        ]
          .map(escape)
          .join(",")
      )
    );
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!rows.length) {
    return (
      <p className="rounded-lg border bg-card p-10 text-center text-muted-foreground">
        No enquiries yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={exportCsv}>
          <Download className="size-4" />
          Export CSV
        </Button>
      </div>

      <div className="space-y-3">
        {rows.map((r) => (
          <div
            key={r._id}
            className={cn(
              "rounded-lg border bg-card p-4 shadow-sm",
              r.resolved && "opacity-70"
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="flex items-center gap-2 font-semibold">
                  {r.name}
                  {r.resolved ? (
                    <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-800">
                      Resolved
                    </span>
                  ) : null}
                </p>
                <div className="mt-0.5 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  {r.phone ? (
                    <span className="flex items-center gap-1">
                      <Phone className="size-3" />
                      {r.phone}
                    </span>
                  ) : null}
                  {r.email ? (
                    <span className="flex items-center gap-1">
                      <Mail className="size-3" />
                      {r.email}
                    </span>
                  ) : null}
                  <span>{formatDate(r.createdAt)}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={busy === r._id}
                  onClick={() => toggleResolved(r)}
                >
                  {r.resolved ? (
                    <>
                      <Undo2 className="size-4" />
                      Reopen
                    </>
                  ) : (
                    <>
                      <Check className="size-4" />
                      Resolve
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={busy === r._id}
                  onClick={() => remove(r)}
                  aria-label="Delete submission"
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm">{r.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
