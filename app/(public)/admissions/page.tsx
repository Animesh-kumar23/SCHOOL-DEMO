import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Download, FileText } from "lucide-react";

import { getDictionary, getLocale } from "@/lib/i18n";
import { PageHeader } from "@/components/public/page-header";
import { Section, SectionHeading } from "@/components/public/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Admissions" };

export default function AdmissionsPage() {
  const dict = getDictionary(getLocale());
  const t = dict.admissions;

  return (
    <>
      <PageHeader title={t.headerTitle} subtitle={t.headerSubtitle} />

      <Section>
        <div className="container">
          <SectionHeading
            eyebrow={t.processEyebrow}
            title={t.processTitle}
            description={t.processDesc}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((step, i) => (
              <div
                key={step.title}
                className="relative rounded-xl border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 grid size-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-muted/40">
        <div className="container max-w-4xl">
          <SectionHeading eyebrow={t.feeEyebrow} title={t.feeTitle} />

          <div className="overflow-x-auto rounded-xl border shadow-sm">
            <table className="w-full text-left text-sm">
              <caption className="bg-brand-dark px-5 py-2 text-left text-xs font-semibold text-white">
                {t.feeYear}
              </caption>
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-5 py-3 font-semibold">{t.feeClass}</th>
                  <th className="px-5 py-3 font-semibold">{t.feeAnnual}</th>
                  <th className="px-5 py-3 font-semibold">{t.feeKit}</th>
                </tr>
              </thead>
              <tbody>
                {t.fees.map((row, i) => (
                  <tr
                    key={row.grade}
                    className={i % 2 ? "bg-muted/40" : "bg-card"}
                  >
                    <td className="px-5 py-3 font-medium">{row.grade}</td>
                    <td className="px-5 py-3">{row.annual}</td>
                    <td className="px-5 py-3">{row.kit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{t.feeInstalmentNote}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {/* One-time charges */}
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-bold">{t.oneTimeTitle}</h3>
              <ul className="space-y-2 text-sm">
                {t.oneTime.map((row) => (
                  <li key={row.label} className="flex justify-between gap-3">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium">{row.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Transport */}
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-bold">{t.transportTitle}</h3>
              <ul className="space-y-2 text-sm">
                {t.transport.map((row) => (
                  <li key={row.range} className="flex justify-between gap-3">
                    <span className="text-muted-foreground">{row.range}</span>
                    <span className="font-medium">{row.amount}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">{t.transportNote}</p>
            </div>

            {/* Discounts */}
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-bold">{t.discountsTitle}</h3>
              <ul className="space-y-2 text-sm">
                {t.discounts.map((row) => (
                  <li key={row.label} className="flex justify-between gap-3">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium text-primary">{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">{t.feeNote}</p>
        </div>
      </Section>

      <Section>
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow={t.checklistEyebrow}
              title={t.checklistTitle}
            />
            <ul className="space-y-3">
              {t.checklist.map((doc) => (
                <li key={doc} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="text-sm">{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center rounded-xl border bg-card p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
              <FileText className="size-7" />
            </div>
            <h3 className="text-xl font-bold">{t.formTitle}</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              {t.formDesc}
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button>
                <Download className="size-4" /> {t.downloadForm}
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">{t.enquireNow}</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
