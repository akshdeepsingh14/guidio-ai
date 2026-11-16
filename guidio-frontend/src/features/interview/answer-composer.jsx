
import { LoaderCircle, Sparkles } from "lucide-react";
import { AiErrorNotice } from "@/components/common/ai-error-notice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ANSWER_MAX_LENGTH, ANSWER_MIN_LENGTH } from "./interview-utils";

export function AnswerComposer({
  value,
  onChange,
  onSubmit,
  isSubmitting,
  submitError,
  cooldown,
}) {
  const tooShort = value.trim().length < ANSWER_MIN_LENGTH;

  let buttonLabel = "Submit answer";
  if (isSubmitting) buttonLabel = "Evaluating…";
  else if (cooldown.isCoolingDown) buttonLabel = `Try again in ${cooldown.remaining}s`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your answer</CardTitle>
        <CardDescription>
          Explain your thinking in your own words and add an example where it
          helps.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="interview-answer" className="sr-only">
            Your answer
          </Label>

          <Textarea
            id="interview-answer"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Write your answer here…"
            maxLength={ANSWER_MAX_LENGTH}
            aria-describedby="interview-answer-count"
            disabled={isSubmitting}
            className="max-h-96 min-h-48 resize-y leading-6"
          />

          <p
            id="interview-answer-count"
            className="text-xs tabular-nums text-muted-foreground"
          >
            {value.length}/{ANSWER_MAX_LENGTH} characters
            {tooShort ? ` · at least ${ANSWER_MIN_LENGTH} needed` : ""}
          </p>
        </div>

        {isSubmitting ? (
          <p
            role="status"
            aria-live="polite"
            className="text-sm leading-6 text-muted-foreground"
          >
            Guidio AI is scoring your answer and getting the next step ready.
            This can take a little while, so please keep this page open.
          </p>
        ) : null}

        {submitError ? (
          <AiErrorNotice
            error={submitError}
            onRetry={onSubmit}
            cooldownSeconds={cooldown.remaining}
          />
        ) : null}

        <Button
          type="button"
          size="lg"
          onClick={onSubmit}
          disabled={tooShort || isSubmitting || cooldown.isCoolingDown}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" />
          ) : (
            <Sparkles aria-hidden="true" />
          )}
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
}
