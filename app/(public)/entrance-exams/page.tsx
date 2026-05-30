import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Award, CheckCircle2, Phone } from "lucide-react";

import { getSiteSettings } from "@/lib/queries";
import { getDictionary, getLocale } from "@/lib/i18n";
import { PageHeader } from "@/components/public/page-header";
import { Section, SectionHeading } from "@/components/public/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Entrance Exam Coaching" };

export default async function EntranceExamsPage() {
  const dict = getDictionary(getLocale());
  const t = dict.entrance;
  const settings = await getSiteSettings();

  return (
    <>
      <PageHeader title={t.headerTitle} subtitle={t.headerSubtitle} />

      <Section>
        <div className="container max-w-3xl text-center">
          <p className="text-lg text-muted-foreground">{t.intro}</p>
          <p className="mt-6 inline-block rounded-full bg-gold px-5 py-2 text-sm font-semibold text-gold-foreground">
            {t.feeBadge}
          </p>
          <div className="relative mx-auto mt-8 aspect-[3/4] w-full max-w-xs overflow-hidden rounded-xl border bg-muted shadow-md">
            <Image
              src="/rr/entrance-coaching.jpg"
              alt={t.batchesTitle}
              fill
              sizes="320px"
              className="object-contain"
            />
          </div>
        </div>
      </Section>

      <Section className="bg-muted/40">
        <div className="container">
          <SectionHeading eyebrow={t.batchesEyebrow} title={t.batchesTitle} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.batches.map((batch) => (
              <div
                key={batch.name}
                className="rounded-xl border bg-card p-6 text-center shadow-sm"
              >
                <h3 className="text-lg font-bold text-primary">{batch.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {batch.target}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container">
          <SectionHeading eyebrow={t.examsEyebrow} title={t.examsTitle} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.exams.map((exam) => (
              <div
                key={exam.name}
                className="rounded-xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <div className="mb-4 grid size-12 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Award className="size-6" />
                </div>
                <h3 className="font-bold">{exam.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{exam.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container max-w-3xl">
          <SectionHeading eyebrow={t.whyEyebrow} title={t.whyTitle} />
          <ul className="grid gap-4 sm:grid-cols-2">
            {t.why.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-lg border bg-card p-5 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <section className="bg-primary">
        <div className="container flex flex-col items-center gap-6 py-16 text-center text-primary-foreground">
          <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {t.ctaTitle}
          </h2>
          <p className="max-w-xl text-primary-foreground/85">{t.ctaDesc}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-gold text-gold-foreground hover:bg-gold/90"
            >
              <a href={`tel:${settings.phone}`}>
                <Phone className="size-4" /> {t.callNow}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/60 bg-transparent text-white hover:bg-white hover:text-primary"
            >
              <Link href="/contact">{dict.common.contactUs}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
