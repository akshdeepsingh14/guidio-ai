import { History } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { clampPercent, formatDate } from "./career-utils";

export function PlanHistory({ plans, activeId, disabled, onSelect }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History aria-hidden="true" className="size-4" />
          Saved plans
        </CardTitle>
        <CardDescription>
          Every plan is saved so you can compare over time.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {plans.length === 0 ? (
          <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
            No saved plans yet.
          </p>
        ) : (
          <ul className="space-y-1.5">
            {plans.map((plan) => {
              const isActive = plan.id === activeId;
              const percent = clampPercent(plan.readinessScore);

              return (
                <li key={plan.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(plan.id)}
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
                        {plan.primaryRole}
                      </p>
                      <span className="shrink-0 text-sm font-semibold tabular-nums">
                        {percent}/100
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
                      {formatDate(plan.createdAt)}
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