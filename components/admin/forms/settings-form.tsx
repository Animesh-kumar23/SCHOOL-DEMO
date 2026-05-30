"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { settingsSchema } from "@/lib/validation/settings";
import { Field } from "@/components/admin/form-fields";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/image-uploader";

export function SettingsForm({ initial }: { initial?: any }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      schoolName: initial?.schoolName ?? "",
      tagline: initial?.tagline ?? "",
      logoUrl: initial?.logoUrl ?? "",
      address: initial?.address ?? "",
      phone: initial?.phone ?? "",
      email: initial?.email ?? "",
      themeColor: initial?.themeColor ?? "",
      mapEmbedUrl: initial?.mapEmbedUrl ?? "",
      heroImages: initial?.heroImages ?? [],
      socials: {
        facebook: initial?.socials?.facebook ?? "",
        instagram: initial?.socials?.instagram ?? "",
        youtube: initial?.socials?.youtube ?? "",
        twitter: initial?.socials?.twitter ?? "",
      },
      founder: {
        name: initial?.founder?.name ?? "",
        designation: initial?.founder?.designation ?? "",
        photo: initial?.founder?.photo ?? "",
        message: initial?.founder?.message ?? "",
      },
    },
  });

  async function onSubmit(values: any) {
    setServerError(null);
    setSaved(false);
    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setServerError(data?.error ?? "Save failed");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
      <Field label="School name" htmlFor="schoolName" error={errors.schoolName?.message as string}>
        <Input id="schoolName" {...register("schoolName")} />
      </Field>

      <Field label="Tagline" htmlFor="tagline">
        <Input id="tagline" {...register("tagline")} />
      </Field>

      <Field label="Logo">
        <Controller
          control={control}
          name="logoUrl"
          render={({ field }) => (
            <ImageUploader value={field.value ?? ""} onChange={field.onChange} />
          )}
        />
      </Field>

      <Field
        label="Homepage hero image"
        hint="The large banner image at the top of the home page."
      >
        <Controller
          control={control}
          name="heroImages"
          render={({ field }) => (
            <ImageUploader
              value={field.value?.[0] ?? ""}
              onChange={(url) => field.onChange(url ? [url] : [])}
            />
          )}
        />
      </Field>

      <Field label="Address" htmlFor="address">
        <Textarea id="address" rows={2} {...register("address")} />
      </Field>

      <div className="flex flex-wrap gap-6">
        <Field label="Phone" htmlFor="phone" className="flex-1">
          <Input id="phone" {...register("phone")} />
        </Field>
        <Field label="Email" htmlFor="email" className="flex-1" error={errors.email?.message as string}>
          <Input id="email" {...register("email")} />
        </Field>
      </div>

      <fieldset className="space-y-4 rounded-lg border p-4">
        <legend className="px-1 text-sm font-medium">Social links</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Facebook" htmlFor="facebook">
            <Input id="facebook" {...register("socials.facebook")} />
          </Field>
          <Field label="Instagram" htmlFor="instagram">
            <Input id="instagram" {...register("socials.instagram")} />
          </Field>
          <Field label="YouTube" htmlFor="youtube">
            <Input id="youtube" {...register("socials.youtube")} />
          </Field>
          <Field label="Twitter / X" htmlFor="twitter">
            <Input id="twitter" {...register("socials.twitter")} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-lg border p-4">
        <legend className="px-1 text-sm font-medium">Founder&apos;s Message</legend>
        <p className="text-xs text-muted-foreground">
          Shown in the &ldquo;From the Founder&apos;s Desk&rdquo; section on the home and
          about pages. Leave a blank line between paragraphs in the message.
        </p>
        <div className="flex flex-wrap gap-6">
          <Field label="Founder name" htmlFor="founderName" className="flex-1">
            <Input id="founderName" {...register("founder.name")} />
          </Field>
          <Field label="Designation" htmlFor="founderDesignation" className="flex-1">
            <Input
              id="founderDesignation"
              placeholder="Founder &amp; Chairman"
              {...register("founder.designation")}
            />
          </Field>
        </div>
        <Field label="Founder photo">
          <Controller
            control={control}
            name="founder.photo"
            render={({ field }) => (
              <ImageUploader value={field.value ?? ""} onChange={field.onChange} />
            )}
          />
        </Field>
        <Field label="Message" htmlFor="founderMessage">
          <Textarea id="founderMessage" rows={6} {...register("founder.message")} />
        </Field>
      </fieldset>

      <Field
        label="Google Maps embed URL"
        htmlFor="mapEmbedUrl"
        hint="The src URL from a Google Maps 'Embed a map' iframe."
      >
        <Input id="mapEmbedUrl" placeholder="https://www.google.com/maps?q=…&output=embed" {...register("mapEmbedUrl")} />
      </Field>

      <div className="space-y-3 border-t pt-4">
        {serverError ? <p className="text-sm text-destructive">{serverError}</p> : null}
        {saved ? <p className="text-sm text-emerald-600">Settings saved.</p> : null}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Save settings"}
        </Button>
      </div>
    </form>
  );
}
