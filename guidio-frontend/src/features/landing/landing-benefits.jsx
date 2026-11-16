import { benefits } from "@/features/landing/landing-data";
import { SectionHeading } from "@/features/landing/section-heading";

export function LandingBenefits() {
  return (
    <section
      id="benefits"
      className="scroll-mt-20 border-y bg-muted/30 py-16 sm:py-24"
    >
      <div className="container max-w-6xl">
        <SectionHeading
          eyebrow="Why Guidio AI"
          title="Stop guessing what to do next."
          description="Students often have the motivation but not a clear path. Guidio AI connects learning, skills, career goals and interview practice in one place."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div key={benefit.title} className="bg-card p-6">
                <Icon aria-hidden="true" className="size-5" />
                <h3 className="mt-4 text-base font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}