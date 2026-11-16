import { useClerk, useUser } from "@clerk/react";
import { ExternalLink, UserRound } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/features/dashboard/dashboard-utils";
import { cn } from "@/lib/utils";

function Row({ label, children }) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="min-w-0 break-words font-medium sm:text-right">
        {children}
      </dd>
    </div>
  );
}

/** Account details read from Clerk. Nothing here is stored by Guidio AI. */
export function AccountCard() {
  const { user, isLoaded } = useUser();
  const { openUserProfile } = useClerk();

  const name = user?.fullName || user?.firstName || user?.username || "";
  const email = user?.primaryEmailAddress?.emailAddress || "";
  const isVerified = user?.primaryEmailAddress?.verification?.status === "verified";
  const memberSince = user?.createdAt ? formatDate(user.createdAt) : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserRound aria-hidden="true" className="size-4 text-muted-foreground" />
          Account
        </CardTitle>
        <CardDescription>
          Your sign-in details. They are managed by Clerk.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {!isLoaded ? (
          <div role="status" aria-busy="true" className="space-y-3">
            <span className="sr-only">Loading account details</span>
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        ) : (
          <dl className="divide-y text-sm">
            <Row label="Name">{name || "Not added"}</Row>

            <Row label="Email">
              <span className="inline-flex flex-wrap items-center gap-2 sm:justify-end">
                {email || "Not available"}
                {email ? (
                  <Badge variant={isVerified ? "secondary" : "outline"}>
                    {isVerified ? "Verified" : "Not verified"}
                  </Badge>
                ) : null}
              </span>
            </Row>

            <Row label="Member since">{memberSince || "Not available"}</Row>
          </dl>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            to="/profile"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Edit name and student details
          </Link>

          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => openUserProfile()}
            disabled={!isLoaded}
          >
            <ExternalLink aria-hidden="true" />
            Manage account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}