import { RefreshCw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Page-level or section-level error with an optional retry button.
 * Pass either `error` (an Error/ApiError) or an explicit `message`.
 */
export function ErrorState({
  title = "Something went wrong",
  error,
  message,
  onRetry,
  retryLabel = "Try again",
  className,
}) {
  const text =
    message || error?.message || "Unable to load this content. Please try again.";

  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border px-6 py-12 text-center",
        className
      )}
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlert aria-hidden="true" className="size-5" />
      </span>

      <div className="space-y-1">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground">
          {text}
        </p>
      </div>

      {onRetry ? (
        <Button type="button" variant="outline" onClick={onRetry}>
          <RefreshCw aria-hidden="true" />
          {retryLabel}
        </Button>
      ) : null}
    </div>
  );
}