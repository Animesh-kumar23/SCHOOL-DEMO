/**
 * One-off, NON-destructive: adds the new school photos to the live gallery.
 *
 * It only inserts — never deletes or overwrites existing images. Idempotent:
 * re-running skips any photo already present (matched by URL). New category
 * albums are created only if one doesn't already exist.
 *
 *   npx tsx scripts/add-gallery-photos.ts
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import mongoose from "mongoose";

import { Gallery } from "../models/Gallery";

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

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type Cat = "events" | "campus" | "sports" | "academics" | "cultural";

// The new photos to surface in the live gallery (already deployed to /rr/).
const newPhotos: { url: string; alt: string; category: Cat }[] = [
  { url: "/rr/campus-building.jpg", alt: "RR International School & Hostel campus, Jitwarpur, Samastipur", category: "campus" },
  { url: "/rr/independence-day.jpg", alt: "Students waving the tricolour on Independence Day", category: "cultural" },
  { url: "/rr/students-awards.jpg", alt: "Students with RR Foundation Excellence Award certificates", category: "events" },
  { url: "/rr/staff-felicitation.jpg", alt: "Staff felicitation at an RR International function", category: "events" },
  { url: "/rr/management-team.jpg", alt: "RR International School management at a school function", category: "events" },
  { url: "/rr/classroom-home.jpg", alt: "Students in an RR International classroom", category: "campus" },
];

async function main() {
  loadEnv();
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set (.env.local)");
  await mongoose.connect(uri);

  const byCat = new Map<Cat, { url: string; alt: string }[]>();
  for (const p of newPhotos) {
    if (!byCat.has(p.category)) byCat.set(p.category, []);
    byCat.get(p.category)!.push({ url: p.url, alt: p.alt });
  }

  let added = 0;
  let skipped = 0;
  let albumsCreated = 0;

  for (const [category, imgs] of Array.from(byCat.entries())) {
    let album = await Gallery.findOne({ category });
    if (!album) {
      album = new Gallery({
        title: `${cap(category)} Highlights`,
        category,
        images: [],
        publishedAt: new Date(),
      });
      albumsCreated++;
      console.log(`+ created album: ${cap(category)} Highlights (${category})`);
    }
    const existing = new Set((album.images ?? []).map((i: any) => i.url));
    for (const img of imgs) {
      if (existing.has(img.url)) {
        skipped++;
        console.log(`  = skip (already there): ${img.url}`);
        continue;
      }
      album.images.push(img as any);
      existing.add(img.url);
      added++;
      console.log(`  + added to ${category}: ${img.url}`);
    }
    await album.save();
  }

  console.log(
    `\nDone. albums created: ${albumsCreated}, images added: ${added}, skipped: ${skipped}`
  );
  await mongoose.disconnect();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Failed:", err);
    process.exit(1);
  });
