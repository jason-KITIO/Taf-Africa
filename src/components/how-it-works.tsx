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
    <section
      id="comment-ca-marche"
      className="border-y border-line bg-sand"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-4xl">
              Deux côtés, un seul marché
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Que vous recrutiez ou que vous cherchiez du travail, le parcours
              est court et se déroule entièrement en français.
            </p>
          </div>
          <WorkflowIllustration className="hidden max-w-sm rounded-2xl ring-1 ring-line lg:block" />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {columns.map(({ icon: Icon, audience, steps }) => (
            <div key={audience}>
              <h3 className="flex items-center gap-3 text-xl font-bold text-ink">
                <span className="grid size-10 place-items-center rounded-xl bg-ink text-paper">
                  <Icon className="size-5" />
                </span>
                {audience}
              </h3>
              <ol className="mt-6 space-y-6">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="tnum mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-line-strong bg-surface text-sm font-bold text-ink">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-ink">
                        {step.title}
                      </h4>
                      <p className="mt-1 text-[15px] leading-relaxed text-muted">
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
