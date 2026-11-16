import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

function Detail({ label, value }) {
  const hasValue = value !== null && value !== undefined && value !== "";

  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "min-w-0 truncate text-right font-medium",
          !hasValue && "font-normal text-muted-foreground"
        )}
      >
        {hasValue ? value : "Not added"}
      </dd>
    </div>
  );
}

/** `profile` is the normalised profile object from normalizeDashboard(). */
export function ProfileCompletionCard({ profile }) {
  const isComplete = profile.completion >= 100;

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Profile completion</CardTitle>
        <CardDescription>
          A complete profile helps Guidio AI personalise your guidance.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-3xl font-semibold tabular-nums">
              {profile.completion}%
            </span>
            <span className="text-xs text-muted-foreground">
              {isComplete ? "All details added" : "Some details are missing"}
            </span>
          </div>

          <Progress value={profile.completion} aria-label="Profile completion" />
        </div>

        <dl className="space-y-2 text-sm">
          <Detail label="Target role" value={profile.targetRole} />
          <Detail label="Education" value={profile.education} />
          <Detail label="Degree" value={profile.degree} />
          <Detail label="Experience" value={profile.experienceLevel} />
          <Detail
            label="Skills"
            value={profile.skillsCount > 0 ? `${profile.skillsCount} added` : null}
          />
          <Detail
            label="Interests"
            value={
              profile.interestsCount > 0 ? `${profile.interestsCount} added` : null
            }
          />
        </dl>

        <Link
          to={isComplete ? "/profile" : "/onboarding"}
          className={cn(
            buttonVariants({
              variant: isComplete ? "outline" : "default",
              size: "lg",
            }),
            "w-full"
          )}
        >
          {isComplete ? "Edit profile" : "Complete profile"}
          <ArrowRight aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}