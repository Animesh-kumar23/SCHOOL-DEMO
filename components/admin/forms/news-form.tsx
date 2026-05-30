"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { newsSchema } from "@/lib/validation/news";
import { saveResource } from "@/lib/admin-client";
import { toDateInputValue } from "@/lib/utils";
import { Field, FormActions } from "@/components/admin/form-fields";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ImageUploader } from "@/components/admin/image-uploader";

export function NewsForm({ initial }: { initial?: any }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: initial?.title ?? "",
      slug: initial?.slug ?? "",
      category: initial?.category ?? "General",
      excerpt: initial?.excerpt ?? "",
      body: initial?.body ?? "",
      coverImage: initial?.coverImage ?? "",
      publishedAt: toDateInputValue(initial?.publishedAt),
      isDraft: initial?.isDraft ?? false,
    },
  });

  async function onSubmit(values: any) {
    setServerError(null);
    const res = await saveResource("/api/news", initial?._id, values);
    if (!res.ok) {
      setServerError(res.error ?? "Save failed");
      return;
    }
    router.push("/admin/news");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
      <Field label="Title" htmlFor="title" error={errors.title?.message as string}>
        <Input id="title" {...register("title")} />
      </Field>

      <Field
        label="Slug"
        htmlFor="slug"
        hint="Leave blank to auto-generate from the title."
        error={errors.slug?.message as string}
      >
        <Input id="slug" placeholder="auto-generated" {...register("slug")} />
      </Field>

      <Field
        label="Category"
        htmlFor="category"
        className="w-56"
        hint="e.g. Academics, Sports, Events"
      >
        <Input id="category" {...register("category")} />
      </Field>

      <Field label="Excerpt" htmlFor="excerpt" error={errors.excerpt?.message as string}>
        <Textarea id="excerpt" rows={2} {...register("excerpt")} />
      </Field>

      <Field label="Cover image" error={errors.coverImage?.message as string}>
        <Controller
          control={control}
          name="coverImage"
          render={({ field }) => (
            <ImageUploader value={field.value ?? ""} onChange={field.onChange} />
          )}
        />
      </Field>

      <Field label="Body" error={errors.body?.message as string}>
        <Controller
          control={control}
          name="body"
          render={({ field }) => (
            <RichTextEditor value={field.value ?? ""} onChange={field.onChange} />
          )}
        />
      </Field>

      <div className="flex flex-wrap items-end gap-6">
        <Field label="Publish date" htmlFor="publishedAt" className="w-48">
          <Input id="publishedAt" type="date" {...register("publishedAt")} />
        </Field>
        <label className="flex items-center gap-2 pb-2 text-sm">
          <input type="checkbox" className="size-4" {...register("isDraft")} />
          Save as draft
        </label>
      </div>

      <FormActions
        isSubmitting={isSubmitting}
        error={serverError}
        cancelHref="/admin/news"
        submitLabel={initial ? "Update article" : "Create article"}
      />
    </form>
  );
}
