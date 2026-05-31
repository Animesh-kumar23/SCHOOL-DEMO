import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Eye, Target } from "lucide-react";

import {
  getEvents,
  getGalleryPhotos,
  getNews,
  getNotices,
  getPrincipal,
  getSiteSettings,
} from "@/lib/queries";
import { getDictionary, getLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/public/section";
import { Hero } from "@/components/public/hero";
import { NewsTicker } from "@/components/public/news-ticker";
import { StatsBand } from "@/components/public/stats-band";
import { ProgramCard } from "@/components/public/program-card";
import { PrincipalMessage } from "@/components/public/principal-message";
import { NewsCard } from "@/components/public/news-card";
import { EventCard } from "@/components/public/event-card";
import { NoticeRow } from "@/components/public/notice-row";

export default async function HomePage() {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const t = dict.home;
  const a = dict.about;

  const [news, events, notices, photos, settings, principal] =
    await Promise.all([
      getNews(),
      getEvents(),
      getNotices(),
      getGalleryPhotos(),
      getSiteSettings(),
      getPrincipal(),
    ]);

  const upcomingEvents = events.filter((e) => !e.isPast).slice(0, 3);
  const latestNews = news.slice(0, 3);
  const latestNotices = notices.slice(0, 6);
  const galleryTeaser = photos.slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: settings.schoolName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: settings.phone,
    email: settings.email,
    address: { "@type": "PostalAddress", streetAddress: settings.address },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero dict={dict} tagline={settings.tagline} image={settings.heroImage} />
      <NewsTicker label={dict.ticker.label} items={dict.ticker.items} />

      {/* Welcome / About story */}
      <Section id="story">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/rr/classroom-home.jpg"
                alt={settings.schoolName}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden rounded-xl bg-gold p-5 text-center text-gold-foreground shadow-lg sm:block">
              <div className="text-3xl font-bold">{t.yearsOfTrust}</div>
              <div className="text-xs font-medium">{t.welcomeEyebrow}</div>
            </div>
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow={a.storyEyebrow}
              title={a.storyTitle}
              className="mb-6"
            />
            <p className="text-muted-foreground">{a.intro}</p>
            <p className="mt-4 text-muted-foreground">{a.storyPara2}</p>
            <ul className="mt-6 space-y-3">
              {t.highlights.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-muted/40">
        <div className="container grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-8 shadow-sm">
            <div className="mb-4 grid size-12 place-items-center rounded-lg bg-primary/10 text-primary">
              <Target className="size-6" />
            </div>
            <h3 className="text-xl font-bold">{a.missionTitle}</h3>
            <p className="mt-2 text-muted-foreground">{a.mission}</p>
          </div>
          <div className="rounded-xl border bg-card p-8 shadow-sm">
            <div className="mb-4 grid size-12 place-items-center rounded-lg bg-gold/20 text-gold-foreground">
              <Eye className="size-6" />
            </div>
            <h3 className="text-xl font-bold">{a.visionTitle}</h3>
            <p className="mt-2 text-muted-foreground">{a.vision}</p>
          </div>
        </div>
      </Section>

      {/* Core values */}
      <Section>
        <div className="container">
          <SectionHeading eyebrow={a.valuesEyebrow} title={a.valuesTitle} />
          <div className="flex flex-wrap justify-center gap-3">
            {a.values.map((value) => (
              <span
                key={value}
                className="rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm font-medium text-primary"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Why choose us */}
      <Section className="bg-muted/40">
        <div className="container">
          <SectionHeading
            eyebrow={t.whyEyebrow}
            title={t.whyTitle}
            description={t.whyDesc}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dict.programs.map((program) => (
              <ProgramCard key={program.title} program={program} />
            ))}
          </div>
        </div>
      </Section>

      <StatsBand stats={dict.stats} />

      {/* Facilities */}
      <Section className="bg-muted/40">
        <div className="container">
          <SectionHeading eyebrow={a.infraEyebrow} title={a.infraTitle} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {a.infrastructure.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border bg-card p-5 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Principal message */}
      <Section>
        <div className="container">
          <SectionHeading
            eyebrow={t.principalEyebrow}
            title={t.principalTitle}
          />
          <PrincipalMessage principal={principal} />
        </div>
      </Section>

      {/* Latest news */}
      {latestNews.length > 0 ? (
        <Section className="bg-muted/40">
          <div className="container">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                align="left"
                eyebrow={t.newsEyebrow}
                title={t.newsTitle}
                className="mb-0"
              />
              <Button asChild variant="outline">
                <Link href="/news">{dict.common.viewAllNews}</Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestNews.map((item) => (
                <NewsCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {/* Events + Notices */}
      <Section>
        <div className="container grid gap-10 lg:grid-cols-2">
          <div className="min-w-0">
            <SectionHeading
              align="left"
              eyebrow={t.eventsEyebrow}
              title={t.eventsTitle}
            />
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <EventCard key={event._id} item={event} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground">{t.noEvents}</p>
              )}
              <Button asChild variant="outline" className="w-full">
                <Link href="/news#events">{dict.common.viewAllEvents}</Link>
              </Button>
            </div>
          </div>

          <div className="min-w-0">
            <SectionHeading
              align="left"
              eyebrow={t.noticesEyebrow}
              title={t.noticesTitle}
            />
            <div className="rounded-lg border bg-card p-2 shadow-sm">
              {latestNotices.length > 0 ? (
                latestNotices.map((notice) => (
                  <NoticeRow key={notice._id} notice={notice} />
                ))
              ) : (
                <p className="p-4 text-sm text-muted-foreground">
                  {t.noNotices}
                </p>
              )}
            </div>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link href="/news#notices">{dict.common.viewAllNotices}</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Gallery teaser */}
      {galleryTeaser.length > 0 ? (
        <Section className="bg-muted/40">
          <div className="container">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                align="left"
                eyebrow={t.galleryEyebrow}
                title={t.galleryTitle}
                className="mb-0"
              />
              <Button asChild variant="outline">
                <Link href="/gallery">{dict.common.viewFullGallery}</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {galleryTeaser.map((img, i) => (
                <div
                  key={`${img.url}-${i}`}
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {/* CTA */}
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
              <Link href="/admissions">{dict.common.applyAdmission}</Link>
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
