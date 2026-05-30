"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Menu, Phone, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/content-types";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/public/language-toggle";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/public/social-icons";

export function SiteHeader({
  settings,
  dict,
  locale,
}: {
  settings: SiteSettings;
  dict: Dictionary;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const { socials } = settings;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top utility bar */}
      <div className="hidden bg-brand-dark text-white/80 md:block">
        <div className="container flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-1.5 hover:text-white">
              <Phone className="size-3.5" />
              {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 hover:text-white">
              <Mail className="size-3.5" />
              {settings.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            {socials.facebook ? (
              <a href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white">
                <FacebookIcon className="size-4" />
              </a>
            ) : null}
            {socials.instagram ? (
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">
                <InstagramIcon className="size-4" />
              </a>
            ) : null}
            {socials.youtube ? (
              <a href={socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white">
                <YoutubeIcon className="size-4" />
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 font-semibold">
            {settings.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={settings.logoUrl}
                alt={dict.common.schoolName}
                className="size-10 shrink-0 rounded-md object-contain"
              />
            ) : (
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
                RR
              </span>
            )}
            <span className="leading-tight">
              <span className="block text-sm sm:text-base">{dict.common.schoolName}</span>
              <span className="block text-[11px] font-normal text-muted-foreground">
                {settings.tagline}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {dict.navLabels[link.href] ?? link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <LanguageToggle
              locale={locale}
              label={dict.common.switchTo}
              className="text-muted-foreground hover:bg-accent hover:text-foreground"
            />
            <Button
              asChild
              size="sm"
              className="hidden bg-gold text-gold-foreground hover:bg-gold/90 sm:inline-flex"
            >
              <Link href="/admissions">{dict.common.admissions}</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn("border-t xl:hidden", open ? "block" : "hidden")}>
          <nav className="container flex flex-col py-2">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {dict.navLabels[link.href] ?? link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
