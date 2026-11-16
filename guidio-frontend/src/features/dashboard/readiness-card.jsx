import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { clampPercent, getReadinessLabel } from "@/features/dashboard/dashboard-utils";

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Circular score. `score` is a number from 0 to 100, or null when there
 * is not enough real data to calculate one.
 */
export function ReadinessCard({ score }) {
  const hasScore = typeof score === "number";
  const value = hasScore ? clampPercent(score) : 0;
  const offset = CIRCUMFERENCE * (1 - value / 100);

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Career readiness</CardTitle>
        <CardDescription>
          Calculated from your profile, latest skill match and interview scores.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4 text-center">
        <div
          role="img"
          aria-label={
            hasScore
              ? `Career readiness score: ${value} out of 100`
              : "Career readiness score not available yet"
          }
          className="relative size-32 shrink-0"
        >
          <svg viewBox="0 0 120 120" className="size-full -rotate-90">
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              strokeWidth="10"
              className="stroke-muted"
            />

            {hasScore ? (
              <circle
                cx="60"
                cy="60"
                r={RADIUS}
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={offset}
                className="stroke-foreground transition-[stroke-dashoffset] duration-700"
              />
            ) : null}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={
                hasScore
                  ? "text-3xl font-semibold tabular-nums"
                  : "text-3xl font-semibold text-muted-foreground"
              }
            >
              {hasScore ? value : "—"}
            </span>

            {hasScore ? (
              <span className="text-xs text-muted-foreground">out of 100</span>
            ) : null}
          </div>
        </div>

        {hasScore ? (
          <div className="space-y-1">
            <p className="text-sm font-medium">{getReadinessLabel(value)}</p>
            <p className="text-xs leading-5 text-muted-foreground">
              Only the parts you have completed are counted. Run a skill gap
              analysis and finish a mock interview to make it more complete.
            </p>
          </div>
        ) : (
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">
            Complete your profile, run a skill gap analysis or finish a mock
            interview to get your first readiness score.
          </p>
        )}
      </CardContent>
    </Card>
  );
}