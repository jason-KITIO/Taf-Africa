import { clientSteps, freelanceSteps } from "@/lib/content";
import { Briefcase, Users } from "@/components/icons";
import { WorkflowIllustration } from "@/components/illustrations";

const columns = [
  {
    icon: Users,
    audience: "Vous cherchez un talent",
    steps: clientSteps,
  },
  {
    icon: Briefcase,
    audience: "Vous cherchez une mission",
    steps: freelanceSteps,
  },
];

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="section-rule">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.42fr)] lg:items-end lg:gap-14">
          <div className="max-w-2xl">
            <p className="eyebrow">Parcours</p>
            <h2 className="mt-4 text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-4xl">
              Deux côtés, un seul marché
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Que vous recrutiez ou que vous cherchiez du travail, le parcours
              est court et se déroule entièrement en français.
            </p>
          </div>
          <div data-visual className="panel-quiet hidden overflow-hidden lg:block">
            <WorkflowIllustration className="h-auto w-full" />
          </div>
        </div>

        <div className="grid gap-px border-x border-b border-line bg-line lg:grid-cols-2">
          {columns.map(({ icon: Icon, audience, steps }) => (
            <div key={audience} className="bg-panel p-6 sm:p-8">
              <h3 className="flex items-center gap-3 text-lg font-bold text-ink sm:text-xl">
                <span className="grid size-10 shrink-0 place-items-center border border-line bg-matter text-lime">
                  <Icon className="size-5" />
                </span>
                {audience}
              </h3>
              <ol className="mt-8 space-y-0 divide-y divide-line border-y border-line">
                {steps.map((step, i) => (
                  <li key={step.title} className="grid gap-3 py-5 sm:grid-cols-[auto_1fr] sm:gap-5">
                    <span className="tnum text-sm font-bold text-teal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-ink">
                        {step.title}
                      </h4>
                      <p className="mt-2 text-base leading-relaxed text-ink-soft">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
