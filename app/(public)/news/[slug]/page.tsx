import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getNews, getNewsBySlug, getNewsSlugs } from "@/lib/queries";
import { getDictionary, getLocale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { NewsCard } from "@/components/public/news-card";

const proseClass =
  "max-w-none text-base leading-relaxed text-muted-foreground [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mb-1 [&_h3]:mt-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline";

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const item = await getNewsBySlug(params.slug);
  if (!item) return { title: "News" };
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: item.image ? [item.image] : undefined,
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const item = await getNewsBySlug(params.slug);
  if (!item) notFound();

  const dict = getDictionary(getLocale());
  const related = (await getNews())
    .filter((n) => n.slug !== item.slug)
    .slice(0, 3);

  return (
    <article>
      <div className="relative h-[40vh] min-h-[280px] w-full bg-brand-dark">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent" />
        <div className="container relative flex h-full flex-col justify-end pb-8 text-white">
          <span className="mb-3 w-fit rounded bg-gold px-2 py-0.5 text-xs font-semibold text-gold-foreground">
            {item.category}
          </span>
          <h1 className="max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {item.title}
          </h1>
          <time className="mt-3 text-sm text-white/80">
            {formatDate(item.date)}
          </time>
        </div>
      </div>

      <div className="container max-w-3xl py-12">
        <Link
          href="/news"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="size-4" /> {dict.common.backToNews}
        </Link>
        <div
          className={proseClass}
          dangerouslySetInnerHTML={{ __html: item.bodyHtml }}
        />
      </div>

      {related.length > 0 ? (
        <section className="border-t bg-muted/40 py-12">
          <div className="container">
            <h2 className="mb-6 text-xl font-bold">{dict.news.moreNews}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <NewsCard key={r.slug} item={r} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
