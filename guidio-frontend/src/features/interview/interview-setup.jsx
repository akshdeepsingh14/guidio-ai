import { LoaderCircle, Play } from "lucide-react";
import { AiErrorNotice } from "@/components/common/ai-error-notice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChoiceGroup } from "@/features/onboarding/choice-group";
import {
  DIFFICULTIES,
  INTERVIEW_TYPES,
  QUESTION_COUNT,
  ROLE_MAX_LENGTH,
} from "./interview-utils";

export function InterviewSetup({
  setup,
  onChange,
  canStart,
  profileRole,
  onStart,
  isStarting,
  startError,
  cooldown,
}) {
  const showProfileRole =
    Boolean(profileRole) && profileRole.trim() !== setup.targetRole.trim();

  let buttonLabel = "Start interview";
  if (isStarting) buttonLabel = "Preparing your first question…";
  else if (cooldown.isCoolingDown) buttonLabel = `Try again in ${cooldown.remaining}s`;

  function handleSubmit(event) {
    event.preventDefault();
    onStart();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Set up your interview</CardTitle>
        <CardDescription>
          Choose the type, role and difficulty. Guidio AI will ask you{" "}
          {QUESTION_COUNT} questions and score each answer.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <p id="interview-type-label" className="text-sm font-medium">
              Interview type
            </p>

            <ChoiceGroup
              name="interviewType"
              aria-labelledby="interview-type-label"
              value={setup.interviewType}
              onChange={(value) => onChange("interviewType", value)}
              options={INTERVIEW_TYPES}
              disabled={isStarting}
              className="sm:grid-cols-3"
            />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label htmlFor="interview-role">Target role</Label>

              {showProfileRole ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onChange("targetRole", profileRole)}
                  disabled={isStarting}
                >
                  Use my profile role
                </Button>
              ) : null}
            </div>

            <Input
              id="interview-role"
              value={setup.targetRole}
              onChange={(event) => onChange("targetRole", event.target.value)}
              placeholder="e.g. Frontend Developer"
              maxLength={ROLE_MAX_LENGTH}
              autoComplete="off"
              disabled={isStarting}
              className="h-10"
            />

            <p className="text-xs leading-5 text-muted-foreground">
              A specific role gives you more relevant questions.
            </p>
          </div>

          <div className="space-y-2">
            <p id="interview-difficulty-label" className="text-sm font-medium">
              Difficulty
            </p>

            <ChoiceGroup
              name="difficulty"
              aria-labelledby="interview-difficulty-label"
              value={setup.difficulty}
              onChange={(value) => onChange("difficulty", value)}
              options={DIFFICULTIES}
              disabled={isStarting}
              className="sm:grid-cols-3"
            />
          </div>

          <ul className="space-y-1.5 rounded-lg border bg-muted/40 p-3.5 text-sm leading-6 text-muted-foreground">
            <li>{QUESTION_COUNT} questions, one at a time.</li>
            <li>Scores and feedback after every answer.</li>
            <li>A final score, strengths and an improvement plan at the end.</li>
          </ul>

          {startError ? (
            <AiErrorNotice
              error={startError}
              onRetry={canStart ? onStart : undefined}
              cooldownSeconds={cooldown.remaining}
            />
          ) : null}

          <Button
            type="submit"
            size="lg"
            disabled={!canStart || isStarting || cooldown.isCoolingDown}
            className="h-auto min-h-9 w-full whitespace-normal py-1.5 sm:w-auto"
          >
            {isStarting ? (
              <LoaderCircle aria-hidden="true" className="animate-spin" />
            ) : (
              <Play aria-hidden="true" />
            )}
            {buttonLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}