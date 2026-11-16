import { History } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatDate } from "./skill-gap-utils";

export function ReportHistory({ reports, activeId, disabled, onSelect }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History aria-hidden="true" className="size-4" />
          Saved reports
        </CardTitle>
        <CardDescription>
          Every analysis is saved so you can compare over time.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {reports.length === 0 ? (
          <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
            No saved reports yet.
          </p>
        ) : (
          <ul className="space-y-1.5">
            {reports.map((report) => {
              const isActive = report.id === activeId;
              const percent = Math.max(
                0,
                Math.min(100, Number(report.matchPercentage) || 0)
              );

              return (
                <li key={report.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(report.id)}
                    disabled={disabled}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "w-full rounded-lg border p-3 text-left transition-colors disabled:opacity-60",
                      isActive
                        ? "border-foreground/30 bg-accent"
                        : "hover:bg-accent/60"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="min-w-0 break-words text-sm font-medium">
                        {report.targetRole}
                      </p>
                      <span className="shrink-0 text-sm font-semibold tabular-nums">
                        {percent}%
                      </span>
                    </div>

                    <div
                      aria-hidden="true"
                      className="mt-2 h-1 overflow-hidden rounded-full bg-muted"
                    >
                      <div
                        className="h-full rounded-full bg-foreground"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <p className="mt-2 text-xs text-muted-foreground">
                      {formatDate(report.createdAt)}
                    </p>
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