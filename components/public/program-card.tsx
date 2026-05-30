import {
  BookOpen,
  FlaskConical,
  GraduationCap,
  Palette,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { Program } from "@/lib/demo-content";

const icons: Record<Program["icon"], LucideIcon> = {
  GraduationCap,
  FlaskConical,
  Palette,
  Trophy,
  BookOpen,
  Users,
};

export function ProgramCard({ program }: { program: Program }) {
  const Icon = icons[program.icon];
  return (
    <div className="group rounded-lg border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
      <div className="mb-4 grid size-12 place-items-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-6" />
      </div>
      <h3 className="font-semibold">{program.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{program.description}</p>
    </div>
  );
}
