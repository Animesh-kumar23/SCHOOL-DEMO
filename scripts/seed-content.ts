/**
 * Seeds the demo content (news, events, notices, gallery, faculty, submissions,
 * settings) into MongoDB so the admin CMS has data to manage.
 *
 *   npm run seed:content           # seed only collections that are empty
 *   npm run seed:content -- --fresh  # wipe those collections first, then seed
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import mongoose from "mongoose";

import {
  news,
  events,
  notices,
  faculty,
  gallery,
  principal as founder,
} from "../lib/demo-content";
import { siteConfig } from "../lib/site-config";
import { News } from "../models/News";
import { Event } from "../models/Event";
import { Notice } from "../models/Notice";
import { Gallery } from "../models/Gallery";
import { Faculty } from "../models/Faculty";
import { Submission } from "../models/Submission";
import { Settings } from "../models/Settings";

function loadEnv(file = ".env.local") {
  try {
    const content = readFileSync(resolve(process.cwd(), file), "utf8");
    for (const rawLine of content.split("\n")) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      let val = line.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch {
    /* optional */
  }
}

const toHtml = (paragraphs: string[]) =>
  paragraphs.map((p) => `<p>${p}</p>`).join("");

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

async function seedCollection(
  name: string,
  model: mongoose.Model<any>,
  docs: Record<string, unknown>[],
  fresh: boolean
) {
  if (fresh) await model.deleteMany({});
  const count = await model.estimatedDocumentCount();
  if (count > 0) {
    console.log(`• ${name}: ${count} existing docs — skipped (use --fresh to reset)`);
    return;
  }
  await model.insertMany(docs);
  console.log(`✓ ${name}: seeded ${docs.length} docs`);
}

async function main() {
  loadEnv();
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set (.env.local)");

  const fresh = process.argv.includes("--fresh");
  await mongoose.connect(uri);

  await seedCollection(
    "news",
    News,
    news.map((n) => ({
      title: n.title,
      slug: n.slug,
      category: n.category,
      excerpt: n.excerpt,
      body: toHtml(n.body),
      coverImage: n.image,
      publishedAt: new Date(n.date),
      isDraft: false,
    })),
    fresh
  );

  await seedCollection(
    "events",
    Event,
    events.map((e) => ({
      title: e.title,
      slug: e.slug,
      body: toHtml(e.body),
      eventDate: new Date(e.date),
      venue: e.venue,
      coverImage: e.image,
      isDraft: false,
    })),
    fresh
  );

  await seedCollection(
    "notices",
    Notice,
    notices.map((n) => ({
      title: n.title,
      pdfUrl: "",
      category: n.category,
      publishedAt: new Date(n.date),
    })),
    fresh
  );

  const categories = ["events", "campus", "sports", "academics", "cultural"];
  const galleryDocs = categories
    .map((cat) => ({
      title: `${cap(cat)} Highlights`,
      category: cat,
      images: gallery
        .filter((g) => g.category === cat)
        .map((g) => ({ url: g.url, alt: g.alt })),
      publishedAt: new Date(),
    }))
    .filter((doc) => doc.images.length > 0);
  await seedCollection("gallery", Gallery, galleryDocs, fresh);

  await seedCollection(
    "faculty",
    Faculty,
    faculty.map((f, i) => ({
      name: f.name,
      designation: f.designation,
      department: f.department,
      photo: f.photo,
      qualifications: f.qualifications,
      bio: f.bio ?? "",
      order: i,
    })),
    fresh
  );

  await seedCollection(
    "submissions",
    Submission,
    [
      {
        name: "Rohan Gupta",
        phone: "9876543210",
        message: "I would like to know about admission for Class 6 and the documents required.",
        resolved: false,
      },
      {
        name: "Meera Devi",
        phone: "9123456780",
        message: "What are the school timings and the transport charges for the new session?",
        resolved: false,
      },
      {
        name: "Imran Ali",
        phone: "9123456789",
        message: "Please share the hostel facility details and monthly charges.",
        resolved: true,
      },
    ],
    fresh
  );

  // Settings is a singleton — upsert rather than skip.
  await Settings.findOneAndUpdate(
    { key: "site" },
    {
      key: "site",
      schoolName: siteConfig.name,
      tagline: siteConfig.tagline,
      logoUrl: "/rr/logo.jpg",
      heroImages: ["/rr/hero-home.jpg"],
      address: siteConfig.address,
      phone: siteConfig.phone,
      email: siteConfig.email,
      socials: { facebook: "https://facebook.com/rrissamastipur" },
      founder: {
        name: founder.name,
        designation: founder.designation,
        photo: "",
        message: founder.message.join("\n\n"),
      },
      mapEmbedUrl:
        "https://www.google.com/maps?q=Jitwarpur+Samastipur+Bihar&output=embed",
    },
    { upsert: true }
  );
  console.log("✓ settings: upserted site document");

  await mongoose.disconnect();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
