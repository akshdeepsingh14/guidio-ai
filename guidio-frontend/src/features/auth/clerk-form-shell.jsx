import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/ui/skeleton";

const LOAD_TIMEOUT_MS = 12000;

function FormSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="space-y-6 rounded-xl border bg-card p-6 sm:p-8"
    >
      <span className="sr-only">Loading the form</span>

      <div className="space-y-2">
        <Skeleton className="mx-auto h-6 w-40" />
        <Skeleton className="mx-auto h-4 w-56 max-w-full" />
      </div>

      <Skeleton className="h-10 w-full" />

      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      <Skeleton className="h-10 w-full" />
    </div>
  );
}

/**
 * Wraps a Clerk form with the states Clerk does not give us:
 *  - loading: a skeleton while Clerk starts
 *  - error: a retry message if Clerk never loads (network blocked, offline)
 *  - signed in: skip the form and go straight to the destination
 */
export function ClerkFormShell({ redirectTo, children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      return undefined;
    }

    const timer = window.setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timer);
  }, [isLoaded]);

  if (isLoaded && isSignedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  if (isLoaded) {
    return children;
  }

  if (timedOut) {
    return (
      <ErrorState
        title="Unable to load this page"
        message="The sign-in service did not respond. Check your internet connection and try again."
        onRetry={() => window.location.reload()}
        retryLabel="Reload"
      />
    );
  }

  return <FormSkeleton />;
}