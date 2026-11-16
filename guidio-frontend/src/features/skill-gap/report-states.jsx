import { LoaderCircle, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AnalyzingState() {
  return (
    <Card>
      <CardContent
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-3 py-16 text-center"
      >
        <LoaderCircle
          aria-hidden="true"
          className="size-7 animate-spin text-muted-foreground"
        />
        <h2 className="text-lg font-semibold">Analyzing your skill gap</h2>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          Guidio AI is comparing your saved skills with your target role. This
          can take a little while, so please keep this page open.
        </p>
      </CardContent>
    </Card>
  );
}

export function NoReportState({ canAnalyze }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
        <span
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-full border bg-background"
        >
          <TrendingUp className="size-5" />
        </span>

        <h2 className="text-lg font-semibold">No analysis yet</h2>

        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          {canAnalyze
            ? "Run your first analysis to see your skill match, missing skills, a learning plan and project ideas for your target role."
            : "Add a target role and at least one skill to your profile first. Then you can run your first analysis."}
        </p>
      </CardContent>
    </Card>
  );
}