"use client";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "@/components/admin/image-uploader";

export interface GalleryImageValue {
  url: string;
  alt?: string;
}

export function GalleryImagesField({
  value,
  onChange,
}: {
  value: GalleryImageValue[];
  onChange: (images: GalleryImageValue[]) => void;
}) {
  const images = value ?? [];

  function update(index: number, patch: Partial<GalleryImageValue>) {
    onChange(images.map((img, i) => (i === index ? { ...img, ...patch } : img)));
  }

  return (
    <div className="space-y-3">
      {images.map((img, i) => (
        <div key={i} className="space-y-2 rounded-md border p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Image {i + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange(images.filter((_, idx) => idx !== i))}
            >
              <Trash2 className="size-4 text-destructive" />
              Remove
            </Button>
          </div>
          <ImageUploader value={img.url} onChange={(url) => update(i, { url })} />
          <Input
            placeholder="Alt text (describe the photo)"
            value={img.alt ?? ""}
            onChange={(e) => update(i, { alt: e.target.value })}
          />
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...images, { url: "", alt: "" }])}
      >
        <Plus className="size-4" />
        Add image
      </Button>
    </div>
  );
}
