import Link from "next/link";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("panel p-5", className)}>{children}</div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 border-b border-line pb-7 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0 max-w-2xl">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="display mt-3 text-[2rem] text-ink sm:text-[2.5rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}

export function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h2 className="text-lg font-bold tracking-[-0.02em] text-ink">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  className?: string;
}) {
  const variants = {
    primary: "action-primary",
    secondary: "action-secondary",
    ghost: "action-quiet",
    danger: "border border-danger/40 bg-danger-soft text-danger hover:border-danger",
  };
  return (
    <Link
      href={href}
      className={cn("action", variants[variant], className)}
    >
      {children}
    </Link>
  );
}

export function StatusPill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
}) {
  const tones = {
    neutral: "bg-raised text-ink-soft",
    success: "bg-success-soft text-success",
    warning: "bg-clay-soft text-clay",
    danger: "bg-danger-soft text-danger",
    info: "bg-info-soft text-info",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="min-w-0 border-l border-line pl-4 first:border-l-0 first:pl-0 sm:pl-5">
      <p className="eyebrow">{label}</p>
      <p className="tnum mt-2 text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-4xl">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs leading-relaxed text-muted">{hint}</p> : null}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-line-strong bg-matter/60 p-8">
      <p className="text-base font-bold text-ink">{title}</p>
      <p className="max-w-lg text-sm leading-relaxed text-muted">{description}</p>
      {action}
    </div>
  );
}

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  return (
    <span
      className={cn(
        "inline-flex size-10 shrink-0 place-items-center rounded-[30%] bg-raised text-sm font-bold text-teal",
        className,
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-ink">{label}</span>
      <span className="mt-1.5 block">{children}</span>
      {hint ? <span className="mt-1 block text-xs text-muted">{hint}</span> : null}
      {error ? (
        <span className="mt-1 block text-xs font-semibold text-danger">{error}</span>
      ) : null}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-line bg-matter px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-lime focus:bg-panel";

export const textareaClass = `${inputClass} min-h-28 resize-y`;
