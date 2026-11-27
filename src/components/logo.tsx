import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline whitespace-nowrap font-extrabold uppercase leading-none tracking-[-0.055em]",
        className,
      )}
    >
      <span>{compact ? "TAF" : "TAF AFRICA"}</span>
      <span className="text-lime">.</span>
    </span>
  );
}
