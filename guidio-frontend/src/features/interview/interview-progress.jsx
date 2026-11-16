import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const STATUS_LABELS = {
  answered: "answered",
  current: "current question",
  upcoming: "not available yet",
};

/**
 * Shows the interview setup, how many questions are answered and a row of
 * numbered steps. Answered steps can be opened to review the feedback, and
 * the current step goes back to the open question. Upcoming steps stay
 * locked, because the server creates each question only after the previous
 * answer is scored.
 */
export function InterviewProgress({
  interview,
  steps,
  activeQuestionId,
  onSelect,
  disabled,
}) {
  const answered = steps.filter((step) => step.status === "answered").length;
  const percent = steps.length > 0 ? Math.round((answered / steps.length) * 100) : 0;

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-1.5">
            <Badge variant="secondary">{interview.interviewType}</Badge>
            <Badge variant="outline">{interview.difficulty}</Badge>
            <span className="min-w-0 break-words text-sm font-medium">
              {interview.targetRole}
            </span>
          </div>

          <p className="text-sm tabular-nums text-muted-foreground">
            {answered} of {steps.length} answered
          </p>
        </div>

        <div
          role="progressbar"
          aria-label="Interview progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          className="h-1.5 overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-foreground transition-[width]"
            style={{ width: `${percent}%` }}
          />
        </div>

        <ol aria-label="Interview questions" className="flex flex-wrap gap-2">
          {steps.map((step) => {
            const isActive = Boolean(step.question) && step.question.id === activeQuestionId;
            const canOpen = step.status !== "upcoming" && Boolean(step.question);

            return (
              <li key={step.number}>
                <button
                  type="button"
                  onClick={() => onSelect(step)}
                  disabled={disabled || !canOpen}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`Question ${step.number}, ${STATUS_LABELS[step.status]}`}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full border text-sm font-medium tabular-nums transition-colors",
                    "disabled:cursor-not-allowed",
                    isActive && "border-foreground bg-foreground text-background",
                    !isActive &&
                      step.status === "answered" &&
                      "border-success/40 bg-success/10 text-success hover:bg-success/20",
                    !isActive &&
                      step.status === "current" &&
                      "border-foreground/40 hover:bg-accent",
                    step.status === "upcoming" &&
                      "border-dashed text-muted-foreground opacity-60"
                  )}
                >
                  {step.status === "answered" ? (
                    <Check aria-hidden="true" className="size-4" />
                  ) : (
                    step.number
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}