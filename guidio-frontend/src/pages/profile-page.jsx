import { Link } from "react-router";
import { Settings } from "lucide-react";
import { ErrorState } from "@/components/common/error-state";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";
import { ProfileEditor } from "@/features/profile/profile-editor";
import { useProfile } from "@/features/profile/use-profile";
import { cn } from "@/lib/utils";

function ProfileSkeleton() {
  return (
    <div role="status" aria-busy="true" className="space-y-6">
      <span className="sr-only">Loading your profile</span>

      <Card className="gap-4">
        <div className="flex items-center gap-4 px-(--card-spacing)">
          <Skeleton className="size-14 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-56 max-w-full" />
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-6">
          <Skeleton className="h-56 w-full rounded-xl" />
          <Skeleton className="h-80 w-full rounded-xl" />
        </div>
        <Skeleton className="h-72 w-full rounded-xl" />
      </div>
    </div>
  );
}

function ProfilePage() {
  const { status, profile, error, reload, save } = useProfile();

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Student profile"
        description="Keep your education, skills and career goals up to date for personalised guidance."
        actions={
          <Link
            to="/settings"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            <Settings aria-hidden="true" />
            Settings
          </Link>
        }
      />

      {status === "loading" ? <ProfileSkeleton /> : null}

      {status === "error" ? (
        <ErrorState
          title="Unable to load your profile"
          error={error}
          onRetry={reload}
        />
      ) : null}

      {status === "ready" ? (
        <ProfileEditor initialProfile={profile} onSave={save} />
      ) : null}
    </div>
  );
}

export default ProfilePage;