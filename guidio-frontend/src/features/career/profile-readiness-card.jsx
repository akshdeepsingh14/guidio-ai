import { CircleAlert, CircleCheck } from "lucide-react";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProfileChecks } from "./career-utils";

/**
 * The plan is built by the server from the saved profile, so this checklist
 * shows exactly what the server will read.
 */
export function ProfileReadinessCard({ profile, canGenerate }) {
  const checks = getProfileChecks(profile);
  const doneCount = checks.filter((check) => check.done).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile checklist</CardTitle>
        <CardDescription>
          {doneCount} of {checks.length} ready. The plan is built from your
          saved profile.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <ul className="space-y-2.5">
          {checks.map((check) => {
            const Icon = check.done ? CircleCheck : CircleAlert;

            return (
              <li key={check.key} className="flex items-center gap-2.5 text-sm">
                <Icon
                  aria-hidden="true"
                  className={
                    check.done
                      ? "size-4 shrink-0 text-success"
                      : "size-4 shrink-0 text-warning"
                  }
                />
                <span className="min-w-0 break-words">{check.label}</span>
                <span className="sr-only">
                  {check.done ? "(done)" : "(missing)"}
                </span>
              </li>
            );
          })}
        </ul>

        <Link
          to="/profile"
          className={buttonVariants({
            variant: canGenerate ? "outline" : "default",
            size: "lg",
            className: "w-full",
          })}
        >
          {canGenerate ? "Edit profile" : "Complete your profile"}
        </Link>
      </CardContent>
    </Card>
  );
}