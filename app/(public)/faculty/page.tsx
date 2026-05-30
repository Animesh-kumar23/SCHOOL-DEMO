import type { Metadata } from "next";

import { getFaculty } from "@/lib/queries";
import { getDictionary, getLocale } from "@/lib/i18n";
import { PageHeader } from "@/components/public/page-header";
import { Section } from "@/components/public/section";
import { FacultyCard } from "@/components/public/faculty-card";

export const metadata: Metadata = { title: "Staff" };

export default async function FacultyPage() {
  const t = getDictionary(getLocale()).faculty;
  const faculty = await getFaculty();

  const departments: string[] = [];
  for (const member of faculty) {
    const dept = member.department || "Staff";
    if (!departments.includes(dept)) departments.push(dept);
  }

  return (
    <>
      <PageHeader title={t.headerTitle} subtitle={t.headerSubtitle} />

      <Section>
        <div className="container space-y-12">
          {faculty.length === 0 ? (
            <p className="text-center text-muted-foreground">{t.empty}</p>
          ) : (
            departments.map((dept) => (
              <div key={dept}>
                <div className="mb-6 flex items-center gap-3">
                  <h2 className="text-xl font-bold tracking-tight">{dept}</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {faculty
                    .filter((m) => (m.department || "Faculty") === dept)
                    .map((member) => (
                      <FacultyCard key={member._id} member={member} />
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </Section>
    </>
  );
}
