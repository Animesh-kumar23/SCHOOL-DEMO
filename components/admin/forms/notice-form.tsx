"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { noticeSchema, noticeCategories } from "@/lib/validation/notice";
import { saveResource } from "@/lib/admin-client";
import { toDateInputValue } from "@/lib/utils";
import { Field, FormActions } from "@/components/admin/form-fields";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";

export function NoticeForm({ initial }: { initial?: any }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(noticeSchema),
    defaultValues: {
      title: initial?.title ?? "",
      category: initial?.category ?? "general",
      pdfUrl: initial?.pdfUrl ?? "",
      publishedAt: toDateInputValue(initial?.publishedAt),
    },
  });

  async function onSubmit(values: any) {
    setServerError(null);
    const res = await saveResource("/api/notices", initial?._id, values);
    if (!res.ok) {
      setServerError(res.error ?? "Save failed");
      return;
    }
    router.push("/admin/notices");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
      <Field label="Title" htmlFor="title" error={errors.title?.message as string}>
        <Input id="title" {...register("title")} />
      </Field>

      <div className="flex flex-wrap gap-6">
        <Field label="Category" htmlFor="category" className="w-56">
          <NativeSelect id="category" {...register("category")}>
            {noticeCategories.map((c) => (
              <option key={c} value={c} className="capitalize">
                {c}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Publish date" htmlFor="publishedAt" className="w-48">
          <Input id="publishedAt" type="date" {...register("publishedAt")} />
        </Field>
      </div>

      <Field
        label="Document / PDF link"
        htmlFor="pdfUrl"
        hint="Paste a link to the PDF or document. Cloudinary upload can be wired later."
        error={errors.pdfUrl?.message as string}
      >
        <Input id="pdfUrl" placeholder="https://…" {...register("pdfUrl")} />
      </Field>

      <FormActions
        isSubmitting={isSubmitting}
        error={serverError}
        cancelHref="/admin/notices"
        submitLabel={initial ? "Update notice" : "Create notice"}
      />
    </form>
  );
}
