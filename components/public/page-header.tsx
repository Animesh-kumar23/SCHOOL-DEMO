export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b bg-muted/40">
      <div className="container py-12 md:py-16">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}

/** Lightweight placeholder block used on stubbed pages during the demo phase. */
export function ComingSoon({ note }: { note: string }) {
  return (
    <section className="container py-16">
      <div className="rounded-lg border border-dashed bg-muted/30 p-10 text-center">
        <p className="text-sm text-muted-foreground">{note}</p>
      </div>
    </section>
  );
}
