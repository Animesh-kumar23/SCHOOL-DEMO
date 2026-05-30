import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GraduationCap } from "lucide-react";

import { getDictionary, getLocale } from "@/lib/i18n";
import { PageHeader } from "@/components/public/page-header";
import { Section, SectionHeading } from "@/components/public/section";

export const metadata: Metadata = { title: "Academics" };

export default function AcademicsPage() {
  // Academics is temporarily disabled. To re-enable: delete the next line,
  // restore the nav link in lib/site-config.ts and the path in app/sitemap.ts.
  notFound();

  const t = getDictionary(getLocale()).academics;

  return (
    <>
      <PageHeader title={t.headerTitle} subtitle={t.headerSubtitle} />

      <Section>
        <div className="container">
          <SectionHeading
            eyebrow={t.programmesEyebrow}
            title={t.programmesTitle}
            description={t.programmesDesc}
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {t.streams.map((stream) => (
              <div
                key={stream.name}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <div className="mb-3 grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <GraduationCap className="size-5" />
                </div>
                <h3 className="font-bold">{stream.name}</h3>
                <p className="text-sm font-medium text-primary">
                  {stream.classes}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stream.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-muted/40">
        <div className="container max-w-3xl">
          <SectionHeading eyebrow={t.approachEyebrow} title={t.approachTitle} />
          <div className="space-y-4 text-muted-foreground">
            <p>{t.approachPara1}</p>
            <p>{t.approachPara2}</p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container max-w-3xl">
          <SectionHeading eyebrow={t.resultsEyebrow} title={t.resultsTitle} />
          <div className="overflow-hidden rounded-xl border shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-5 py-3 font-semibold">{t.tableExam}</th>
                  <th className="px-5 py-3 font-semibold">{t.tablePass}</th>
                  <th className="px-5 py-3 font-semibold">
                    {t.tableDistinction}
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.results.map((row, i) => (
                  <tr
                    key={row.exam}
                    className={i % 2 ? "bg-muted/40" : "bg-card"}
                  >
                    <td className="px-5 py-3 font-medium">{row.exam}</td>
                    <td className="px-5 py-3">{row.pass}</td>
                    <td className="px-5 py-3">{row.distinction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {t.resultsNote}
          </p>
        </div>
      </Section>
    </>
  );
}
