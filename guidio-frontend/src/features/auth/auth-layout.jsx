
import { Check } from "lucide-react";
import { Link } from "react-router";

import { AiUsageNotice } from "@/components/common/ai-usage-notice";
import { Logo } from "@/components/common/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { SkipLink } from "@/components/skip-link";

const gridBackground = {
  backgroundImage:
    "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
  maskImage:
    "radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%)",
};

const highlights = [
  "Skill gap analysis against your target role",
  "Career roadmaps built around your profile",
  "Technical and HR mock interviews with scored feedback",
  "An AI assistant for coding and placement doubts",
];

/**
 * Shared shell for the sign-in and sign-up pages: header, a short product
 * panel on large screens and the form column.
 */
export function AuthLayout({ eyebrow, title, description, children }) {
  return (
    <div className="relative isolate min-h-screen bg-background text-foreground">
      <SkipLink />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={gridBackground}
      />

      <header className="container flex h-16 max-w-6xl items-center justify-between">
        <Logo />
        <ModeToggle />
      </header>

      <main
        id="main-content"
        className="container grid max-w-6xl gap-12 py-8 sm:py-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-16"
      >
        <aside className="hidden lg:block">
          <p className="max-w-md text-4xl font-semibold leading-[1.15] tracking-tight text-balance">
            Your AI career companion.
          </p>

          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-muted-foreground"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border">
                  <Check aria-hidden="true" className="size-3" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <AiUsageNotice className="mt-10 max-w-md" />
        </aside>

        <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
          <div className="mb-6 text-center lg:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {eyebrow}
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>

          {children}

          <p className="mt-6 text-center text-sm lg:text-left">
            <Link
              to="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              &larr; Back to home
            </Link>
          </p>

          <p className="mt-4 text-center text-xs leading-5 text-muted-foreground lg:text-left">
            By continuing, you agree to our{" "}
            <Link
              to="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Terms and Conditions
              <span className="sr-only"> (opens in a new tab)</span>
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Privacy Policy
              <span className="sr-only"> (opens in a new tab)</span>
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
