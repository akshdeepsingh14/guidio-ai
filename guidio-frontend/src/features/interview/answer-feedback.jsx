import { ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ScoreBar } from "./score-bar";
import {
  SCORE_DIMENSIONS,
  asArray,
  clampScore,
  getScoreTone,
} from "./interview-utils";

function PointList({ title, icon: Icon, iconClass, items, emptyText }) {
  return (
    <div className="space-y-2.5">
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        <Icon aria-hidden="true" className={cn("size-4", iconClass)} />
        {title}
      </h3>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyText}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={`${index}-${item}`}
              className="break-words text-sm leading-6 text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function AnswerFeedback({ answer, onContinue, continueLabel }) {
  if (!answer) return null;

  const tone = getScoreTone(answer.overallScore);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-lg">Answer feedback</CardTitle>
            <CardDescription>How Guidio AI scored this answer.</CardDescription>
          </div>

          <div className="shrink-0 text-right">
            <p className={cn("text-3xl font-semibold tabular-nums", tone.text)}>
              {clampScore(answer.overallScore)}
              <span className="text-sm font-normal text-muted-foreground">/100</span>
            </p>
            <p className="text-xs text-muted-foreground">Overall</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="rounded-lg border bg-muted/40 p-3.5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Your answer
          </p>
          <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-6">
            {answer.answerText}
          </p>
        </div>

        <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {SCORE_DIMENSIONS.map(({ key, label }) => (
            <ScoreBar key={key} label={label} value={answer[key]} />
          ))}
        </div>

        <div className="space-y-1.5">
          <h3 className="text-sm font-semibold">Feedback</h3>
          <p className="whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
            {answer.feedback}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <PointList
            title="What you did well"
            icon={CheckCircle2}
            iconClass="text-success"
            items={asArray(answer.strengths)}
            emptyText="No strengths were listed for this answer."
          />

          <PointList
            title="Improve next time"
            icon={Lightbulb}
            iconClass="text-warning"
            items={asArray(answer.improvements)}
            emptyText="No improvements were listed for this answer."
          />
        </div>

        {onContinue ? (
          <div className="flex justify-end border-t pt-4">
            <Button type="button" size="lg" onClick={onContinue}>
              {continueLabel}
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}