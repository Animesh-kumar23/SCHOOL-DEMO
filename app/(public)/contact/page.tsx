import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { getSiteSettings } from "@/lib/queries";
import { getDictionary, getLocale } from "@/lib/i18n";
import { PageHeader } from "@/components/public/page-header";
import { Section } from "@/components/public/section";
import { ContactForm } from "@/components/public/contact-form";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const t = getDictionary(getLocale()).contact;
  const settings = await getSiteSettings();

  const details = [
    { icon: MapPin, label: t.addressLabel, value: settings.address },
    { icon: Phone, label: t.phoneLabel, value: settings.phone },
    { icon: Mail, label: t.emailLabel, value: settings.email },
    { icon: Clock, label: t.officeHoursLabel, value: t.officeHoursValue },
  ];

  return (
    <>
      <PageHeader title={t.headerTitle} subtitle={t.headerSubtitle} />

      <Section>
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {details.map((d) => (
              <div
                key={d.label}
                className="flex items-start gap-4 rounded-xl border bg-card p-5 shadow-sm"
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <d.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{d.label}</p>
                  <p className="text-sm text-muted-foreground">{d.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold">{t.sendTitle}</h2>
            <ContactForm labels={t} />
          </div>
        </div>
      </Section>

      <section className="border-t">
        <div className="aspect-[16/7] w-full">
          <iframe
            title="School location map"
            src={settings.mapEmbedUrl}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
