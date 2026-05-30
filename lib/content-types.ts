/**
 * Plain, client-safe content types shared by public components and the query
 * layer. No imports here, so client components can use these types freely.
 */

export interface NewsListItem {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

export interface NewsArticle extends NewsListItem {
  bodyHtml: string;
}

export interface EventListItem {
  _id: string;
  slug: string;
  title: string;
  date: string;
  venue: string;
  isPast: boolean;
  image: string;
}

export interface EventDetail extends EventListItem {
  bodyHtml: string;
}

export type NoticeCategory =
  | "general"
  | "examination"
  | "admission"
  | "circular"
  | "holiday";

export interface NoticeItem {
  _id: string;
  title: string;
  category: NoticeCategory;
  date: string;
  pdfUrl: string;
}

export interface FacultyMember {
  _id: string;
  name: string;
  designation: string;
  department: string;
  qualifications: string;
  photo: string;
}

export type GalleryCategory =
  | "events"
  | "campus"
  | "sports"
  | "academics"
  | "cultural";

export interface GalleryPhoto {
  url: string;
  alt: string;
  category: GalleryCategory;
}

export interface SiteSettings {
  schoolName: string;
  tagline: string;
  logoUrl: string;
  heroImage: string;
  address: string;
  phone: string;
  email: string;
  socials: {
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
  };
  mapEmbedUrl: string;
}

export interface PrincipalInfo {
  name: string;
  designation: string;
  photo: string;
  message: string[];
}
