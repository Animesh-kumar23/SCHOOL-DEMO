"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { adminNav, siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

export function AdminSidebar({ userName }: { userName?: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-2 border-b px-4 font-semibold">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
          RR
        </span>
        <span className="truncate">{siteConfig.shortName} Admin</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {adminNav.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-3">
        {userName ? (
          <p className="mb-2 truncate px-1 text-xs text-muted-foreground">
            Signed in as {userName}
          </p>
        ) : null}
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          <LogOut />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
