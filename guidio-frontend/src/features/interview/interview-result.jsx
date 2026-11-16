import {
  CheckCircle2,
  ChevronDown,
  Lightbulb,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ScoreBadge, ScoreBar } from "./score-bar";
import {
  asArray,
  clampScore,
  formatDate,
  getAverageScores,
  getScoreTone,
} from "./interview-utils";

function PointCard({ title, description, icon: Icon, iconClass, items, emptyText }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon aria-hidden="true" className={cn("size-4", iconClass)} />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        {items.length === 0 ? (
          <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
            {emptyText}
          </p>
        ) : (
          <ul className="space-y-2.5">
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
      </CardContent>
    </Card>
  );
}

function ImprovementPlan({ plan, onRefresh, isRefreshing, refreshError }) {
  if (plan) {
    const actionItems = asArray(plan.actionItems);

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles aria-hidden="true" className="size-4" />
            Your improvement plan
          </CardTitle>
          <CardDescription>{plan.title}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
            {plan.summary}
          </p>

          {actionItems.length > 0 ? (
            <ol className="space-y-2.5">
              {actionItems.map((item, index) => (
                <li key={`${index}-${item}`} className="flex gap-3 text-sm leading-6">
                  <span
                    aria-hidden="true"
                    className="flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium tabular-nums"
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0 break-words pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
          ) : null}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles aria-hidden="true" className="size-4" />
          Your improvement plan
        </CardTitle>
        <CardDescription>
          Prepared in the background after your interview.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm leading-6 text-muted-foreground">
          Your plan is not ready yet. It can take a minute. If it does not
          appear, the AI may have reached its free limit, so you can check again
          later.
        </p>

        {refreshError ? (
          <p role="alert" className="text-sm text-destructive">
            {refreshError.message}
          </p>
        ) : null}

        <Button
          type="button"
          variant="outline"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw aria-hidden="true" className={cn(isRefreshing && "animate-spin")} />
          {isRefreshing ? "Checking…" : "Check for my plan"}
        </Button>
      </CardContent>
    </Card>
  );
}

export function InterviewResult({
  interview,
  onNew,
  onRefresh,
  isRefreshing,
  refreshError,
}) {
  const overall = clampScore(interview.overallScore);
  const tone = getScoreTone(overall);
  const averages = getAverageScores(interview);
  const answered = asArray(interview.questions).filter((question) => question.answer);
  const dateLabel = formatDate(interview.completedAt || interview.createdAt);

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-2">
              <Badge variant="secondary">
                <Trophy aria-hidden="true" />
                Interview complete
              </Badge>

              <h2 className="break-words text-xl font-semibold sm:text-2xl">
                {interview.targetRole} interview
              </h2>

              <p className="text-sm text-muted-foreground">
                {interview.interviewType} · {interview.difficulty}
                {dateLabel ? ` · ${dateLabel}` : ""}
              </p>
            </div>

            <div className="shrink-0 sm:text-right">
              <p className={cn("text-5xl font-semibold tabular-nums", tone.text)}>
                {overall}
              </p>
              <p className="text-xs text-muted-foreground">overall score out of 100</p>
            </div>
          </div>

          {interview.summary ? (
            <p className="max-w-3xl whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
              {interview.summary}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={onNew}>
              <RotateCcw aria-hidden="true" />
              Practice again
            </Button>

            <Link
              to="/dashboard"
              className={buttonVariants({ variant: "outline" })}
            >
              Back to dashboard
            </Link>
          </div>
        </CardContent>
      </Card>

      {averages.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Score breakdown</CardTitle>
            <CardDescription>
              The average of each score across your answers.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {averages.map(({ key, label, value }) => (
                <ScoreBar key={key} label={label} value={value} />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-2">
        <PointCard
          title="Strengths"
          description="What worked well across the interview."
          icon={CheckCircle2}
          iconClass="text-success"
          items={asArray(interview.strengths)}
          emptyText="Open the question review below to see the strengths of each answer."
        />

        <PointCard
          title="Priority improvements"
          description="Focus on these before your next practice."
          icon={Lightbulb}
          iconClass="text-warning"
          items={asArray(interview.improvements)}
          emptyText="Open the question review below to see what to improve in each answer."
        />
      </div>

      <ImprovementPlan
        plan={interview.improvementSummary}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
        refreshError={refreshError}
      />

      <Card>
        <CardHeader>
          <CardTitle>Question review</CardTitle>
          <CardDescription>
            Open a question to see your answer and the feedback.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          {answered.length === 0 ? (
            <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
              No answered questions were saved for this interview.
            </p>
          ) : (
            answered.map((question, index) => (
              <details key={question.id} className="group rounded-lg border">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 p-3.5 [&::-webkit-details-marker]:hidden">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Question {question.order ?? index + 1}
                    </p>
                    <p className="mt-1 break-words text-sm font-medium leading-6">
                      {question.question}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <ScoreBadge score={question.answer.overallScore} />
                    <ChevronDown
                      aria-hidden="true"
                      className="size-4 text-muted-foreground transition-transform group-open:rotate-180"
                    />
                  </div>
                </summary>

                <div className="space-y-3 border-t p-3.5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Your answer
                    </p>
                    <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-6">
                      {question.answer.answerText}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Feedback
                    </p>
                    <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
                      {question.answer.feedback}
                    </p>
                  </div>
                </div>
              </details>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}