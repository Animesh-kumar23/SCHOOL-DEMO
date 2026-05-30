"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Pencil, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";

export interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
  className?: string;
}

interface DataTableProps {
  rows: any[];
  columns: Column[];
  searchKeys?: string[];
  editHref?: (row: any) => string;
  apiPath?: string;
  resourceLabel?: string;
  pageSize?: number;
}

export function DataTable({
  rows,
  columns,
  searchKeys = [],
  editHref,
  apiPath,
  resourceLabel = "item",
  pageSize = 10,
}: DataTableProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || !searchKeys.length) return rows;
    return rows.filter((row) =>
      searchKeys.some((key) =>
        String(row[key] ?? "").toLowerCase().includes(q)
      )
    );
  }, [rows, query, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const pageRows = filtered.slice((current - 1) * pageSize, current * pageSize);
  const showActions = Boolean(editHref || apiPath);
  const colSpan = columns.length + (showActions ? 1 : 0);

  return (
    <div className="space-y-4">
      {searchKeys.length ? (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder={`Search ${resourceLabel}s…`}
            className="pl-9"
          />
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-lg border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-muted/50 text-muted-foreground">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={cn("px-4 py-3 font-medium", col.className)}>
                  {col.label}
                </th>
              ))}
              {showActions ? (
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={colSpan}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  No {resourceLabel}s found.
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr
                  key={row._id}
                  className="border-b last:border-0 hover:bg-muted/30"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn("px-4 py-3 align-middle", col.className)}
                    >
                      {col.render ? col.render(row) : String(row[col.key] ?? "")}
                    </td>
                  ))}
                  {showActions ? (
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {editHref ? (
                          <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            aria-label="Edit"
                          >
                            <Link href={editHref(row)}>
                              <Pencil className="size-4" />
                            </Link>
                          </Button>
                        ) : null}
                        {apiPath ? (
                          <DeleteButton
                            apiPath={apiPath}
                            id={row._id}
                            label={resourceLabel}
                          />
                        ) : null}
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Page {current} of {totalPages} · {filtered.length} total
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={current <= 1}
              onClick={() => setPage(current - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={current >= totalPages}
              onClick={() => setPage(current + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
