import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QUICK_ACTIONS } from "@/features/dashboard/dashboard-utils";

export function QuickActionsCard() {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Quick actions</CardTitle>
        <CardDescription>Jump straight into a tool.</CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {QUICK_ACTIONS.map(({ href, title, description, icon: Icon }) => (
            <li key={href}>
              <Link
                to={href}
                className="group flex h-full items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted group-hover:bg-background">
                  <Icon aria-hidden="true" className="size-4" />
                </span>

                <span className="min-w-0">
                  <span className="block text-sm font-medium">{title}</span>
                  <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
                    {description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}