import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { mainNav } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/content-types";
import type { Dictionary } from "@/lib/i18n";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/public/social-icons";

export function SiteFooter({
  settings,
  dict,
}: {
  settings: SiteSettings;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();
  const { socials } = settings;

  return (
    <footer className="bg-brand-dark text-white/70">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-1">
          <div className="flex items-center gap-2.5 font-semibold text-white">
            {settings.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={settings.logoUrl}
                alt={dict.common.schoolName}
                className="size-10 rounded-md bg-white object-contain"
              />
            ) : (
              <span className="grid size-10 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
                RR
              </span>
            )}
            {dict.common.schoolShort}
          </div>
          <p className="text-sm">{dict.common.schoolBlurb}</p>
          <div className="flex items-center gap-3 pt-1">
            {socials.facebook ? (
              <a href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-8 place-items-center rounded-full bg-white/10 hover:bg-gold hover:text-gold-foreground">
                <FacebookIcon className="size-4" />
              </a>
            ) : null}
            {socials.instagram ? (
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-8 place-items-center rounded-full bg-white/10 hover:bg-gold hover:text-gold-foreground">
                <InstagramIcon className="size-4" />
              </a>
            ) : null}
            {socials.youtube ? (
              <a href={socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="grid size-8 place-items-center rounded-full bg-white/10 hover:bg-gold hover:text-gold-foreground">
                <YoutubeIcon className="size-4" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            {dict.footer.quickLinks}
          </h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:text-white">
                  {dict.navLabels[link.href] ?? link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            {dict.footer.reachUs}
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>{settings.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-gold" />
              <a href={`tel:${settings.phone}`} className="hover:text-white">
                {settings.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-gold" />
              <a href={`mailto:${settings.email}`} className="hover:text-white">
                {settings.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            {dict.footer.schoolHours}
          </h3>
          <ul className="space-y-1.5 text-sm">
            <li>{dict.footer.hoursMonFri}</li>
            <li>{dict.footer.hoursSat}</li>
            <li>{dict.footer.hoursSun}</li>
            <li className="pt-2 text-white">{dict.footer.office}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="container flex flex-col items-center justify-between gap-2 text-xs sm:flex-row">
          <p>
            © {year} {dict.common.schoolName}. {dict.footer.rights}
          </p>
          <Link href="/admin" className="hover:text-white">
            {dict.common.staffLogin}
          </Link>
        </div>
      </div>
    </footer>
  );
}
