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

const authInputClass =
  "min-h-11 w-full rounded-xl border border-line bg-matter px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-lime focus:bg-panel";

const fieldClass = cn(inputClass, "min-h-11");

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
        "action w-full disabled:cursor-wait disabled:opacity-60 sm:w-auto",
        variant === "primary" ? "action-primary" : "action-secondary",
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
    <form action={formAction} className="space-y-5">
      <Notice state={state} />
      {mode === "register" ? (
        <label className="block">
          <span className="text-sm font-bold text-ink">Nom complet</span>
          <span className="mt-2 block">
            <input
              name="name"
              className={authInputClass}
              placeholder="Amina Diallo"
              autoComplete="name"
              required
            />
          </span>
          {state.fieldErrors?.name ? (
            <span className="mt-1.5 block text-xs font-semibold text-danger">
              {state.fieldErrors.name}
            </span>
          ) : null}
        </label>
      ) : null}
      <label className="block">
        <span className="text-sm font-bold text-ink">Adresse e-mail</span>
        <span className="mt-2 block">
          <input
            name="email"
            type="email"
            className={authInputClass}
            placeholder="vous@exemple.com"
            autoComplete="email"
            required
          />
        </span>
        {state.fieldErrors?.email ? (
          <span className="mt-1.5 block text-xs font-semibold text-danger">
            {state.fieldErrors.email}
          </span>
        ) : null}
      </label>
      <label className="block">
        <span className="text-sm font-bold text-ink">Mot de passe</span>
        <span className="mt-2 block">
          <input
            name="password"
            type="password"
            className={authInputClass}
            placeholder={mode === "login" ? "Votre mot de passe" : "Au moins 8 caractères"}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
          />
        </span>
        {state.fieldErrors?.password ? (
          <span className="mt-1.5 block text-xs font-semibold text-danger">
            {state.fieldErrors.password}
          </span>
        ) : null}
      </label>
      {mode === "register" ? (
        <fieldset>
          <legend className="text-sm font-bold text-ink">Je suis</legend>
          <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="role"
                value="client"
                defaultChecked={defaultRole === "client"}
                className="peer sr-only"
              />
              <span className="block min-h-11 rounded-xl border border-line bg-matter px-3 py-3 transition hover:border-line-strong peer-checked:border-lime peer-checked:bg-lime-soft peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime">
                <span className="block text-sm font-bold text-ink">Client</span>
                <span className="mt-0.5 block text-xs leading-snug text-muted">
                  Je publie des projets
                </span>
              </span>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="role"
                value="freelance"
                defaultChecked={defaultRole === "freelance"}
                className="peer sr-only"
              />
              <span className="block min-h-11 rounded-xl border border-line bg-matter px-3 py-3 transition hover:border-line-strong peer-checked:border-lime peer-checked:bg-lime-soft peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime">
                <span className="block text-sm font-bold text-ink">Freelance</span>
                <span className="mt-0.5 block text-xs leading-snug text-muted">
                  Je réponds aux projets
                </span>
              </span>
            </label>
          </div>
          {state.fieldErrors?.role ? (
            <span className="mt-1.5 block text-xs font-semibold text-danger">
              {state.fieldErrors.role}
            </span>
          ) : null}
        </fieldset>
      ) : null}
      {mode === "register" && referralCode ? (
        <input type="hidden" name="referralCode" value={referralCode} />
      ) : null}
      <SubmitButton className="w-full sm:w-full">
        <span>{mode === "login" ? "Se connecter" : "Créer mon compte"}</span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden="true"
        >
          <path d="M4 10h11" />
          <path d="m11 6 4 4-4 4" />
        </svg>
      </SubmitButton>
      <p className="border-t border-line pt-5 text-center text-sm text-muted">
        {mode === "login" ? (
          <>
            Pas encore de compte ?{" "}
            <Link href="/inscription" className="font-bold text-teal hover:text-lime">
              S&apos;inscrire
            </Link>
          </>
        ) : (
          <>
            Déjà inscrit ?{" "}
            <Link href="/connexion" className="font-bold text-teal hover:text-lime">
              Se connecter
            </Link>
          </>
        )}
      </p>
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
        <input name="name" className={fieldClass} defaultValue={user.name} required />
      </Field>
      {user.role === "freelance" ? (
        <>
          <Field label="Titre du profil" error={state.fieldErrors?.title}>
            <input name="title" className={fieldClass} defaultValue={values.title} placeholder="Développeur fullstack Next.js" />
          </Field>
          <Field label="Bio" hint="Ce que vous faites et comment vous travaillez.">
            <textarea name="bio" className={textareaClass} defaultValue={values.bio} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Compétences" hint="Séparées par des virgules.">
              <input name="skills" className={fieldClass} defaultValue={values.skills.join(", ")} />
            </Field>
            <Field label="Langues" hint="Séparées par des virgules.">
              <input name="languages" className={fieldClass} defaultValue={values.languages.join(", ")} />
            </Field>
          </div>
          <Field label="Tarif journalier (FCFA)" error={state.fieldErrors?.dailyRate}>
            <input name="dailyRate" type="number" min="0" className={fieldClass} defaultValue={values.dailyRate} />
          </Field>
          <div className="flex flex-wrap gap-5">
            <label className="flex min-h-11 items-center gap-2 text-sm font-semibold text-ink">
              <input name="emailAlerts" type="checkbox" defaultChecked={values.emailAlerts} className="size-4 accent-lime" />
              Alertes e-mail par compétence
            </label>
            <label className="flex min-h-11 items-center gap-2 text-sm font-semibold text-ink">
              <input name="isPublic" type="checkbox" defaultChecked={values.isPublic} className="size-4 accent-lime" />
              Profil visible dans l&apos;annuaire
            </label>
          </div>
        </>
      ) : null}
      {user.role === "client" ? (
        <Field label="Nom de l'entreprise">
          <input name="companyName" className={fieldClass} defaultValue={values.companyName} />
        </Field>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Ville">
          <input name="city" className={fieldClass} defaultValue={values.city} />
        </Field>
        <Field label="Pays">
          <input name="country" className={fieldClass} defaultValue={values.country} />
        </Field>
        <Field label="Téléphone">
          <input name="phone" className={fieldClass} defaultValue={values.phone} />
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
        <input name="title" className={fieldClass} placeholder="Refonte d'une boutique e-commerce" required />
      </Field>
      <Field label="Description courte">
        <textarea name="description" className={textareaClass} required />
      </Field>
      <Field label="Lien (facultatif)">
        <input name="link" className={fieldClass} placeholder="https://…" />
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
        <input name="title" className={fieldClass} placeholder="Refonte e-commerce pour une marque de mode" required />
      </Field>
      <Field label="Description" error={state.fieldErrors?.description}>
        <textarea name="description" className={textareaClass} placeholder="Décrivez le contexte, les objectifs et les livrables." required />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Catégorie" error={state.fieldErrors?.categorySlug}>
          <select name="categorySlug" className={fieldClass} required>
            <option value="">Choisir une catégorie</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Délai souhaité (jours)" error={state.fieldErrors?.deadlineDays}>
          <input name="deadlineDays" type="number" min="1" className={fieldClass} defaultValue={21} required />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Budget minimum (FCFA)" error={state.fieldErrors?.budgetMin}>
          <input name="budgetMin" type="number" min="0" className={fieldClass} defaultValue={300000} required />
        </Field>
        <Field label="Budget maximum (FCFA)" error={state.fieldErrors?.budgetMax}>
          <input name="budgetMax" type="number" min="0" className={fieldClass} defaultValue={900000} required />
        </Field>
      </div>
      <Field label="Compétences recherchées" hint="Séparées par des virgules.">
        <input name="skills" list="skills-list" className={fieldClass} placeholder="Next.js, TypeScript, UI Design" />
        <datalist id="skills-list">
          {skills.map((skill) => (
            <option key={skill} value={skill} />
          ))}
        </datalist>
      </Field>
      <Field label="Fichiers joints" hint="Noms des fichiers, séparés par des virgules.">
        <input name="attachmentNames" className={fieldClass} placeholder="brief.pdf, maquettes.fig" />
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
          <label className={cn("min-h-11 cursor-pointer rounded-xl border p-4 transition", type === "simple" ? "border-lime bg-lime-soft" : "border-line bg-matter")}>
            <input
              type="radio"
              name="type"
              value="simple"
              checked={type === "simple"}
              onChange={() => setType("simple")}
              className="peer sr-only"
            />
            <span className="block text-sm font-bold text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime">Simple · 1 crédit</span>
            <span className="mt-1 block text-xs text-muted">Illimité, sans mise en avant.</span>
          </label>
          <label className={cn("min-h-11 cursor-pointer rounded-xl border p-4 transition", type === "premium" ? "border-lime bg-lime-soft" : "border-line bg-matter")}>
            <input
              type="radio"
              name="type"
              value="premium"
              checked={type === "premium"}
              onChange={() => setType("premium")}
              className="peer sr-only"
            />
            <span className="block text-sm font-bold text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime">Premium · 15 crédits</span>
            <span className="mt-1 block text-xs text-muted">
              {4 - premiumCount} restant{4 - premiumCount > 1 ? "s" : ""} sur 4.
            </span>
          </label>
        </div>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Prix proposé (FCFA)" error={state.fieldErrors?.price}>
          <input name="price" type="number" min="1000" className={fieldClass} required />
        </Field>
        <Field label="Délai de livraison (jours)" error={state.fieldErrors?.deliveryDays}>
          <input name="deliveryDays" type="number" min="1" className={fieldClass} defaultValue={14} required />
        </Field>
      </div>
      <Field label="Votre message" error={state.fieldErrors?.message}>
        <textarea name="message" className={textareaClass} placeholder="Expliquez votre approche et ce que vous livrerez." required />
      </Field>
      <div className="panel-quiet flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <p className="text-sm text-muted">
          Solde : <strong className="tnum text-ink">{credits} crédits</strong> · cette offre coûte{" "}
          <strong className="tnum text-ink">{cost} crédit{cost > 1 ? "s" : ""}</strong>
        </p>
        {!enough ? (
          <Link href="/abonnements" className="text-sm font-bold text-teal hover:text-lime">
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
      <Field label="Votre message">
        <textarea
          name="body"
          className={textareaClass}
          placeholder="Écrivez votre message. Les coordonnées directes sont bloquées."
          required
        />
      </Field>
      <SubmitButton>Envoyer le message</SubmitButton>
    </form>
  );
}

export function SubscribeForm({ plans }: { plans: Plan[] }) {
  const [planCode, setPlanCode] = useState(plans[0]?.code ?? "pro");
  const selected = plans.find((plan) => plan.code === planCode) ?? plans[0];
  const [state, formAction] = useActionState(subscribeAction, initialState);
  return (
    <form action={formAction} className="space-y-5">
      <Notice state={state} />
      <Field label="Formule">
        <select
          name="planCode"
          className={fieldClass}
          value={planCode}
          onChange={(event) => setPlanCode(event.target.value as typeof planCode)}
        >
          {plans.map((plan) => (
            <option key={plan.code} value={plan.code}>
              {plan.name} — {plan.monthlyCredits} crédits / 30 jours
            </option>
          ))}
        </select>
      </Field>
      <Field label="Moyen de paiement">
        <select name="provider" className={fieldClass} defaultValue="orange_money">
          <option value="orange_money">Orange Money</option>
          <option value="mtn_momo">MTN MoMo</option>
          <option value="wave">Wave</option>
          <option value="moov_money">Moov Money</option>
          <option value="card">Carte bancaire</option>
        </select>
      </Field>
      <Field label="Numéro Mobile Money" hint="Facultatif pour un paiement par carte.">
        <input name="phone" className={fieldClass} placeholder="+225 07 00 00 00 00" />
      </Field>
      <div className="panel-quiet px-4 py-3 text-sm text-muted">
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
        <select name="reason" className={fieldClass} required>
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
