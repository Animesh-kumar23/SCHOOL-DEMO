"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { eventSchema } from "@/lib/validation/event";
import { saveResource } from "@/lib/admin-client";
import { toDateInputValue } from "@/lib/utils";
import { Field, FormActions } from "@/components/admin/form-fields";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ImageUploader } from "@/components/admin/image-uploader";

export function EventForm({ initial }: { initial?: any }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: initial?.title ?? "",
      slug: initial?.slug ?? "",
      eventDate: toDateInputValue(initial?.eventDate),
      venue: initial?.venue ?? "",
      coverImage: initial?.coverImage ?? "",
      body: initial?.body ?? "",
      isDraft: initial?.isDraft ?? false,
    },
  });

  async function onSubmit(values: any) {
    setServerError(null);
    const res = await saveResource("/api/events", initial?._id, values);
    if (!res.ok) {
      setServerError(res.error ?? "Save failed");
      return;
    }
    router.push("/admin/events");
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

      <div className="flex flex-wrap gap-6">
        <Field
          label="Event date"
          htmlFor="eventDate"
          className="w-48"
          error={errors.eventDate?.message as string}
        >
          <Input id="eventDate" type="date" {...register("eventDate")} />
        </Field>
        <Field
          label="Venue"
          htmlFor="venue"
          className="flex-1"
          error={errors.venue?.message as string}
        >
          <Input id="venue" {...register("venue")} />
        </Field>
      </div>

      <Field label="Cover image" error={errors.coverImage?.message as string}>
        <Controller
          control={control}
          name="coverImage"
          render={({ field }) => (
            <ImageUploader value={field.value ?? ""} onChange={field.onChange} />
          )}
        />
      </Field>

      <Field label="Details" error={errors.body?.message as string}>
        <Controller
          control={control}
          name="body"
          render={({ field }) => (
            <RichTextEditor value={field.value ?? ""} onChange={field.onChange} />
          )}
        />
      </Field>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" className="size-4" {...register("isDraft")} />
        Save as draft
      </label>

      <FormActions
        isSubmitting={isSubmitting}
        error={serverError}
        cancelHref="/admin/events"
        submitLabel={initial ? "Update event" : "Create event"}
      />
    </form>
  );
}
