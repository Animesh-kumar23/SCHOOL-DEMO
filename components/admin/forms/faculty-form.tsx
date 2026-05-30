"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { facultySchema } from "@/lib/validation/faculty";
import { saveResource } from "@/lib/admin-client";
import { Field, FormActions } from "@/components/admin/form-fields";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/image-uploader";

export function FacultyForm({ initial }: { initial?: any }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(facultySchema),
    defaultValues: {
      name: initial?.name ?? "",
      designation: initial?.designation ?? "",
      department: initial?.department ?? "",
      photo: initial?.photo ?? "",
      qualifications: initial?.qualifications ?? "",
      bio: initial?.bio ?? "",
      order: initial?.order ?? 0,
    },
  });

  async function onSubmit(values: any) {
    setServerError(null);
    const res = await saveResource("/api/faculty", initial?._id, values);
    if (!res.ok) {
      setServerError(res.error ?? "Save failed");
      return;
    }
    router.push("/admin/faculty");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
      <Field label="Name" htmlFor="name" error={errors.name?.message as string}>
        <Input id="name" {...register("name")} />
      </Field>

      <div className="flex flex-wrap gap-6">
        <Field
          label="Designation"
          htmlFor="designation"
          className="flex-1"
          error={errors.designation?.message as string}
        >
          <Input id="designation" {...register("designation")} />
        </Field>
        <Field
          label="Department"
          htmlFor="department"
          className="flex-1"
          error={errors.department?.message as string}
        >
          <Input id="department" {...register("department")} />
        </Field>
      </div>

      <Field label="Photo" error={errors.photo?.message as string}>
        <Controller
          control={control}
          name="photo"
          render={({ field }) => (
            <ImageUploader value={field.value ?? ""} onChange={field.onChange} />
          )}
        />
      </Field>

      <Field
        label="Qualifications"
        htmlFor="qualifications"
        error={errors.qualifications?.message as string}
      >
        <Input id="qualifications" placeholder="M.Sc., B.Ed." {...register("qualifications")} />
      </Field>

      <Field label="Bio" htmlFor="bio" error={errors.bio?.message as string}>
        <Textarea id="bio" rows={3} {...register("bio")} />
      </Field>

      <Field
        label="Display order"
        htmlFor="order"
        className="w-40"
        hint="Lower shows first."
        error={errors.order?.message as string}
      >
        <Input id="order" type="number" {...register("order")} />
      </Field>

      <FormActions
        isSubmitting={isSubmitting}
        error={serverError}
        cancelHref="/admin/faculty"
        submitLabel={initial ? "Update member" : "Add member"}
      />
    </form>
  );
}
