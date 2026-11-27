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
        "action action-secondary",
        tone === "success" && "border-success/40 text-success",
        tone === "error" && "border-danger/40 text-danger",
      )}
    >
      <span aria-live="polite">{label}</span>
    </button>
  );
}
