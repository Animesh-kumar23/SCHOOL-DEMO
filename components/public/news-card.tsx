import Link from "next/link";
import Image from "next/image";

import { formatDate } from "@/lib/utils";
import { getDictionary, getLocale } from "@/lib/i18n";
import type { NewsListItem } from "@/lib/content-types";

export function NewsCard({ item }: { item: NewsListItem }) {
  const dict = getDictionary(getLocale());
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition hover:shadow-md">
      <Link href={`/news/${item.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded bg-gold px-2 py-0.5 text-xs font-semibold text-gold-foreground">
            {item.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <time className="text-xs text-muted-foreground">
            {formatDate(item.date)}
          </time>
          <h3 className="font-semibold leading-snug transition-colors group-hover:text-primary">
            {item.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {item.excerpt}
          </p>
          <span className="mt-auto pt-1 text-sm font-medium text-primary">
            {dict.common.readMore} →
          </span>
        </div>
      </Link>
    </article>
  );
}
