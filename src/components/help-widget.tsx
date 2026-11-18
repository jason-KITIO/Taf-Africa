"use client";

import { useEffect, useRef, useState } from "react";
import { Close, Help, Send, Sparkles } from "@/components/icons";
import { cn } from "@/lib/utils";

function getReply(input: string): string {
  const q = input.toLowerCase();
  if (/(publier|projet|client|devis|besoin|recrut)/.test(q))
    return "Publier un besoin est 100 % gratuit. Décrivez votre projet (budget, délai, compétences) et recevez jusqu'à 10 propositions qualifiées.";
  if (/(payer|paiement|mobile money|wave|orange|mtn|carte|stripe|moov)/.test(q))
    return "Nous acceptons le Mobile Money (Orange Money, MTN MoMo, Wave, Moov Money) et les cartes bancaires via Stripe. Les fonds sont sécurisés jusqu'à la livraison.";
  if (/(freelance|mission|talent|travail|candidat|postuler)/.test(q))
    return "En tant que freelance, créez votre profil gratuitement puis débloquez les candidatures avec des crédits ou un abonnement. Aucune société n'est requise.";
  if (/(tarif|prix|abonnement|coût|credit|crédit|combien)/.test(q))
    return "Consulter les offres est gratuit. Côté freelance : Pro à 31,90 €/mois, Pro Max à 59,90 €/mois et Agence à 109,90 €/mois. Vous pouvez aussi acheter des crédits à l'unité.";
  if (/(société|entreprise|statut|auto|indépendant|informel)/.test(q))
    return "Contrairement aux plateformes classiques, aucune société n'est requise. Une simple vérification d'identité suffit pour commencer.";
  if (/(sécuris|confiance|avis|vérifi|garantie|litige)/.test(q))
    return "Les profils sont vérifiés et notés par la communauté. Le paiement est bloqué puis libéré uniquement après validation de la mission.";
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
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-5 sm:pb-6">
      <div className="pointer-events-auto relative w-full max-w-md">
        <div
          role="dialog"
          aria-label="Aide Taf Africa"
          aria-modal="false"
          className={cn(
            "absolute bottom-full left-1/2 mb-3 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 origin-bottom transition-all duration-300",
            open
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-3 scale-95 opacity-0",
          )}
        >
          <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-lift">
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-amber-soft text-amber-strong">
                <Help className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">
                  Comment pouvons-nous aider ?
                </p>
                <p className="text-xs text-muted">
                  Réponse immédiate, en français.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="grid size-8 shrink-0 place-items-center rounded-full text-muted transition hover:bg-ink/5 hover:text-ink"
              >
                <Close className="size-5" />
              </button>
            </div>

            <div className="px-5 py-4">
              {!asked ? (
                <p className="text-sm leading-relaxed text-muted">
                  Posez votre question ci-dessous : publier un besoin, trouver un
                  talent, les paiements ou les tarifs.
                </p>
              ) : (
                <div className="space-y-3">
                  <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-ink px-3.5 py-2.5 text-sm font-medium text-paper">
                    {asked}
                  </p>
                  {thinking ? (
                    <span className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm bg-sand px-3.5 py-3">
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
                      <p className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm bg-sand px-3.5 py-2.5 text-sm leading-relaxed text-ink-soft">
                        {answer}
                      </p>
                    )
                  )}
                </div>
              )}
            </div>

            <form
              onSubmit={submit}
              className="flex items-center gap-2 border-t border-line p-3"
            >
              <div className="flex flex-1 items-center gap-2 rounded-full bg-paper px-4 py-2.5">
                <Sparkles className="size-4 shrink-0 text-amber-strong" />
                <input
                  ref={inputRef}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Votre question…"
                  aria-label="Votre question"
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                />
              </div>
              <button
                type="submit"
                aria-label="Envoyer la question"
                disabled={!question.trim()}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-amber-strong text-paper transition hover:bg-amber-strong-hover disabled:opacity-40"
              >
                <Send className="size-5" />
              </button>
            </form>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mx-auto flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper shadow-lift transition hover:bg-ink-soft"
        >
          {open ? (
            <Close className="size-[18px] text-paper" />
          ) : (
            <Help className="size-[18px] text-amber" />
          )}
          {open ? "Fermer" : "Besoin d'aide ?"}
        </button>
      </div>
    </div>
  );
}
