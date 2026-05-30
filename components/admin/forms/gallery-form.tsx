"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { gallerySchema, galleryCategories } from "@/lib/validation/gallery";
import { saveResource } from "@/lib/admin-client";
import { toDateInputValue } from "@/lib/utils";
import { Field, FormActions } from "@/components/admin/form-fields";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { GalleryImagesField } from "@/components/admin/gallery-images-field";

export function GalleryForm({ initial }: { initial?: any }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      title: initial?.title ?? "",
      category: initial?.category ?? "events",
      images: initial?.images ?? [],
      publishedAt: toDateInputValue(initial?.publishedAt),
    },
  });

  async function onSubmit(values: any) {
    setServerError(null);
    const res = await saveResource("/api/gallery", initial?._id, values);
    if (!res.ok) {
      setServerError(res.error ?? "Save failed");
      return;
    }
    router.push("/admin/gallery");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
      <Field label="Album title" htmlFor="title" error={errors.title?.message as string}>
        <Input id="title" {...register("title")} />
      </Field>

      <div className="flex flex-wrap gap-6">
        <Field label="Category" htmlFor="category" className="w-56">
          <NativeSelect id="category" {...register("category")}>
            {galleryCategories.map((c) => (
              <option key={c} value={c} className="capitalize">
                {c}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Date" htmlFor="publishedAt" className="w-48">
          <Input id="publishedAt" type="date" {...register("publishedAt")} />
        </Field>
      </div>

      <Field label="Photos" error={errors.images?.message as string}>
        <Controller
          control={control}
          name="images"
          render={({ field }) => (
            <GalleryImagesField
              value={field.value ?? []}
              onChange={field.onChange}
            />
          )}
        />
      </Field>

      <FormActions
        isSubmitting={isSubmitting}
        error={serverError}
        cancelHref="/admin/gallery"
        submitLabel={initial ? "Update album" : "Create album"}
      />
    </form>
  );
}
