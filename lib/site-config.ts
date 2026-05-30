/**
 * Central, build-time site configuration. Editable per-instance values (school
 * name, contact, socials) ultimately come from the Settings collection at runtime,
 * but these defaults drive metadata and the static nav before DB content loads.
 */
export const siteConfig = {
  name: "RR International School & Hostel",
  shortName: "RR International",
  tagline: "संस्कार से शिक्षा",
  description:
    "RR International School & Hostel, Samastipur — value-based education from Nursery to Class 10, with hostel facility, smart classes and in-house entrance-exam coaching.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "8340474969",
  email: "rrissamastipur@gmail.com",
  address: "Paper Mill Campus, Jitwarpur, Samastipur, Bihar 848101",
};

export type NavLink = { label: string; href: string };

// Admissions intentionally lives only as the gold CTA button in the header, not
// here. News & Updates folds in events + notices; About is merged into Home.
export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  // Academics temporarily disabled — re-enable this link + remove notFound() in
  // app/(public)/academics/page.tsx and restore /academics in app/sitemap.ts.
  // { label: "Academics", href: "/academics" },
  { label: "Entrance Exams", href: "/entrance-exams" },
  { label: "Staff", href: "/faculty" },
  { label: "Gallery", href: "/gallery" },
  { label: "News & Events", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

export const adminNav: NavLink[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "News", href: "/admin/news" },
  { label: "Events", href: "/admin/events" },
  { label: "Notices", href: "/admin/notices" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Faculty", href: "/admin/faculty" },
  { label: "Submissions", href: "/admin/submissions" },
  { label: "Settings", href: "/admin/settings" },
];
