import { journey } from "@/features/landing/landing-data";
import { SectionHeading } from "@/features/landing/section-heading";

export function LandingJourney() {
  return (
    <section id="journey" className="scroll-mt-20 py-16 sm:py-24">
      <div className="container max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="Student journey"
              title="From unsure to interview-ready."
              description="Move through four stages at your own pace. Each one has a tool built for it, and you can come back to any of them as your skills grow."
            />
          </div>

          <ol>
            {journey.map((stage, index) => {
              const Icon = stage.icon;
              const isLast = index === journey.length - 1;

              return (
                <li key={stage.title} className="relative flex gap-4 pb-8 last:pb-0">
                  {isLast ? null : (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-5 top-11 w-px bg-border"
                    />
                  )}

                  <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-background">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>

                  <div className="min-w-0 pt-1.5">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Step {index + 1} · {stage.tool}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">{stage.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                      {stage.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}