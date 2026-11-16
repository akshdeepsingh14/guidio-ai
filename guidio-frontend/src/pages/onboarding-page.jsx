import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useAuth, useUser } from "@clerk/react";
import { ErrorState } from "@/components/common/error-state";
import { Logo } from "@/components/common/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { useCooldown } from "@/hooks/use-cooldown";
import { apiRequest } from "@/lib/api-client";
import { OnboardingComplete } from "@/features/onboarding/onboarding-complete";
import {
  STEPS,
  buildStepPayload,
  createEmptyForm,
  findFirstIncompleteStep,
  normalizeName,
  profileToForm,
  validateStep,
} from "@/features/onboarding/onboarding-data";
import { OnboardingWizard } from "@/features/onboarding/onboarding-wizard";

const DEFAULT_COOLDOWN_SECONDS = 30;

function OnboardingSkeleton() {
  return (
    <div role="status" aria-live="polite" className="space-y-6">
      <span className="sr-only">Loading your profile</span>

      <div className="space-y-3">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-1 w-full" />
      </div>

      <div className="space-y-6 rounded-xl border bg-card p-5 sm:p-8">
        <div className="space-y-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-64 max-w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

/** Moves keyboard focus to the first field that has an error. */
function focusFirstInvalidField() {
  requestAnimationFrame(() => {
    const field = document.querySelector('[data-invalid="true"]');

    if (!field) return;

    const control =
      field.querySelector("input:not([type='radio']):not(:disabled), textarea:not(:disabled)") ??
      field.querySelector("input[type='radio']:checked, input[type='radio']");

    if (control) {
      control.focus();
    } else {
      field.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  });
}

function OnboardingPage() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const cooldown = useCooldown();

  // Read once. Clerk is already loaded here because the route is protected.
  const [initialName] = useState(() => user?.fullName ?? "");

  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [loadError, setLoadError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  const [form, setForm] = useState(() => createEmptyForm(initialName));
  const [view, setView] = useState("wizard"); // wizard | complete
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Keeps the loader below from running again if Clerk ever hands back a new
  // getToken function. A second load would overwrite what the student typed.
  const getTokenRef = useRef(getToken);

  useEffect(() => {
    getTokenRef.current = getToken;
  }, [getToken]);

  /* Load the saved profile and resume at the first unfinished step. */
  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      try {
        const token = await getTokenRef.current();
        const response = await apiRequest("/api/profile", {
          token,
          signal: controller.signal,
        });

        const savedForm = profileToForm(response?.data ?? null, initialName);
        const firstIncomplete = findFirstIncompleteStep(savedForm);

        setForm(savedForm);

        if (firstIncomplete === -1) {
          setView("complete");
          setStepIndex(0);
        } else {
          setView("wizard");
          setStepIndex(firstIncomplete);
        }

        setLoadError(null);
        setStatus("ready");
      } catch (error) {
        if (error?.name === "AbortError") return;

        setLoadError(error);
        setStatus("error");
      }
    }

    loadProfile();

    return () => controller.abort();
  }, [initialName, attempt]);

  function retryLoad() {
    setStatus("loading");
    setAttempt((count) => count + 1);
  }

  function handleChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });
    setSaveError(null);
  }

  /* The full name lives in the Clerk account, not in the profile API. */
  async function saveFullName() {
    const name = normalizeName(form.fullName);

    if (!user || name === normalizeName(user.fullName ?? "")) return;

    const [firstName, ...rest] = name.split(" ");

    await user.update({ firstName, lastName: rest.join(" ") });
  }

  async function handleNext() {
    if (isSaving) return;

    const step = STEPS[stepIndex];
    const stepErrors = validateStep(step.id, form);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      focusFirstInvalidField();
      return;
    }

    setErrors({});
    setSaveError(null);
    setIsSaving(true);

    try {
      if (step.id === "basics") {
        await saveFullName();
      }

      const token = await getToken();

      await apiRequest("/api/profile", {
        method: "PUT",
        token,
        body: buildStepPayload(step.id, form),
      });

      if (stepIndex === STEPS.length - 1) {
        setView("complete");
      } else {
        setStepIndex(stepIndex + 1);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSaveError(error);

      if (error?.code === "rate_limited") {
        cooldown.start(error.retryAfterSeconds ?? DEFAULT_COOLDOWN_SECONDS);
      }
    } finally {
      setIsSaving(false);
    }
  }

  function handleBack() {
    if (isSaving || stepIndex === 0) return;

    setErrors({});
    setSaveError(null);
    setStepIndex(stepIndex - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleEdit() {
    setErrors({});
    setSaveError(null);
    setStepIndex(0);
    setView("wizard");
    window.scrollTo({ top: 0 });
  }

  const firstName = normalizeName(form.fullName).split(" ")[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container flex h-16 max-w-3xl items-center justify-between gap-3">
          <Logo />

          <div className="flex items-center gap-2">
            {status === "ready" && view === "wizard" ? (
              <Link
                to="/dashboard"
                className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Skip for now
              </Link>
            ) : null}

            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="container max-w-3xl py-8 sm:py-12">
        {status === "loading" ? <OnboardingSkeleton /> : null}

        {status === "error" ? (
          <ErrorState
            title="Unable to load your profile"
            error={loadError}
            onRetry={retryLoad}
          />
        ) : null}

        {status === "ready" && view === "wizard" ? (
          <OnboardingWizard
            stepIndex={stepIndex}
            form={form}
            errors={errors}
            onChange={handleChange}
            onNext={handleNext}
            onBack={handleBack}
            isSaving={isSaving}
            saveError={saveError}
            cooldownSeconds={cooldown.remaining}
          />
        ) : null}

        {status === "ready" && view === "complete" ? (
          <OnboardingComplete
            form={form}
            firstName={firstName}
            onEdit={handleEdit}
          />
        ) : null}
      </main>
    </div>
  );
}

export default OnboardingPage;