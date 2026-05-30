import Image from "next/image";
import { Quote } from "lucide-react";

import type { PrincipalInfo } from "@/lib/content-types";

export function PrincipalMessage({ principal }: { principal: PrincipalInfo }) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-[260px_1fr]">
      <div className="mx-auto w-full max-w-[260px]">
        <div className="relative aspect-square overflow-hidden rounded-xl border-4 border-gold/30 shadow-md">
          <Image
            src={principal.photo}
            alt={principal.name}
            fill
            sizes="260px"
            className="object-cover"
          />
        </div>
        <div className="mt-4 text-center">
          <p className="font-semibold">{principal.name}</p>
          <p className="text-sm text-primary">{principal.designation}</p>
        </div>
      </div>

      <div>
        <Quote className="size-10 text-gold" />
        <div className="mt-3 space-y-3 text-muted-foreground">
          {principal.message.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
