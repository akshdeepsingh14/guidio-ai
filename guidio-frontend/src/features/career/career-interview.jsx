import { Lightbulb } from "lucide-react";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { asArray } from "./career-utils";

export function CareerInterview({ plan }) {
  const topics = asArray(plan.interviewTopics);
  const firstSkill = asArray(plan.prioritySkills)[0];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Interview topics</CardTitle>
          <CardDescription>
            Topics to practise for {plan.primaryRole}.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {topics.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              This plan lists no interview topics.
            </p>
          ) : (
            <ol className="space-y-2.5">
              {topics.map((topic, index) => (
                <li key={topic} className="flex gap-3 text-sm leading-6">
                  <span
                    aria-hidden="true"
                    className="flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium tabular-nums"
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0 break-words pt-0.5">{topic}</span>
                </li>
              ))}
            </ol>
          )}

          <Link
            to="/mock-interview"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "w-full",
            })}
          >
            Practise a mock interview
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb aria-hidden="true" className="size-4" />
            Advice for you
          </CardTitle>
          <CardDescription>A practical note on your next steps.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
            {plan.advice}
          </p>

          {firstSkill ? (
            <div className="rounded-lg border bg-muted/40 p-3">
              <p className="text-xs font-medium text-muted-foreground">
                Suggested next action
              </p>
              <p className="mt-1 break-words text-sm leading-6">
                Start with {firstSkill}. Study it a little every day this week
                and build a small project with it.
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}