import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function SkeletonWrapper({ className, children }) {
  return (
    <div role="status" aria-busy="true" className={className}>
      <span className="sr-only">Loading…</span>
      {children}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <Card className="gap-3">
      <div className="px-(--card-spacing)">
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="space-y-2 px-(--card-spacing)">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-3.5 w-28" />
      </div>
    </Card>
  );
}

export function CardSkeleton({ lines = 3, className }) {
  return (
    <SkeletonWrapper className={className}>
      <Card className="gap-4">
        <div className="px-(--card-spacing)">
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="space-y-2.5 px-(--card-spacing)">
          {Array.from({ length: lines }, (_, index) => (
            <Skeleton
              key={index}
              className={cn("h-4", index === lines - 1 ? "w-2/3" : "w-full")}
            />
          ))}
        </div>
      </Card>
    </SkeletonWrapper>
  );
}

export function ListSkeleton({ rows = 4, className }) {
  return (
    <SkeletonWrapper className={cn("space-y-3", className)}>
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 rounded-xl border p-3"
        >
          <Skeleton className="size-9 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3.5 w-3/4" />
          </div>
        </div>
      ))}
    </SkeletonWrapper>
  );
}

export function PageSkeleton() {
  return (
    <SkeletonWrapper className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <CardSkeleton lines={4} />
        <CardSkeleton lines={4} />
      </div>
    </SkeletonWrapper>
  );
}