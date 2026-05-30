import { Megaphone } from "lucide-react";

export function NewsTicker({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  // Items are duplicated so the -50% marquee translate loops seamlessly.
  const loop = [...items, ...items];

  return (
    <div className="flex items-stretch overflow-hidden border-b bg-primary text-primary-foreground">
      <div className="z-10 flex shrink-0 items-center gap-2 bg-gold px-4 text-sm font-semibold text-gold-foreground">
        <Megaphone className="size-4" />
        <span className="hidden sm:inline">{label}</span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-12 py-2.5 pl-12 hover:[animation-play-state:paused]">
          {loop.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-12 whitespace-nowrap text-sm"
            >
              {item}
              <span className="text-gold">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
