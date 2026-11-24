"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function CopyReferralButton({ path }: { path: string }) {
  const [label, setLabel] = useState("Copier");
  const [tone, setTone] = useState<"neutral" | "success" | "error">("neutral");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${path}`);
      setLabel("Copié !");
      setTone("success");
    } catch {
      setLabel("Échec");
      setTone("error");
    }
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition",
        tone === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : tone === "error"
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-line-strong bg-surface text-ink hover:border-ink/40",
      )}
    >
      <span aria-live="polite">{label}</span>
    </button>
  );
}
