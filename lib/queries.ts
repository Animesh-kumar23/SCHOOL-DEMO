import { unstable_cache } from "next/cache";

import { connectDB } from "@/lib/db";
import { News } from "@/models/News";
import { Event } from "@/models/Event";
import { Notice } from "@/models/Notice";
import { Gallery } from "@/models/Gallery";
import { Faculty } from "@/models/Faculty";
import { Settings } from "@/models/Settings";
import { siteConfig } from "@/lib/site-config";
import { avatar, principal as demoPrincipal } from "@/lib/demo-content";
import type {
  EventDetail,
  EventListItem,
  FacultyMember,
  GalleryPhoto,
  NewsArticle,
  NewsListItem,
  NoticeItem,
  PrincipalInfo,
  SiteSettings,
} from "@/lib/content-types";

/** Cache tags — revalidated from the admin API on create/update/delete. */
export const CONTENT_TAGS = {
  news: "news",
  events: "events",
  notices: "notices",
  gallery: "gallery",
  faculty: "faculty",
  settings: "settings",
} as const;

const iso = (d: unknown) => (d ? new Date(d as Date).toISOString() : "");

function mapNewsList(d: any): NewsListItem {
  return {
    _id: String(d._id),
    slug: d.slug,
    title: d.title,
    excerpt: d.excerpt ?? "",
    category: d.category || "General",
    date: iso(d.publishedAt),
    image: d.coverImage || "",
  };
}

function mapNewsArticle(d: any): NewsArticle {
  return { ...mapNewsList(d), bodyHtml: d.body || "" };
}

function mapEventList(d: any): EventListItem {
  return {
    _id: String(d._id),
    slug: d.slug,
    title: d.title,
    date: iso(d.eventDate),
    venue: d.venue || "",
    isPast: new Date(d.eventDate).getTime() < Date.now(),
    image: d.coverImage || "",
  };
}

function mapEventDetail(d: any): EventDetail {
  return { ...mapEventList(d), bodyHtml: d.body || "" };
}

export const getNews = unstable_cache(
  async (): Promise<NewsListItem[]> => {
    await connectDB();
    const docs = await News.find({ isDraft: false })
      .sort({ publishedAt: -1 })
      .lean();
    return docs.map(mapNewsList);
  },
  ["news-list"],
  { tags: [CONTENT_TAGS.news] }
);

export const getNewsBySlug = unstable_cache(
  async (slug: string): Promise<NewsArticle | null> => {
    await connectDB();
    const doc = await News.findOne({ slug, isDraft: false }).lean();
    return doc ? mapNewsArticle(doc) : null;
  },
  ["news-by-slug"],
  { tags: [CONTENT_TAGS.news] }
);

export const getNewsSlugs = unstable_cache(
  async (): Promise<string[]> => {
    await connectDB();
    const docs = await News.find({ isDraft: false }).select("slug").lean();
    return docs.map((d: any) => String(d.slug));
  },
  ["news-slugs"],
  { tags: [CONTENT_TAGS.news] }
);

export const getEvents = unstable_cache(
  async (): Promise<EventListItem[]> => {
    await connectDB();
    const docs = await Event.find({ isDraft: false })
      .sort({ eventDate: -1 })
      .lean();
    return docs.map(mapEventList);
  },
  ["events-list"],
  { tags: [CONTENT_TAGS.events] }
);

export const getEventBySlug = unstable_cache(
  async (slug: string): Promise<EventDetail | null> => {
    await connectDB();
    const doc = await Event.findOne({ slug, isDraft: false }).lean();
    return doc ? mapEventDetail(doc) : null;
  },
  ["event-by-slug"],
  { tags: [CONTENT_TAGS.events] }
);

export const getEventSlugs = unstable_cache(
  async (): Promise<string[]> => {
    await connectDB();
    const docs = await Event.find({ isDraft: false }).select("slug").lean();
    return docs.map((d: any) => String(d.slug));
  },
  ["event-slugs"],
  { tags: [CONTENT_TAGS.events] }
);

export const getNotices = unstable_cache(
  async (): Promise<NoticeItem[]> => {
    await connectDB();
    const docs = await Notice.find().sort({ publishedAt: -1 }).lean();
    return docs.map((d: any) => ({
      _id: String(d._id),
      title: d.title,
      category: d.category,
      date: iso(d.publishedAt),
      pdfUrl: d.pdfUrl || "",
    }));
  },
  ["notices-list"],
  { tags: [CONTENT_TAGS.notices] }
);

export const getFaculty = unstable_cache(
  async (): Promise<FacultyMember[]> => {
    await connectDB();
    const docs = await Faculty.find().sort({ order: 1 }).lean();
    return docs.map((d: any) => ({
      _id: String(d._id),
      name: d.name,
      designation: d.designation || "",
      department: d.department || "",
      qualifications: d.qualifications || "",
      photo: d.photo || "",
    }));
  },
  ["faculty-list"],
  { tags: [CONTENT_TAGS.faculty] }
);

export const getGalleryPhotos = unstable_cache(
  async (): Promise<GalleryPhoto[]> => {
    await connectDB();
    const docs = await Gallery.find().sort({ publishedAt: -1 }).lean();
    const photos: GalleryPhoto[] = [];
    for (const album of docs as any[]) {
      for (const img of album.images ?? []) {
        if (!img?.url) continue;
        photos.push({
          url: img.url,
          alt: img.alt || album.title,
          category: album.category,
        });
      }
    }
    return photos;
  },
  ["gallery-photos"],
  { tags: [CONTENT_TAGS.gallery] }
);

/**
 * The principal card on the home/about pages derives from the Faculty member whose
 * designation contains "Principal" (falling back to the first member, then to demo
 * copy). Their Bio becomes the message; tagged `faculty` so admin edits revalidate it.
 */
export const getPrincipal = unstable_cache(
  async (): Promise<PrincipalInfo> => {
    await connectDB();
    let doc: any = await Faculty.findOne({
      designation: { $regex: "principal", $options: "i" },
    }).lean();
    if (!doc) doc = await Faculty.findOne().sort({ order: 1 }).lean();

    if (!doc) {
      return {
        name: demoPrincipal.name,
        designation: demoPrincipal.designation,
        photo: demoPrincipal.photo,
        message: demoPrincipal.message,
      };
    }

    const bio = (doc.bio || "").trim();
    const message = bio
      ? bio.split(/\n+/).map((s: string) => s.trim()).filter(Boolean)
      : demoPrincipal.message;

    return {
      name: doc.name,
      designation: doc.designation || "Principal",
      photo: doc.photo || avatar(doc.name),
      message,
    };
  },
  ["principal"],
  { tags: [CONTENT_TAGS.faculty] }
);

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    await connectDB();
    const doc: any = await Settings.findOne({ key: "site" }).lean();
    return {
      schoolName: doc?.schoolName || siteConfig.name,
      tagline: doc?.tagline || siteConfig.tagline,
      logoUrl: doc?.logoUrl || "",
      heroImage: doc?.heroImages?.[0] || "/rr/bihar-diwas.jpg",
      address: doc?.address || siteConfig.address,
      phone: doc?.phone || siteConfig.phone,
      email: doc?.email || siteConfig.email,
      socials: {
        facebook: doc?.socials?.facebook || "",
        instagram: doc?.socials?.instagram || "",
        youtube: doc?.socials?.youtube || "",
        twitter: doc?.socials?.twitter || "",
      },
      mapEmbedUrl:
        doc?.mapEmbedUrl ||
        "https://www.google.com/maps?q=New+Delhi&output=embed",
    };
  },
  ["site-settings"],
  { tags: [CONTENT_TAGS.settings] }
);
