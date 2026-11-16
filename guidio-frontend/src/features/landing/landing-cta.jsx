import { useAuth } from "@clerk/react";
import { CtaLink, PrimaryCta } from "@/features/landing/cta-link";

function SignInLink() {
  const { isLoaded, isSignedIn } = useAuth();

  if (isLoaded && isSignedIn) {
    return null;
  }

  return (
    <CtaLink
      to="/sign-in"
      variant="ghost"
      className="w-full text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto dark:hover:bg-primary-foreground/10"
    >
      I already have an account
    </CtaLink>
  );
}

export function LandingCta() {
  return (
    <section className="container max-w-6xl pb-16 sm:pb-24">
      <div className="rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12 sm:py-20">
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Start building your career with Guidio AI.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-primary-foreground/70">
          Create your profile, find your skill gaps and practise your first
          mock interview today.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryCta variant="secondary" className="w-full sm:w-auto" />
          <SignInLink />
        </div>
      </div>
    </section>
  );
}