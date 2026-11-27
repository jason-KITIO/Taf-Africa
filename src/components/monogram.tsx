import { cn } from "@/lib/utils";

const palette = [
  { bg: "#026466", fg: "#f4f2ed" },
  { bg: "#3d7d7c", fg: "#f4f2ed" },
  { bg: "#74b9b6", fg: "#121113" },
  { bg: "#e78a53", fg: "#121113" },
  { bg: "#414046", fg: "#f4f2ed" },
  { bg: "#5f8787", fg: "#121113" },
  { bg: "#2f5f60", fg: "#f4f2ed" },
  { bg: "#cfdc00", fg: "#121113" },
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
  const { bg, fg } = palette[hash(initials) % palette.length];
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-[30%] text-[10px] font-bold uppercase tracking-tight ring-2 ring-panel",
        className,
      )}
      style={{ backgroundColor: bg, color: fg }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
