import type { MetadataRoute } from "next";

import { getEventSlugs, getNewsSlugs } from "@/lib/queries";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticPaths = [
    "",
    // "/academics", // temporarily disabled
    "/admissions",
    "/entrance-exams",
    "/faculty",
    "/gallery",
    "/news",
    "/contact",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));

  const [newsSlugs, eventSlugs] = await Promise.all([
    getNewsSlugs(),
    getEventSlugs(),
  ]);

  const dynamicEntries: MetadataRoute.Sitemap = [
    ...newsSlugs.map((slug) => ({
      url: `${base}/news/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...eventSlugs.map((slug) => ({
      url: `${base}/events/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...staticEntries, ...dynamicEntries];
}
