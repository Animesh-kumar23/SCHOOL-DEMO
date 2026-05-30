import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-14 md:py-20", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
        {title}
      </h2>
      <div
        className={cn(
          "mt-3 h-1 w-16 rounded bg-gold",
          align === "center" ? "mx-auto" : ""
        )}
      />
      {description ? (
        <p className="mt-4 text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
