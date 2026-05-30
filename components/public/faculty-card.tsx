import Image from "next/image";

import type { FacultyMember } from "@/lib/content-types";

export function FacultyCard({ member }: { member: FacultyMember }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card text-center shadow-sm transition hover:shadow-md">
      <div className="relative aspect-square bg-muted">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="space-y-0.5 p-4">
        <h3 className="font-semibold leading-snug">{member.name}</h3>
        <p className="text-sm font-medium text-primary">{member.designation}</p>
        <p className="text-xs text-muted-foreground">{member.qualifications}</p>
      </div>
    </div>
  );
}
