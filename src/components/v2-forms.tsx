"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  fundEscrowAction,
  openDisputeAction,
  releaseEscrowAction,
  submitReviewAction,
} from "@/app/actions/v2";
import { Field, inputClass, textareaClass } from "@/components/ui";
import type { ActionResult, Quote } from "@/lib/types";
import { cn } from "@/lib/utils";

const initialState: ActionResult = { ok: true, message: "" };

const fieldClass = cn(inputClass, "min-h-11");

function SubmitButton({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "action w-full disabled:cursor-wait disabled:opacity-60 sm:w-auto",
        variant === "primary" ? "action-primary" : "action-secondary",
      )}
    >
      {pending ? "Traitement…" : children}
    </button>
  );
}

function Notice({ state }: { state: ActionResult }) {
  if (!state.message) return null;
  return (
    <p
      aria-live="polite"
      className={cn(
        "rounded-xl border px-3.5 py-2.5 text-sm font-semibold",
        state.ok
          ? "border-success/40 bg-success/10 text-success"
          : "border-danger/40 bg-danger/10 text-danger",
      )}
    >
      {state.message}
    </p>
  );
}

export function FundEscrowForm({ quote }: { quote: Quote }) {
  const [state, action] = useActionState(fundEscrowAction, initialState);
  return (
    <form action={action} className="space-y-3">
      <Notice state={state} />
      <input type="hidden" name="quoteId" value={quote.id} />
      <Field label="Moyen de paiement" error={state.fieldErrors?.provider}>
        <select name="provider" className={fieldClass} defaultValue="orange_money">
          <option value="orange_money">Orange Money</option>
          <option value="mtn_momo">MTN MoMo</option>
          <option value="wave">Wave</option>
          <option value="moov_money">Moov Money</option>
          <option value="card">Carte bancaire</option>
        </select>
      </Field>
      <Field label="Numéro Mobile Money (facultatif)" error={state.fieldErrors?.phone}>
        <input name="phone" className={fieldClass} placeholder="+221 77 000 00 00" />
      </Field>
      <SubmitButton>Sécuriser {quote.price.toLocaleString("fr-FR")} {quote.currency}</SubmitButton>
    </form>
  );
}

export function ReleaseEscrowForm({ escrowId }: { escrowId: string }) {
  const [state, action] = useActionState(releaseEscrowAction, initialState);
  return (
    <form action={action}>
      <Notice state={state} />
      <input type="hidden" name="escrowId" value={escrowId} />
      <SubmitButton variant="secondary">Libérer les fonds</SubmitButton>
    </form>
  );
}

export function ReviewForm({ quote }: { quote: Quote }) {
  const [state, action] = useActionState(submitReviewAction, initialState);
  return (
    <form action={action} className="space-y-3">
      <Notice state={state} />
      <input type="hidden" name="quoteId" value={quote.id} />
      <Field label="Note" error={state.fieldErrors?.rating}>
        <select name="rating" className={fieldClass} defaultValue="5">
          {[5, 4, 3, 2, 1].map((rating) => (
            <option key={rating} value={rating}>{rating} / 5</option>
          ))}
        </select>
      </Field>
      <Field label="Votre avis" error={state.fieldErrors?.comment}>
        <textarea
          name="comment"
          className={textareaClass}
          rows={4}
          placeholder="Livraison, communication, qualité du travail…"
          required
        />
      </Field>
      <SubmitButton>Publier mon avis</SubmitButton>
    </form>
  );
}

export function DisputeForm({ quoteId }: { quoteId: string }) {
  const [state, action] = useActionState(openDisputeAction, initialState);
  return (
    <form action={action} className="space-y-3">
      <Notice state={state} />
      <input type="hidden" name="quoteId" value={quoteId} />
      <Field label="Motif" error={state.fieldErrors?.reason}>
        <input name="reason" className={fieldClass} placeholder="Livraison non conforme" required />
      </Field>
      <Field label="Détails" error={state.fieldErrors?.details}>
        <textarea name="details" className={textareaClass} rows={3} placeholder="Expliquez le problème" />
      </Field>
      <SubmitButton>Ouvrir un litige</SubmitButton>
    </form>
  );
}
