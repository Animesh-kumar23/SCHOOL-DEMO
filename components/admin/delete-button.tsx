"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

import { deleteResource } from "@/lib/admin-client";
import { Button } from "@/components/ui/button";

export function DeleteButton({
  apiPath,
  id,
  label = "item",
}: {
  apiPath: string;
  id: string;
  label?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!window.confirm(`Delete this ${label}? This cannot be undone.`)) return;
    setLoading(true);
    const res = await deleteResource(apiPath, id);
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      window.alert(res.error ?? "Failed to delete.");
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onDelete}
      disabled={loading}
      aria-label={`Delete ${label}`}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Trash2 className="size-4 text-destructive" />
      )}
    </Button>
  );
}
