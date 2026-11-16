import { steps } from "@/features/landing/landing-data";
import { SectionHeading } from "@/features/landing/section-heading";

export function LandingHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-y bg-muted/30 py-16 sm:py-24"
    >
      <div className="container max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title="From sign-up to a clear plan in three steps."
          description="Guidio AI turns your skills and goals into actions you can start on today."
        />

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <li key={step.title} className="rounded-2xl border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg border bg-background">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="text-sm font-medium tabular-nums text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}