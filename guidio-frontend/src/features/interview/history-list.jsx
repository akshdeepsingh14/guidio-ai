import { useState } from "react";
import { ChevronRight, Mic } from "lucide-react";
import { Link } from "react-router";
import { EmptyState } from "@/components/common/empty-state";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { STATUS_FILTERS, filterInterviews } from "./history-utils";
import { formatDate } from "./interview-utils";
import { ScoreBadge } from "./score-bar";

export function HistoryList({ interviews }) {
  const [filter, setFilter] = useState("ALL");

  if (interviews.length === 0) {
    return (
      <EmptyState
        icon={Mic}
        title="No interviews yet"
        description="Take your first mock interview. Every finished interview is saved here with its score and feedback."
        action={
          <Link to="/mock-interview" className={buttonVariants({ size: "lg" })}>
            Start a mock interview
          </Link>
        }
      />
    );
  }

  const visible = filterInterviews(interviews, filter);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All interviews</CardTitle>

          <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-1.5">
            {STATUS_FILTERS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
                aria-pressed={filter === option.value}
                className={cn(
                  "rounded-full border px-3 py-1 text-sm transition-colors",
                  filter === option.value
                    ? "border-foreground bg-foreground text-background"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {visible.length === 0 ? (
          <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            No interviews match this filter.
          </p>
        ) : (
          <ul className="space-y-2">
            {visible.map((item) => {
              const isCompleted = item.status === "COMPLETED";

              return (
                <li key={item.id}>
                  <Link
                    to={`/interview-history/${encodeURIComponent(item.id)}`}
                    className="flex items-center gap-3 rounded-lg border p-3.5 transition-colors hover:bg-accent/60"
                  >
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex items-start justify-between gap-3">
                        <p className="min-w-0 break-words text-sm font-medium">
                          {item.targetRole}
                        </p>

                        {isCompleted && item.overallScore != null ? (
                          <ScoreBadge score={item.overallScore} />
                        ) : null}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <Badge
                          variant="secondary"
                          className={cn(
                            isCompleted
                              ? "bg-success/10 text-success"
                              : "bg-warning/10 text-warning"
                          )}
                        >
                          {isCompleted ? "Completed" : "In progress"}
                        </Badge>

                        <span className="text-xs text-muted-foreground">
                          {item.interviewType} · {item.difficulty}
                          {formatDate(item.createdAt)
                            ? ` · ${formatDate(item.createdAt)}`
                            : ""}
                        </span>
                      </div>

                      {!isCompleted ? (
                        <p className="text-xs tabular-nums text-muted-foreground">
                          Question {item.currentQuestion} of {item.totalQuestions}
                        </p>
                      ) : null}
                    </div>

                    <ChevronRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted-foreground"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}