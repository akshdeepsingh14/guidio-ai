import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Shows one real number. If `value` is null or undefined it shows an
 * em dash, never an invented figure.
 */
export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  loading = false,
  className,
}) {
  const hasValue = value !== null && value !== undefined && value !== "";

  return (
    <Card className={cn("gap-3", className)}>
      <div className="flex items-center justify-between gap-3 px-(--card-spacing)">
        <p className="truncate text-sm text-muted-foreground">{label}</p>

        {Icon ? (
          <Icon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
        ) : null}
      </div>

      <div className="space-y-1 px-(--card-spacing)">
        {loading ? (
          <>
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-3.5 w-28" />
          </>
        ) : (
          <>
            <p
              className={cn(
                "text-3xl font-semibold tracking-tight tabular-nums",
                !hasValue && "text-muted-foreground"
              )}
            >
              {hasValue ? value : "—"}
            </p>

            {hint ? (
              <p className="text-xs leading-5 text-muted-foreground">{hint}</p>
            ) : null}
          </>
        )}
      </div>
    </Card>
  );
}