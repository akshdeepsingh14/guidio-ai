
import { Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Honest information about AI usage. It never shows request counts or a
 * "remaining" number, because the backend does not provide real usage data.
 *
 * `model` is shown only if a caller passes it (the backend does not expose
 * the model name yet, so most callers will leave it out).
 */
export function AiUsageNotice({ variant = "inline", model, className }) {
  if (variant === "inline") {
    return (
      <p
        className={cn(
          "flex items-start gap-1.5 text-xs leading-5 text-muted-foreground",
          className
        )}
      >
        <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
        <span>
          Guidio AI uses free AI services. Usage limits may apply, and
          availability depends on the current service quotas. Always verify
          important information.
        </span>
      </p>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>AI usage</CardTitle>
        <CardDescription>
          How the AI features of Guidio AI are powered.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <dt className="text-muted-foreground">Provider</dt>
            <dd className="font-medium">Free AI services</dd>
          </div>

          <div className="space-y-1">
            <dt className="text-muted-foreground">Plan</dt>
            <dd>
              <Badge variant="secondary">Free tier</Badge>
            </dd>
          </div>

          {model ? (
            <div className="space-y-1">
              <dt className="text-muted-foreground">Model</dt>
              <dd className="font-medium">{model}</dd>
            </div>
          ) : null}
        </dl>

        <ul className="list-disc space-y-1.5 pl-5 leading-6 text-muted-foreground">
          <li>
            Free AI services may have request quotas and rate limits.
            Availability is not guaranteed and depends on the current
            service limits.
          </li>
          <li>
            Live usage numbers are not available, so none are shown here.
          </li>
          <li>
            If a usage limit is reached, you will see a message and can try
            again shortly. What you typed is kept.
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
