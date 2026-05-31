export function StatsBand({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="min-w-0 text-center">
            <div className="break-words text-3xl font-bold text-gold sm:text-4xl">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-primary-foreground/80">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
