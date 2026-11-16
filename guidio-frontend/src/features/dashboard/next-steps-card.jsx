import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getNextSteps } from "@/features/dashboard/dashboard-utils";

/**
 * A short checklist based on what the student has already done.
 * It is rule-based, not AI-generated, and says so.
 */
export function NextStepsCard({ dashboard }) {
  const steps = getNextSteps(dashboard);

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Recommended next steps</CardTitle>
        <CardDescription>
          Based on your activity so far. This is a checklist, not AI advice.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {steps.length > 0 ? (
          <ul className="space-y-2">
            {steps.map(({ id, title, description, href, icon: Icon }) => (
              <li key={id}>
                <Link
                  to={href}
                  className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted group-hover:bg-background">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {title}
                    </span>
                    <span className="block text-xs leading-5 text-muted-foreground">
                      {description}
                    </span>
                  </span>

                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-start gap-3 rounded-lg border border-dashed p-4">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-success"
            />
            <p className="text-sm leading-6 text-muted-foreground">
              You have covered the basics. Keep practising with mock interviews
              and re-run your skill gap analysis as you learn.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}