import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";

import { getEventBySlug, getEventSlugs } from "@/lib/queries";
import { getDictionary, getLocale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const proseClass =
  "max-w-none text-base leading-relaxed text-muted-foreground [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mb-1 [&_h3]:mt-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline";

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: "Events" };
  return { title: event.title };
}

export default async function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  const dict = getDictionary(getLocale());

  return (
    <article>
      <div className="relative h-[40vh] min-h-[280px] w-full bg-brand-dark">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent" />
        <div className="container relative flex h-full flex-col justify-end pb-8 text-white">
          <span className="mb-3 w-fit rounded bg-gold px-2 py-0.5 text-xs font-semibold text-gold-foreground">
            {event.isPast ? dict.common.pastEvent : dict.common.upcoming}
          </span>
          <h1 className="max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="container max-w-3xl py-12">
        <Link
          href="/news#events"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="size-4" /> {dict.common.backToEvents}
        </Link>

        <div className="mb-8 flex flex-wrap gap-4 rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="size-5 text-primary" />
            <span className="font-medium">{formatDate(event.date)}</span>
          </div>
          {event.venue ? (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="size-5 text-primary" />
              <span className="font-medium">{event.venue}</span>
            </div>
          ) : null}
        </div>

        <div
          className={proseClass}
          dangerouslySetInnerHTML={{ __html: event.bodyHtml }}
        />

        {!event.isPast ? (
          <div className="mt-10">
            <Button asChild>
              <Link href="/contact">{dict.events.enquireEvent}</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </article>
  );
}
