import type { Metadata } from "next";

import { getEvents, getNews, getNotices } from "@/lib/queries";
import { getDictionary, getLocale } from "@/lib/i18n";
import { PageHeader } from "@/components/public/page-header";
import { Section, SectionHeading } from "@/components/public/section";
import { NewsCard } from "@/components/public/news-card";
import { EventCard } from "@/components/public/event-card";
import { NoticeRow } from "@/components/public/notice-row";

export const metadata: Metadata = { title: "News & Updates" };

export default async function NewsPage() {
  const dict = getDictionary(getLocale());
  const t = dict.updates;

  const [news, events, notices] = await Promise.all([
    getNews(),
    getEvents(),
    getNotices(),
  ]);
  const upcoming = events.filter((e) => !e.isPast);
  const past = events.filter((e) => e.isPast);

  return (
    <>
      <PageHeader title={t.headerTitle} subtitle={t.headerSubtitle} />

      {/* News */}
      <Section>
        <div className="container">
          <SectionHeading
            align="left"
            eyebrow={dict.home.newsEyebrow}
            title={t.newsTitle}
          />
          {news.length === 0 ? (
            <p className="text-muted-foreground">{t.noNews}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <NewsCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Events */}
      <Section id="events" className="bg-muted/40">
        <div className="container space-y-12">
          <div>
            <SectionHeading
              align="left"
              eyebrow={dict.events.upcomingEyebrow}
              title={dict.events.upcomingTitle}
            />
            {upcoming.length === 0 ? (
              <p className="text-muted-foreground">{dict.events.noUpcoming}</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {upcoming.map((event) => (
                  <EventCard key={event._id} item={event} />
                ))}
              </div>
            )}
          </div>

          {past.length > 0 ? (
            <div>
              <SectionHeading
                align="left"
                eyebrow={dict.events.pastEyebrow}
                title={dict.events.pastTitle}
              />
              <div className="grid gap-4 md:grid-cols-2">
                {past.map((event) => (
                  <EventCard key={event._id} item={event} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </Section>

      {/* Notices */}
      <Section id="notices">
        <div className="container max-w-3xl">
          <SectionHeading
            align="left"
            eyebrow={dict.notices.headerTitle}
            title={t.noticesTitle}
          />
          {notices.length === 0 ? (
            <p className="text-muted-foreground">{t.noNotices}</p>
          ) : (
            <div className="rounded-xl border bg-card p-3 shadow-sm sm:p-4">
              {notices.map((notice) => (
                <NoticeRow key={notice._id} notice={notice} />
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
