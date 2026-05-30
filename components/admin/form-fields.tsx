import Link from "next/link";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  className,
  children,
}: {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label ? <Label htmlFor={htmlFor}>{label}</Label> : null}
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

export function FormActions({
  isSubmitting,
  error,
  cancelHref,
  submitLabel = "Save",
}: {
  isSubmitting: boolean;
  error?: string | null;
  cancelHref: string;
  submitLabel?: string;
}) {
  return (
    <div className="space-y-3 border-t pt-4">
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
        <Button asChild type="button" variant="outline">
          <Link href={cancelHref}>Cancel</Link>
        </Button>
      </div>
    </div>
  );
}
