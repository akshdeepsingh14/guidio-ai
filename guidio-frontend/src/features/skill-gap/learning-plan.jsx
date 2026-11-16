import { Flag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { asArray } from "./skill-gap-utils";

export function LearningPlan({ plan }) {
  const phases = asArray(plan);

  if (phases.length === 0) {
    return (
      <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
        This report has no learning plan.
      </p>
    );
  }

  return (
    <ol className="space-y-4">
      {phases.map((phase, index) => (
        <li key={`${phase.phase}-${index}`} className="flex gap-3 sm:gap-4">
          <div className="flex flex-col items-center">
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-medium tabular-nums"
            >
              {index + 1}
            </span>
            {index < phases.length - 1 ? (
              <span aria-hidden="true" className="mt-1 w-px flex-1 bg-border" />
            ) : null}
          </div>

          <div className="min-w-0 flex-1 space-y-3 rounded-xl border bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="break-words text-sm font-semibold">{phase.phase}</h3>
              <Badge variant="outline">{phase.duration}</Badge>
            </div>

            <p className="break-words text-sm leading-6 text-muted-foreground">
              {phase.focus}
            </p>

            <ul className="flex flex-wrap gap-1.5">
              {asArray(phase.skills).map((skill) => (
                <li key={skill}>
                  <Badge variant="secondary" className="h-auto whitespace-normal py-0.5">
                    {skill}
                  </Badge>
                </li>
              ))}
            </ul>

            <p className="flex gap-2 border-t pt-3 text-sm leading-6">
              <Flag
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-muted-foreground"
              />
              <span className="min-w-0 break-words">
                <span className="font-medium">Milestone: </span>
                {phase.milestone}
              </span>
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}