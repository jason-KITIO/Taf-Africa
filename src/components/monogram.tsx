import { cn } from "@/lib/utils";

const palette = [
  "#b4700a",
  "#14171c",
  "#3b414b",
  "#0f766e",
  "#9a3412",
  "#5b21b6",
  "#1d4ed8",
  "#065f46",
];

function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) % 9973;
  }
  return h;
}

export function Monogram({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  const bg = palette[hash(initials) % palette.length];
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full text-[10px] font-bold uppercase tracking-tight text-paper ring-2 ring-surface",
        className,
      )}
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
