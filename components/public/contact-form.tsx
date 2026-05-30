"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";

import { contactSchema, type ContactInput } from "@/lib/validation/contact";
import type { Dictionary } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm({ labels }: { labels: Dictionary["contact"] }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", message: "" },
  });

  async function onSubmit(values: ContactInput) {
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      reset();
      setSubmitted(true);
    } catch {
      setError(labels.errorMsg);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border bg-card p-10 text-center shadow-sm">
        <CheckCircle2 className="size-12 text-primary" />
        <h3 className="text-lg font-semibold">{labels.thankYouTitle}</h3>
        <p className="text-sm text-muted-foreground">{labels.thankYouMsg}</p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          {labels.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4 rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">{labels.fullName}</Label>
          <Input id="name" {...register("name")} />
          {errors.name ? (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          ) : null}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">{labels.phone}</Label>
          <Input id="phone" type="tel" {...register("phone")} />
          {errors.phone ? (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">{labels.message}</Label>
        <Textarea id="message" rows={5} {...register("message")} />
        {errors.message ? (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        ) : null}
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? labels.sending : labels.send}
      </Button>
    </form>
  );
}
