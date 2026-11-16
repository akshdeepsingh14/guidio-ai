import { ChevronRight, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ScoreBadge } from "./score-bar";
import { formatDate } from "./interview-utils";

export function InterviewHistory({ interviews, onOpen, disabled }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History aria-hidden="true" className="size-4" />
          Interview history
        </CardTitle>
        <CardDescription>
          Review finished interviews or reopen one in progress.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {interviews.length === 0 ? (
          <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
            No interviews yet. Your finished interviews will appear here.
          </p>
        ) : (
          <ul className="max-h-[32rem] space-y-1.5 overflow-y-auto pr-1">
            {interviews.map((item) => {
              const isCompleted = item.status === "COMPLETED";

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onOpen(item.id)}
                    disabled={disabled}
                    className="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-accent/60 disabled:opacity-60"
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
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}