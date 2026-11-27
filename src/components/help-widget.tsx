"use client";

import { useEffect, useRef, useState } from "react";
import { Close, Help, Send, Sparkles } from "@/components/icons";
import { cn } from "@/lib/utils";

function getReply(input: string): string {
  const q = input.toLowerCase();
  if (/(publier|projet|client|devis|besoin|recrut)/.test(q))
    return "Publier un besoin est gratuit. Décrivez votre projet (budget, délai, compétences) et recevez des offres simples à 1 crédit ou premium à 15 crédits, 4 au maximum par mission.";
  if (/(payer|paiement|mobile money|wave|orange|mtn|carte|stripe|moov)/.test(q))
    return "Nous acceptons le Mobile Money (Orange Money, MTN MoMo, Wave, Moov Money) et les cartes bancaires via Stripe. Les fonds sont sécurisés jusqu'à la livraison.";
  if (/(freelance|mission|talent|travail|candidat|postuler)/.test(q))
    return "En tant que freelance, créez votre profil gratuitement puis débloquez les candidatures avec des crédits ou un abonnement. Aucune société n'est requise.";
  if (/(tarif|prix|abonnement|coût|credit|crédit|combien)/.test(q))
    return "Consulter les offres est gratuit. Côté freelance : Pro à 31,90 €/mois, Pro Max à 59,90 €/mois et Agence à 109,90 €/mois. Les crédits accompagnent ces formules.";
  if (/(société|entreprise|statut|auto|indépendant|informel)/.test(q))
    return "Aucune société n'est requise pour travailler. Une vérification d'identité suffit pour commencer.";
  if (/(sécuris|confiance|avis|vérifi|garantie|litige)/.test(q))
    return "La vérification d'identité et les avis servent à établir la confiance. Le paiement est bloqué puis libéré après validation de la mission.";
  if (/(bonjour|salut|hello|bonsoir|coucou)/.test(q))
    return "Bonjour ! Comment puis-je vous aider : publier un besoin, trouver un talent, ou comprendre les tarifs ?";
  if (/(merci|top|super|génial|parfait)/.test(q))
    return "Avec plaisir. Besoin d'autre chose ?";
  return "Je peux vous aider sur : publier un besoin, trouver un talent, les moyens de paiement ou les tarifs. Que voulez-vous savoir ?";
}

export function HelpWidget() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = question.trim();
    if (!value) return;
    setAsked(value);
    setQuestion("");
    setAnswer(null);
    setThinking(true);
    timerRef.current = window.setTimeout(
      () => {
        setAnswer(getReply(value));
        setThinking(false);
      },
      500 + Math.min(value.length * 16, 800),
    );
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-end px-4 pb-5 sm:pb-6">
      <div className="pointer-events-auto relative w-full max-w-md">
        <div
          role="dialog"
          aria-label="Aide Taf Africa"
          aria-modal="false"
          className={cn(
            "absolute bottom-full left-1/2 mb-3 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 origin-bottom transition-all duration-200",
            open
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-2 scale-95 opacity-0",
          )}
        >
          <div className="overflow-hidden rounded-2xl border border-line bg-panel shadow-lift">
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-[30%] bg-lime-soft text-lime">
                <Help className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">
                  Comment pouvons-nous aider ?
                </p>
                <p className="text-xs text-muted">Réponse immédiate, en français.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="grid size-10 shrink-0 place-items-center rounded-full text-muted transition-colors hover:text-ink"
              >
                <Close className="size-5" />
              </button>
            </div>

            <div className="px-5 py-4" aria-live="polite">
              {!asked ? (
                <p className="text-sm leading-relaxed text-muted">
                  Posez votre question ci-dessous : publier un besoin, trouver un
                  talent, les paiements ou les tarifs.
                </p>
              ) : (
                <div className="space-y-3">
                  <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-ink px-3.5 py-2.5 text-sm font-medium text-matter">
                    {asked}
                  </p>
                  {thinking ? (
                    <span className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm bg-raised px-3.5 py-3">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="size-1.5 animate-typing rounded-full bg-muted"
                          style={{ animationDelay: `${i * 120}ms` }}
                        />
                      ))}
                    </span>
                  ) : (
                    answer && (
                      <p className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm bg-raised px-3.5 py-2.5 text-sm leading-relaxed text-ink-soft">
                        {answer}
                      </p>
                    )
                  )}
                </div>
              )}
            </div>

            <form onSubmit={submit} className="border-t border-line p-3">
              <label htmlFor="help-question" className="eyebrow mb-2 block">
                Votre question
              </label>
              <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-full bg-matter px-4 py-2.5">
                  <Sparkles className="size-4 shrink-0 text-lime" />
                  <input
                    id="help-question"
                    ref={inputRef}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Publier un besoin, tarifs, paiements…"
                    className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Envoyer la question"
                  disabled={!question.trim()}
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-lime text-matter transition-colors hover:bg-lime-hover disabled:opacity-40"
                >
                  <Send className="size-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="action action-primary mx-auto shadow-lift"
        >
          {open ? (
            <Close className="size-[18px]" />
          ) : (
            <Help className="size-[18px]" />
          )}
          {open ? "Fermer" : "Besoin d'aide ?"}
        </button>
      </div>
    </div>
  );
}
