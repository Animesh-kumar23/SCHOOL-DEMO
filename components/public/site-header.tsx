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
        <div className="container flex min-h-20 items-center justify-between gap-3 py-2 xl:h-16 xl:min-h-0 xl:py-0">
          <Link href="/" className="flex min-w-0 flex-col gap-0.5 font-semibold">
            <span className="flex items-center gap-2.5">
              {settings.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={settings.logoUrl}
                  alt={dict.common.schoolName}
                  className="size-12 shrink-0 rounded-md object-contain xl:size-10"
                />
              ) : (
                <span className="grid size-12 shrink-0 place-items-center rounded-md bg-primary text-base font-bold text-primary-foreground xl:size-10 xl:text-sm">
                  RR
                </span>
              )}
              <span className="text-base font-bold leading-tight xl:text-base xl:font-semibold">
                {dict.common.schoolName}
              </span>
            </span>
            <span className="text-xs font-normal leading-tight text-muted-foreground xl:text-[11px]">
              {settings.tagline}
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
              className="size-11 xl:hidden [&_svg]:size-6"
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
          <nav className="container flex flex-col py-3">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent active:bg-accent"
              >
                {dict.navLabels[link.href] ?? link.label}
              </Link>
            ))}
            <Button
              asChild
              size="lg"
              className="mt-2 bg-gold text-base text-gold-foreground hover:bg-gold/90"
              onClick={() => setOpen(false)}
            >
              <Link href="/admissions">{dict.common.admissions}</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
