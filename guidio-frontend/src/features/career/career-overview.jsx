import { CircleCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { asArray } from "./career-utils";
import { ReadinessGauge } from "./readiness-gauge";

export function CareerOverview({ plan }) {
  const alternativeRoles = asArray(plan.alternativeRoles);
  const strengths = asArray(plan.strengths);
  const prioritySkills = asArray(plan.prioritySkills);

  const showTargetRole =
    plan.targetRole && plan.targetRole !== plan.primaryRole;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex flex-col items-center gap-6 sm:flex-row">
          <ReadinessGauge value={plan.readinessScore} />

          <div className="min-w-0 space-y-3 text-center sm:text-left">
            <div className="space-y-2">
              <Badge variant="outline">Recommended role</Badge>
              <h2 className="break-words text-xl font-semibold tracking-tight sm:text-2xl">
                {plan.primaryRole}
              </h2>
              {showTargetRole ? (
                <p className="break-words text-xs text-muted-foreground">
                  Your saved target role: {plan.targetRole}
                </p>
              ) : null}
            </div>

            <p className="break-words text-sm leading-6 text-muted-foreground">
              {plan.summary}
            </p>

            <p className="text-xs text-muted-foreground">
              The readiness score is an AI estimate based on your profile. It is
              a learning guide, not a hiring prediction.
            </p>
          </div>
        </CardContent>
      </Card>

      {alternativeRoles.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Other suitable roles</CardTitle>
            <CardDescription>
              Roles close to your profile that you could also explore.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="flex flex-wrap gap-2">
              {alternativeRoles.map((role) => (
                <li key={role}>
                  <Badge
                    variant="secondary"
                    className="h-auto whitespace-normal py-1"
                  >
                    {role}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your strengths</CardTitle>
            <CardDescription>
              Skills and qualities you can build on.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {strengths.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                This plan lists no strengths.
              </p>
            ) : (
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
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills to learn</CardTitle>
            <CardDescription>
              The skills this role needs, in the order to learn them.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {prioritySkills.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                This plan lists no skills to learn.
              </p>
            ) : (
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}