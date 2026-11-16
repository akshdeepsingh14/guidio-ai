import { Check } from "lucide-react";
import { FeatureVisual } from "@/features/landing/feature-visuals";
import { features } from "@/features/landing/landing-data";
import { SectionHeading } from "@/features/landing/section-heading";

export function LandingFeatures() {
  return (
    <section id="features" className="scroll-mt-20 py-16 sm:py-24">
      <div className="container max-w-6xl">
        <SectionHeading
          eyebrow="Features"
          title="Four tools. One career companion."
          description="From understanding a tricky concept to preparing for your final interview, everything works together around your profile."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.id}
                className="flex flex-col rounded-2xl border bg-card p-5 transition-colors hover:border-foreground/25 sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <FeatureVisual id={feature.id} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}