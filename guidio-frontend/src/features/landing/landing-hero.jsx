
import { Sparkles } from "lucide-react";
import { CtaLink, PrimaryCta } from "@/features/landing/cta-link";
import { DashboardPreview } from "@/features/landing/dashboard-preview";

const gridBackground = {
  backgroundImage:
    "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
  maskImage:
    "radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%)",
};

export function LandingHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={gridBackground}
      />

      <div className="container max-w-6xl pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center animate-in fade-in slide-in-from-bottom-2 duration-700">
          <p className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Free AI career companion for students
          </p>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Your Career. Your Potential.{" "}
            <span className="text-muted-foreground">Powered by AI.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Discover your strengths, identify skill gaps, explore career
            opportunities and prepare for interviews with your personal AI
            career companion.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryCta className="w-full sm:w-auto" />

            <CtaLink
              href="#features"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Explore Features
            </CtaLink>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Free for students. AI features use free AI services, so usage
            limits may apply.
          </p>
        </div>

        <DashboardPreview className="mt-14 sm:mt-16" />
      </div>
    </section>
  );
}
