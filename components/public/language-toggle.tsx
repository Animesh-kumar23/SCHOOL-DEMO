"use client";

import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

export function LanguageToggle({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const router = useRouter();

  function toggle() {
    const next: Locale = locale === "hi" ? "en" : "hi";
    document.cookie = `locale=${next};path=/;max-age=31536000;samesite=lax`;
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Change language"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium transition-colors",
        className
      )}
    >
      <Languages className="size-4" />
      {label}
    </button>
  );
}
