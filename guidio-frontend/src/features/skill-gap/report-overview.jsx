import { CircleCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MatchGauge } from "./match-gauge";
import {
  asArray,
  countByPriority,
  PRIORITY_ORDER,
  PRIORITY_STYLES,
} from "./skill-gap-utils";

function PriorityBreakdown({ skills }) {
  const counts = countByPriority(skills);
  const total = PRIORITY_ORDER.reduce((sum, key) => sum + counts[key], 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gaps by priority</CardTitle>
        <CardDescription>
          How the missing skills are split by importance.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {total > 0 ? (
          <div
            role="img"
            aria-label={PRIORITY_ORDER.map(
              (key) => `${counts[key]} ${key} priority`
            ).join(", ")}
            className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted"
          >
            {PRIORITY_ORDER.map((key) =>
              counts[key] > 0 ? (
                <div
                  key={key}
                  className={PRIORITY_STYLES[key].bar}
                  style={{ width: `${(counts[key] / total) * 100}%` }}
                />
              ) : null
            )}
          </div>
        ) : null}

        <dl className="grid grid-cols-3 gap-2 sm:gap-3">
          {PRIORITY_ORDER.map((key) => (
            <div key={key} className="min-w-0 rounded-lg border p-2.5 sm:p-3">
              <dt className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                <span
                  aria-hidden="true"
                  className={`size-2 shrink-0 rounded-full ${PRIORITY_STYLES[key].bar}`}
                />
                <span className="truncate">{key}</span>
              </dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums">
                {counts[key]}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

export function ReportOverview({ report }) {
  const strengths = asArray(report.currentStrengths);
  const missingSkills = asArray(report.missingSkills);
  const prioritySkills = asArray(report.prioritySkills);

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex flex-col items-center gap-6 sm:flex-row">
          <MatchGauge value={report.matchPercentage} />

          <div className="min-w-0 space-y-2 text-center sm:text-left">
            <Badge variant="outline">Target role</Badge>
            <h2 className="break-words text-xl font-semibold tracking-tight sm:text-2xl">
              {report.targetRole}
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {report.summary}
            </p>
            <p className="text-xs text-muted-foreground">
              The match is an AI estimate for learning purposes, not a hiring
              prediction.
            </p>
          </div>
        </CardContent>
      </Card>

      <PriorityBreakdown skills={missingSkills} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current strengths</CardTitle>
            <CardDescription>
              Skills that already support this role.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="space-y-2.5">
              {strengths.map((strength) => (
                <li key={strength} className="flex gap-2.5 text-sm leading-6">
                  <CircleCheck
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-success"
                  />
                  <span className="min-w-0 break-words">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learn these first</CardTitle>
            <CardDescription>
              The most useful skills to start with, in order.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ol className="space-y-2.5">
              {prioritySkills.map((skill, index) => (
                <li key={skill} className="flex gap-3 text-sm leading-6">
                  <span
                    aria-hidden="true"
                    className="flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium tabular-nums"
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0 break-words pt-0.5">{skill}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}