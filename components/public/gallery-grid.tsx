"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import type { GalleryPhoto } from "@/lib/content-types";

const categories = [
  "all",
  "events",
  "campus",
  "sports",
  "academics",
  "cultural",
] as const;

export function GalleryGrid({
  images,
  categoryLabels,
}: {
  images: GalleryPhoto[];
  categoryLabels: Record<string, string>;
}) {
  const [active, setActive] = useState<(typeof categories)[number]>("all");
  const filtered =
    active === "all" ? images : images.filter((img) => img.category === active);

  return (
    <div>
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-colors",
              active === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "hover:bg-accent"
            )}
          >
            {categoryLabels[cat] ?? cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((img, i) => (
          <div
            key={`${img.url}-${i}`}
            className="group relative aspect-square overflow-hidden rounded-lg border"
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/70 to-transparent p-3 text-xs text-white transition-transform duration-300 group-hover:translate-y-0">
              {img.alt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
