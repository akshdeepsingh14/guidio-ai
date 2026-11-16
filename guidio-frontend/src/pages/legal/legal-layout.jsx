
import { useEffect } from "react";
import { Link } from "react-router";

import { Logo } from "@/components/common/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { SkipLink } from "@/components/skip-link";
import { LEGAL } from "@/lib/site-config";

/** Highlights information that still has to be supplied by the site owner. */
export function Placeholder({ children }) {
  return (
    <mark className="rounded bg-warning/20 px-1 py-0.5 font-medium text-foreground">
      {children}
    </mark>
  );
}

/** An underlined in-text link to another page of the site. */
export function TextLink({ to, children }) {
  return (
    <Link
      to={to}
      className="font-medium text-foreground underline underline-offset-4"
    >
      {children}
    </Link>
  );
}

/** A clickable mailto link to the contact email set in LEGAL.contactEmail. */
export function EmailLink() {
  return (
    <a
      href={`mailto:${LEGAL.contactEmail}`}
      className="font-medium text-foreground underline underline-offset-4"
    >
      {LEGAL.contactEmail}
    </a>
  );
}

export function LegalSection({ id, title, children }) {
  return (
    <section aria-labelledby={`${id}-title`} className="space-y-3">
      <h2 id={`${id}-title`} className="text-xl font-semibold tracking-tight">
        {title}
      </h2>

      <div className="space-y-3 text-base leading-7 text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ children }) {
  return <ul className="list-disc space-y-1.5 pl-5">{children}</ul>;
}

const footerLinkClass =
  "text-muted-foreground transition-colors hover:text-foreground";

/** Shared page shell for the Privacy Policy and the Terms and Conditions. */
export function LegalLayout({ title, updated, children }) {
  // Opening a legal page from the footer must start at the top of the page.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />

      <header className="border-b">
        <div className="container flex h-16 max-w-6xl items-center justify-between gap-4">
          <Logo />
          <ModeToggle />
        </div>
      </header>

      <main
        id="main-content"
        className="container max-w-3xl py-10 sm:py-16"
      >
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Legal
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: {updated}
        </p>

        <div className="mt-10 space-y-10">{children}</div>
      </main>

      <footer className="border-t">
        <div className="container flex max-w-6xl flex-col gap-3 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy" className={footerLinkClass}>
              Privacy Policy
            </Link>

            <Link to="/terms" className={footerLinkClass}>
              Terms and Conditions
            </Link>

            <Link to="/" className={footerLinkClass}>
              Home
            </Link>
          </nav>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Guidio AI
          </p>
        </div>
      </footer>
    </div>
  );
}
