import type { Metadata } from "next";

import { getGalleryPhotos } from "@/lib/queries";
import { getDictionary, getLocale } from "@/lib/i18n";
import { PageHeader } from "@/components/public/page-header";
import { Section } from "@/components/public/section";
import { GalleryGrid } from "@/components/public/gallery-grid";

export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const t = getDictionary(getLocale()).gallery;
  const photos = await getGalleryPhotos();

  return (
    <>
      <PageHeader title={t.headerTitle} subtitle={t.headerSubtitle} />
      <Section>
        <div className="container">
          {photos.length === 0 ? (
            <p className="text-center text-muted-foreground">{t.empty}</p>
          ) : (
            <GalleryGrid images={photos} categoryLabels={t.categories} />
          )}
        </div>
      </Section>
    </>
  );
}
