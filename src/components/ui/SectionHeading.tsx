import { cn } from "@/lib/cn";
import { TextReveal } from "@/components/ui/TextReveal";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  tone = "light",
}: Props) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  const eyebrowColor =
    tone === "dark"
      ? "text-[color-mix(in_oklab,var(--color-honey),#fff_10%)]"
      : "text-[var(--color-terracotta)]";
  const descColor =
    tone === "dark"
      ? "text-[color-mix(in_oklab,var(--color-cream),transparent_20%)]"
      : "text-[color-mix(in_oklab,var(--color-ink),transparent_35%)]";

  return (
    <header className={cn("flex w-full flex-col gap-4", alignment, className)}>
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.28em]",
            eyebrowColor,
          )}
        >
          <span aria-hidden className="inline-block h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </span>
      ) : null}
      <TextReveal as="h2" className="max-w-4xl font-display">
        {title}
      </TextReveal>
      {description ? (
        <TextReveal
          as="p"
          className={cn("max-w-2xl text-lg leading-relaxed md:text-xl", descColor)}
        >
          {description}
        </TextReveal>
      ) : null}
    </header>
  );
}
