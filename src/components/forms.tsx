"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, registerAction } from "@/app/actions/auth";
import { addPortfolioAction, updateProfileAction } from "@/app/actions/profile";
import { createProjectAction, reportProjectAction } from "@/app/actions/projects";
import { submitQuoteAction } from "@/app/actions/quotes";
import { sendMessageAction } from "@/app/actions/messages";
import { subscribeAction } from "@/app/actions/billing";
import type { ActionResult, Plan, Role } from "@/lib/types";
import { Field, inputClass, textareaClass } from "@/components/ui";
import { cn } from "@/lib/utils";

const initialState: ActionResult = { ok: true, message: "" };

function SubmitButton({
  children,
  className,
  disabled,
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold transition disabled:cursor-wait disabled:opacity-60",
        variant === "primary"
          ? "bg-amber-strong text-paper hover:bg-amber-strong-hover"
          : "border border-line-strong bg-surface text-ink hover:border-ink/40",
        className,
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
      className={cn(
        "rounded-xl border px-3.5 py-2.5 text-sm font-semibold",
        state.ok
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-red-200 bg-red-50 text-red-700",
      )}
    >
      {state.message}
    </p>
  );
}

export function AuthForm({
  mode,
  defaultRole = "client",
  referralCode = "",
}: {
  mode: "login" | "register";
  defaultRole?: "client" | "freelance";
  referralCode?: string;
}) {
  const [state, formAction] = useActionState(
    mode === "login" ? loginAction : registerAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <Notice state={state} />
      {mode === "register" ? (
        <Field label="Nom complet" error={state.fieldErrors?.name}>
          <input name="name" className={inputClass} placeholder="Amina Diallo" required />
        </Field>
      ) : null}
      <Field label="Adresse e-mail" error={state.fieldErrors?.email}>
        <input name="email" type="email" className={inputClass} placeholder="vous@exemple.com" required />
      </Field>
      <Field label="Mot de passe" error={state.fieldErrors?.password}>
        <input name="password" type="password" className={inputClass} placeholder="Au moins 8 caractères" required />
      </Field>
      {mode === "register" ? (
        <Field label="Je suis" error={state.fieldErrors?.role}>
          <select name="role" className={inputClass} defaultValue={defaultRole}>
            <option value="client">Client — je publie des projets</option>
            <option value="freelance">Freelance — je réponds aux projets</option>
          </select>
        </Field>
      ) : null}
      {mode === "register" && referralCode ? (
        <input type="hidden" name="referralCode" value={referralCode} />
      ) : null}
      <SubmitButton className="w-full">
        {mode === "login" ? "Se connecter" : "Créer mon compte"}
      </SubmitButton>
      <p className="text-center text-sm text-muted">
        {mode === "login" ? (
          <>
            Pas encore de compte ?{" "}
            <Link href="/inscription" className="font-bold text-amber-deep hover:underline">
              S&apos;inscrire
            </Link>
          </>
        ) : (
          <>
            Déjà inscrit ?{" "}
            <Link href="/connexion" className="font-bold text-amber-deep hover:underline">
              Se connecter
            </Link>
          </>
        )}
      </p>
      {mode === "login" ? (
        <p className="rounded-xl bg-sand/70 px-3.5 py-3 text-xs leading-relaxed text-muted">
          Comptes de démonstration : client@taf-africa.com, freelance@taf-africa.com ou
          admin@taf-africa.com — mot de passe <strong>demo1234</strong>.
        </p>
      ) : null}
    </form>
  );
}

export function ProfileForm({
  user,
  values,
}: {
  user: { name: string; role: Role };
  values: {
    title: string;
    bio: string;
    city: string;
    country: string;
    phone: string;
    companyName: string;
    dailyRate: number;
    languages: string[];
    skills: string[];
    emailAlerts: boolean;
    isPublic: boolean;
  };
}) {
  const [state, formAction] = useActionState(updateProfileAction, initialState);
  return (
    <form action={formAction} className="space-y-5">
      <Notice state={state} />
      <Field label="Nom complet" error={state.fieldErrors?.name}>
        <input name="name" className={inputClass} defaultValue={user.name} required />
      </Field>
      {user.role === "freelance" ? (
        <>
          <Field label="Titre du profil" error={state.fieldErrors?.title}>
            <input name="title" className={inputClass} defaultValue={values.title} placeholder="Développeur fullstack Next.js" />
          </Field>
          <Field label="Bio" hint="Ce que vous faites et comment vous travaillez.">
            <textarea name="bio" className={textareaClass} defaultValue={values.bio} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Compétences" hint="Séparées par des virgules.">
              <input name="skills" className={inputClass} defaultValue={values.skills.join(", ")} />
            </Field>
            <Field label="Langues" hint="Séparées par des virgules.">
              <input name="languages" className={inputClass} defaultValue={values.languages.join(", ")} />
            </Field>
          </div>
          <Field label="Tarif journalier (FCFA)" error={state.fieldErrors?.dailyRate}>
            <input name="dailyRate" type="number" min="0" className={inputClass} defaultValue={values.dailyRate} />
          </Field>
          <div className="flex flex-wrap gap-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-ink">
              <input name="emailAlerts" type="checkbox" defaultChecked={values.emailAlerts} className="size-4 accent-amber-strong" />
              Alertes e-mail par compétence
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-ink">
              <input name="isPublic" type="checkbox" defaultChecked={values.isPublic} className="size-4 accent-amber-strong" />
              Profil visible dans l&apos;annuaire
            </label>
          </div>
        </>
      ) : null}
      {user.role === "client" ? (
        <Field label="Nom de l'entreprise">
          <input name="companyName" className={inputClass} defaultValue={values.companyName} />
        </Field>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Ville">
          <input name="city" className={inputClass} defaultValue={values.city} />
        </Field>
        <Field label="Pays">
          <input name="country" className={inputClass} defaultValue={values.country} />
        </Field>
        <Field label="Téléphone">
          <input name="phone" className={inputClass} defaultValue={values.phone} />
        </Field>
      </div>
      <SubmitButton>Enregistrer le profil</SubmitButton>
    </form>
  );
}

export function PortfolioForm() {
  const [state, formAction] = useActionState(addPortfolioAction, initialState);
  return (
    <form action={formAction} className="space-y-4">
      <Notice state={state} />
      <Field label="Titre de la réalisation">
        <input name="title" className={inputClass} placeholder="Refonte d'une boutique e-commerce" required />
      </Field>
      <Field label="Description courte">
        <textarea name="description" className={textareaClass} required />
      </Field>
      <Field label="Lien (facultatif)">
        <input name="link" className={inputClass} placeholder="https://…" />
      </Field>
      <SubmitButton variant="secondary">Ajouter au portfolio</SubmitButton>
    </form>
  );
}

export function ProjectForm({
  categories,
  skills,
}: {
  categories: { name: string; slug: string }[];
  skills: string[];
}) {
  const [state, formAction] = useActionState(createProjectAction, initialState);
  return (
    <form action={formAction} className="space-y-5">
      <Notice state={state} />
      <Field label="Titre du projet" error={state.fieldErrors?.title}>
        <input name="title" className={inputClass} placeholder="Refonte e-commerce pour une marque de mode" required />
      </Field>
      <Field label="Description" error={state.fieldErrors?.description}>
        <textarea name="description" className={textareaClass} placeholder="Décrivez le contexte, les objectifs et les livrables." required />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Catégorie" error={state.fieldErrors?.categorySlug}>
          <select name="categorySlug" className={inputClass} required>
            <option value="">Choisir une catégorie</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Délai souhaité (jours)" error={state.fieldErrors?.deadlineDays}>
          <input name="deadlineDays" type="number" min="1" className={inputClass} defaultValue={21} required />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Budget minimum (FCFA)" error={state.fieldErrors?.budgetMin}>
          <input name="budgetMin" type="number" min="0" className={inputClass} defaultValue={300000} required />
        </Field>
        <Field label="Budget maximum (FCFA)" error={state.fieldErrors?.budgetMax}>
          <input name="budgetMax" type="number" min="0" className={inputClass} defaultValue={900000} required />
        </Field>
      </div>
      <Field label="Compétences recherchées" hint="Séparées par des virgules.">
        <input name="skills" list="skills-list" className={inputClass} placeholder="Next.js, TypeScript, UI Design" />
        <datalist id="skills-list">
          {skills.map((skill) => (
            <option key={skill} value={skill} />
          ))}
        </datalist>
      </Field>
      <Field label="Fichiers joints" hint="Noms des fichiers, séparés par des virgules.">
        <input name="attachmentNames" className={inputClass} placeholder="brief.pdf, maquettes.fig" />
      </Field>
      <SubmitButton>Publier le projet</SubmitButton>
    </form>
  );
}

export function QuoteForm({
  projectId,
  credits,
  premiumCount,
}: {
  projectId: string;
  credits: number;
  premiumCount: number;
}) {
  const [state, formAction] = useActionState(submitQuoteAction, initialState);
  const [type, setType] = useState<"simple" | "premium">("simple");
  const cost = type === "premium" ? 15 : 1;
  const enough = credits >= cost;
  return (
    <form action={formAction} className="space-y-5">
      <Notice state={state} />
      <input type="hidden" name="projectId" value={projectId} />
      <Field label="Type d'offre">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className={cn("cursor-pointer rounded-xl border p-4 transition", type === "simple" ? "border-amber-strong bg-amber-soft/40" : "border-line bg-paper")}>
            <input
              type="radio"
              name="type"
              value="simple"
              checked={type === "simple"}
              onChange={() => setType("simple")}
              className="sr-only"
            />
            <span className="block text-sm font-bold text-ink">Simple · 1 crédit</span>
            <span className="mt-1 block text-xs text-muted">Illimité, sans mise en avant.</span>
          </label>
          <label className={cn("cursor-pointer rounded-xl border p-4 transition", type === "premium" ? "border-amber-strong bg-amber-soft/40" : "border-line bg-paper")}>
            <input
              type="radio"
              name="type"
              value="premium"
              checked={type === "premium"}
              onChange={() => setType("premium")}
              className="sr-only"
            />
            <span className="block text-sm font-bold text-ink">Premium · 15 crédits</span>
            <span className="mt-1 block text-xs text-muted">
              {4 - premiumCount} restant{4 - premiumCount > 1 ? "s" : ""} sur 4.
            </span>
          </label>
        </div>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Prix proposé (FCFA)" error={state.fieldErrors?.price}>
          <input name="price" type="number" min="1000" className={inputClass} required />
        </Field>
        <Field label="Délai de livraison (jours)" error={state.fieldErrors?.deliveryDays}>
          <input name="deliveryDays" type="number" min="1" className={inputClass} defaultValue={14} required />
        </Field>
      </div>
      <Field label="Votre message" error={state.fieldErrors?.message}>
        <textarea name="message" className={textareaClass} placeholder="Expliquez votre approche et ce que vous livrerez." required />
      </Field>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-sand/60 px-4 py-3">
        <p className="text-sm text-muted">
          Solde : <strong className="tnum text-ink">{credits} crédits</strong> · cette offre coûte{" "}
          <strong className="tnum text-ink">{cost} crédit{cost > 1 ? "s" : ""}</strong>
        </p>
        {!enough ? (
          <Link href="/abonnements" className="text-sm font-bold text-amber-deep hover:underline">
            Recharger mes crédits
          </Link>
        ) : null}
      </div>
      <SubmitButton disabled={!enough}>Envoyer l&apos;offre et ouvrir le chat</SubmitButton>
    </form>
  );
}

export function MessageForm({ conversationId }: { conversationId: string }) {
  const [state, formAction] = useActionState(sendMessageAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok && state.message) formRef.current?.reset();
  }, [state]);
  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <Notice state={state} />
      <input type="hidden" name="conversationId" value={conversationId} />
      <textarea
        name="body"
        className={textareaClass}
        placeholder="Écrivez votre message. Les coordonnées directes sont bloquées."
        required
      />
      <SubmitButton>Envoyer le message</SubmitButton>
    </form>
  );
}

export function SubscribeForm({ plans }: { plans: Plan[] }) {
  const payable = plans.filter((plan) => plan.code !== "free");
  const [planCode, setPlanCode] = useState(payable[0]?.code ?? "pro");
  const selected = payable.find((plan) => plan.code === planCode) ?? payable[0];
  const [state, formAction] = useActionState(subscribeAction, initialState);
  return (
    <form action={formAction} className="space-y-5">
      <Notice state={state} />
      <Field label="Formule">
        <select
          name="planCode"
          className={inputClass}
          value={planCode}
          onChange={(event) => setPlanCode(event.target.value as typeof planCode)}
        >
          {payable.map((plan) => (
            <option key={plan.code} value={plan.code}>
              {plan.name} — {plan.monthlyCredits} crédits / 30 jours
            </option>
          ))}
        </select>
      </Field>
      <Field label="Moyen de paiement">
        <select name="provider" className={inputClass} defaultValue="orange_money">
          <option value="orange_money">Orange Money</option>
          <option value="mtn_momo">MTN MoMo</option>
          <option value="wave">Wave</option>
          <option value="moov_money">Moov Money</option>
          <option value="card">Carte bancaire</option>
        </select>
      </Field>
      <Field label="Numéro Mobile Money" hint="Facultatif pour un paiement par carte.">
        <input name="phone" className={inputClass} placeholder="+225 07 00 00 00 00" />
      </Field>
      <div className="rounded-xl bg-sand/60 px-4 py-3 text-sm text-muted">
        Montant débité : <strong className="tnum text-ink">{selected?.priceXaf.toLocaleString("fr-FR")} FCFA</strong> ·{" "}
        <strong className="tnum text-ink">{selected?.monthlyCredits} crédits</strong> ajoutés immédiatement.
      </div>
      <SubmitButton>Activer la formule</SubmitButton>
      <p className="text-xs text-muted">
        Mode démonstration : aucun prélèvement réel n&apos;est effectué sans opérateur configuré.
      </p>
    </form>
  );
}

export function ReportForm({ projectId }: { projectId: string }) {
  const [state, formAction] = useActionState(reportProjectAction, initialState);
  return (
    <form action={formAction} className="space-y-4">
      <Notice state={state} />
      <input type="hidden" name="projectId" value={projectId} />
      <Field label="Motif" error={state.fieldErrors?.reason}>
        <select name="reason" className={inputClass} required>
          <option value="">Choisir un motif</option>
          <option value="Projet fictif ou trompeur">Projet fictif ou trompeur</option>
          <option value="Contenu dupliqué">Contenu dupliqué</option>
          <option value="Coordonnées interdites">Coordonnées interdites</option>
          <option value="Autre problème">Autre problème</option>
        </select>
      </Field>
      <Field label="Détails (facultatif)">
        <textarea name="details" className={textareaClass} />
      </Field>
      <SubmitButton variant="secondary">Signaler ce projet</SubmitButton>
    </form>
  );
}
