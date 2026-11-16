import { useUser } from "@clerk/react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

/** Top card: who the student is and how complete the saved profile is. */
export function ProfileSummary({ savedForm, completion }) {
  const { user } = useUser();

  const name =
    user?.fullName || user?.firstName || user?.username || "Student";
  const email = user?.primaryEmailAddress?.emailAddress || "";
  const initial = name.trim().charAt(0).toUpperCase() || "S";

  const subtitle = [savedForm.degree, savedForm.college]
    .filter(Boolean)
    .join(" · ");

  return (
    <Card>
      <CardContent className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-4">
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt=""
              width={56}
              height={56}
              className="size-14 shrink-0 rounded-full border object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex size-14 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-medium"
            >
              {initial}
            </span>
          )}

          <div className="min-w-0 space-y-0.5">
            <p className="truncate text-lg font-semibold tracking-tight">
              {name}
            </p>
            {email ? (
              <p className="truncate text-sm text-muted-foreground">{email}</p>
            ) : null}
            <p className="truncate text-sm text-muted-foreground">
              {savedForm.targetRole
                ? `Preparing for ${savedForm.targetRole}`
                : "No target role set yet"}
              {subtitle ? ` · ${subtitle}` : ""}
            </p>
          </div>
        </div>

        <div className="w-full space-y-2 sm:ml-auto sm:max-w-xs">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-sm font-medium">Profile completion</span>
            <span className="text-2xl font-semibold tabular-nums">
              {completion.percent}%
            </span>
          </div>

          <Progress
            value={completion.percent}
            aria-label="Profile completion"
          />

          <p className="text-xs text-muted-foreground">
            {completion.done} of {completion.total} details added
          </p>
        </div>
      </CardContent>
    </Card>
  );
}