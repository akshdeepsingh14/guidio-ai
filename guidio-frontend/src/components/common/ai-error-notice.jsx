import { Clock, RefreshCw, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getFriendlyAiError } from "@/lib/ai";
import { cn } from "@/lib/utils";

/**
 * Friendly error for AI requests (rate limit, unavailable, etc.).
 *
 * `cooldownSeconds` comes from useCooldown(). While it is above zero the
 * retry button is disabled, which prevents repeated requests that would
 * hit the same limit.
 */
export function AiErrorNotice({ error, onRetry, cooldownSeconds = 0, className }) {
  if (!error) {
    return null;
  }

  const friendly = getFriendlyAiError(error);
  const Icon = friendly.kind === "rate_limited" ? Clock : TriangleAlert;
  const waiting = cooldownSeconds > 0;

  return (
    <Alert
      variant={friendly.kind === "rate_limited" ? "default" : "destructive"}
      className={cn("items-start", className)}
    >
      <Icon aria-hidden="true" />
      <AlertTitle>{friendly.title}</AlertTitle>

      <AlertDescription className="space-y-3">
        <p>{friendly.message}</p>

        {onRetry ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRetry}
            disabled={waiting}
          >
            <RefreshCw aria-hidden="true" />
            {waiting ? `Try again in ${cooldownSeconds}s` : "Try again"}
          </Button>
        ) : null}
      </AlertDescription>
    </Alert>
  );
}