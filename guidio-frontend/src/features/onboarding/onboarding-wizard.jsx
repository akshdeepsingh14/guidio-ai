import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, LoaderCircle, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { STEPS } from "@/features/onboarding/onboarding-data";
import { OnboardingProgress } from "@/features/onboarding/onboarding-progress";
import {
  AcademicsStep,
  BasicsStep,
  DirectionStep,
  SkillsStep,
} from "@/features/onboarding/onboarding-steps";

const STEP_COMPONENTS = {
  basics: BasicsStep,
  academics: AcademicsStep,
  skills: SkillsStep,
  direction: DirectionStep,
};

/**
 * The multi-step form. It owns no data: the page passes the answers,
 * the validation errors and the handlers.
 */
export function OnboardingWizard({
  stepIndex,
  form,
  errors,
  onChange,
  onNext,
  onBack,
  isSaving,
  saveError,
  cooldownSeconds,
}) {
  const headingRef = useRef(null);
  const step = STEPS[stepIndex];
  const StepComponent = STEP_COMPONENTS[step.id];
  const isLast = stepIndex === STEPS.length - 1;
  const isWaiting = cooldownSeconds > 0;
  const isRateLimited = saveError?.code === "rate_limited";

  // Move keyboard and screen-reader focus to the new step title.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [stepIndex]);

  let nextLabel = isLast ? "Finish" : "Save and continue";

  if (isWaiting) {
    nextLabel = `Try again in ${cooldownSeconds}s`;
  }

  return (
    <div className="space-y-6">
      <OnboardingProgress steps={STEPS} currentIndex={stepIndex} />

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onNext();
        }}
        className="rounded-xl border bg-card p-5 text-card-foreground sm:p-8"
      >
        <div className="mb-6 space-y-1.5">
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-xl font-semibold tracking-tight outline-none sm:text-2xl"
          >
            {step.title}
          </h1>
          <p className="text-sm leading-6 text-muted-foreground">
            {step.description}
          </p>
        </div>

        <StepComponent
          form={form}
          errors={errors}
          onChange={onChange}
          disabled={isSaving}
        />

        {saveError ? (
          <Alert
            variant={isRateLimited ? "default" : "destructive"}
            className="mt-6 items-start"
          >
            {isRateLimited ? (
              <Clock aria-hidden="true" />
            ) : (
              <TriangleAlert aria-hidden="true" />
            )}
            <AlertTitle>
              {isRateLimited ? "Please wait a moment" : "We could not save this step"}
            </AlertTitle>
            <AlertDescription>
              <p>{saveError.message}</p>
              <p className="mt-1">Your answers are still here. Nothing was lost.</p>
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="mt-8 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          {stepIndex > 0 ? (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isSaving}
              className="h-10 px-4"
            >
              <ArrowLeft aria-hidden="true" />
              Previous
            </Button>
          ) : null}

          <Button
            type="submit"
            disabled={isSaving || isWaiting}
            className="h-10 px-5 sm:ml-auto"
          >
            {isSaving ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : null}
            {isSaving ? "Saving..." : nextLabel}
            {!isSaving && !isWaiting ? (
              isLast ? <Check aria-hidden="true" /> : <ArrowRight aria-hidden="true" />
            ) : null}
          </Button>
        </div>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        Your progress is saved to your account each time you continue.
      </p>
    </div>
  );
}