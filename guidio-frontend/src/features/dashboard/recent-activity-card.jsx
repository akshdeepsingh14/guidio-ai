import { CalendarCheck2 } from "lucide-react";
import { Link } from "react-router";
import { EmptyState } from "@/components/common/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatRelativeTime,
  getActivityIcon,
  getSafeHref,
} from "@/features/dashboard/dashboard-utils";

/** `activities` is an array from the dashboard API (newest first, max 5). */
export function RecentActivityCard({ activities }) {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>What you did most recently on Guidio AI.</CardDescription>
      </CardHeader>

      <CardContent>
        {activities.length > 0 ? (
          <ul className="space-y-1">
            {activities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              const time = formatRelativeTime(activity.createdAt);

              return (
                <li key={`${activity.type}-${activity.createdAt}`}>
                  <Link
                    to={getSafeHref(activity.href)}
                    className="-mx-2 flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Icon aria-hidden="true" className="size-4" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {activity.title}
                      </span>
                      <span className="block truncate text-xs leading-5 text-muted-foreground">
                        {activity.description}
                      </span>
                    </span>

                    {time ? (
                      <time
                        dateTime={new Date(activity.createdAt).toISOString()}
                        className="shrink-0 pt-0.5 text-xs text-muted-foreground"
                      >
                        {time}
                      </time>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyState
            icon={CalendarCheck2}
            title="No activity yet"
            description="Your profile updates, AI conversations, reports and interviews will appear here."
            action={
              <Link to="/assistant" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Ask the AI Assistant
              </Link>
            }
          />
        )}
      </CardContent>
    </Card>
  );
}