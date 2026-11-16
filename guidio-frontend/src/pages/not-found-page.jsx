import { useAuth } from "@clerk/react";
import { Logo } from "@/components/common/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { SkipLink } from "@/components/skip-link";
import { CtaLink } from "@/features/landing/cta-link";

const gridBackground = {
  backgroundImage:
    "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
  maskImage:
    "radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%)",
};

/** Shown for any URL that does not match a page of the site. */
function NotFoundPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const signedIn = isLoaded && isSignedIn;

  return (
    <div className="relative isolate flex min-h-screen flex-col bg-background text-foreground">
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
        className="container flex max-w-2xl flex-1 flex-col items-center justify-center py-16 text-center"
      >
        <p
          aria-hidden="true"
          className="text-7xl font-semibold tracking-tight text-muted-foreground sm:text-8xl"
        >
          404
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Page not found
        </h1>

        <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
          The page you are looking for does not exist or may have moved. Check
          the address, or go back to a page that works.
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <CtaLink to="/" className="w-full sm:w-auto">
            Back to Home
          </CtaLink>

          {signedIn ? (
            <CtaLink
              to="/dashboard"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Go to Dashboard
            </CtaLink>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;