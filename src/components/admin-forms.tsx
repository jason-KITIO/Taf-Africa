"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createClientByAdminAction, createProjectByAdminAction } from "@/app/actions/admin";
import { Field, inputClass, textareaClass } from "@/components/ui";
import type { ActionResult } from "@/lib/types";
import { cn } from "@/lib/utils";

const initialState: ActionResult = { ok: true, message: "" };

type AdminClientOption = { id: string; name: string; email: string };
type AdminCategoryOption = { slug: string; name: string };

const fieldClass = cn(inputClass, "min-h-11");

function SubmitButton({
  children,
  disabled,
  variant = "primary",
}: {
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || disabled}
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

export function AdminClientForm() {
  const [state, formAction] = useActionState(createClientByAdminAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <Notice state={state} />
      <Field label="Nom complet" error={state.fieldErrors?.name}>
        <input name="name" className={fieldClass} placeholder="Jean Traoré" required />
      </Field>
      <Field label="Adresse e-mail" error={state.fieldErrors?.email}>
        <input name="email" type="email" className={fieldClass} placeholder="client@exemple.com" required />
      </Field>
      <Field label="Mot de passe initial" error={state.fieldErrors?.password}>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          className={fieldClass}
          placeholder="Au moins 8 caractères"
          required
        />
      </Field>
      <Field label="Entreprise" hint="Facultatif.">
        <input name="companyName" className={fieldClass} placeholder="Nom de l'entreprise" />
      </Field>
      <SubmitButton>Créer le client</SubmitButton>
    </form>
  );
}

export function AdminProjectForm({
  clients,
  categories,
}: {
  clients: AdminClientOption[];
  categories: AdminCategoryOption[];
}) {
  const [state, formAction] = useActionState(createProjectByAdminAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <Notice state={state} />
      <Field label="Client" error={state.fieldErrors?.clientId}>
        <select name="clientId" className={fieldClass} defaultValue="" required>
          <option value="" disabled>
            {clients.length ? "Choisir un client" : "Aucun client disponible"}
          </option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name} — {client.email}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Titre du projet" error={state.fieldErrors?.title}>
        <input name="title" className={fieldClass} placeholder="Refonte d'un site vitrine" required />
      </Field>
      <Field label="Description" error={state.fieldErrors?.description}>
        <textarea name="description" className={textareaClass} rows={5} required />
      </Field>
      <Field label="Catégorie" error={state.fieldErrors?.categorySlug}>
        <select name="categorySlug" className={fieldClass} defaultValue={categories[0]?.slug ?? ""} required>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Budget minimum (FCFA)" error={state.fieldErrors?.budgetMin}>
          <input name="budgetMin" type="number" min="0" className={fieldClass} defaultValue={100000} required />
        </Field>
        <Field label="Budget maximum (FCFA)" error={state.fieldErrors?.budgetMax}>
          <input name="budgetMax" type="number" min="0" className={fieldClass} defaultValue={500000} required />
        </Field>
      </div>
      <Field label="Délai (jours)" error={state.fieldErrors?.deadlineDays}>
        <input name="deadlineDays" type="number" min="1" max="365" className={fieldClass} defaultValue={21} required />
      </Field>
      <Field label="Compétences" hint="Séparées par des virgules.">
        <input name="skills" className={fieldClass} placeholder="Next.js, TypeScript, Figma" />
      </Field>
      <SubmitButton variant="secondary" disabled={clients.length === 0}>Créer le projet</SubmitButton>
    </form>
  );
}
