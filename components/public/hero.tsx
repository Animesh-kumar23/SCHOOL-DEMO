import Link from "next/link";
import Image from "next/image";

import type { Dictionary } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function Hero({
  dict,
  tagline,
  image,
}: {
  dict: Dictionary;
  tagline: string;
  image: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        priority
        quality={60}
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark/95 via-primary/85 to-primary/40" />

      <div className="container flex min-h-[78vh] flex-col justify-center py-24">
        <div className="max-w-2xl text-white">
          <p className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-gold ring-1 ring-white/20">
            {tagline}
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {dict.home.heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-balance text-lg text-white/85">
            {dict.home.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-gold text-gold-foreground hover:bg-gold/90"
            >
              <Link href="/admissions">{dict.common.applyAdmission}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/60 bg-transparent text-white hover:bg-white hover:text-primary"
            >
              <Link href="#story">{dict.common.discoverMore}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
