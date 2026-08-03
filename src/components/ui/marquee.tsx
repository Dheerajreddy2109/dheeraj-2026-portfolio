export default function Marquee({
  items,
  className = "",
  speed = "normal",
  italic = true,
}: {
  items: string[];
  className?: string;
  speed?: "normal" | "slow";
  italic?: boolean;
}) {
  const anim = speed === "slow" ? "animate-marquee-slow" : "animate-marquee";

  return (
    <div className={`group flex overflow-hidden ${className}`}>
      <div
        className={`flex w-max shrink-0 items-center ${anim} group-hover:[animation-play-state:paused] motion-reduce:!animate-none`}
      >
        <MarqueeGroup items={items} italic={italic} />
        <MarqueeGroup items={items} italic={italic} />
      </div>
    </div>
  );
}

function MarqueeGroup({
  items,
  italic,
}: {
  items: string[];
  italic: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span
          key={i}
          className={`flex items-center gap-8 pr-8 font-display text-3xl text-ink-faint sm:text-4xl ${
            italic ? "italic" : ""
          }`}
        >
          {item}
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
        </span>
      ))}
    </div>
  );
}
