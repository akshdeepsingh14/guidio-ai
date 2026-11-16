import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

/**
 * Shows "Step X of N", a progress bar and (from tablet width up)
 * the list of steps. On phones only the current step title is shown.
 */
export function OnboardingProgress({ steps, currentIndex }) {
  const total = steps.length;
  const percent = Math.round(((currentIndex + 1) / total) * 100);

  return (
    <nav aria-label="Onboarding progress" className="space-y-3">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <p className="font-medium">
          Step {currentIndex + 1} of {total}
          <span className="ml-2 font-normal text-muted-foreground sm:hidden">
            · {steps[currentIndex].title}
          </span>
        </p>
        <p className="tabular-nums text-muted-foreground">{percent}%</p>
      </div>

      <Progress
        value={percent}
        aria-label={`Onboarding progress: step ${currentIndex + 1} of ${total}`}
        className="gap-0"
      />

      <ol className="hidden grid-cols-4 gap-3 pt-1 sm:grid">
        {steps.map((step, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <li
              key={step.id}
              aria-current={isCurrent ? "step" : undefined}
              className="flex min-w-0 items-center gap-2"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                  isDone && "border-foreground bg-foreground text-background",
                  isCurrent && "border-foreground",
                  !isDone && !isCurrent && "text-muted-foreground"
                )}
              >
                {isDone ? <Check className="size-3.5" /> : index + 1}
              </span>
              <span
                className={cn(
                  "truncate text-sm",
                  isCurrent ? "font-medium" : "text-muted-foreground"
                )}
              >
                {step.title}
                {isDone ? <span className="sr-only"> (completed)</span> : null}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}