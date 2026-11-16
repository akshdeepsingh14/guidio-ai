import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Shown when an interview is still "in progress" but has no open question.
 * The server saves each answer before the AI prepares the next question, so
 * if the AI fails in between (for example at its free limit) the interview
 * cannot continue from the website. The saved answers can still be reviewed.
 */
export function StalledState({ hasAnswers, onNew }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
        <span
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-full bg-warning/10 text-warning"
        >
          <TriangleAlert className="size-5" />
        </span>

        <h2 className="text-lg font-semibold">This interview cannot continue</h2>

        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          {hasAnswers
            ? "Your answers were saved, but the next step could not be prepared. This can happen when the free AI limit is reached. Select a numbered question above to review your feedback, or start a new interview."
            : "The first question could not be prepared, so nothing was saved for this interview. This can happen when the free AI limit is reached. Please start a new interview."}
        </p>

        <Button type="button" onClick={onNew}>
          Start a new interview
        </Button>
      </CardContent>
    </Card>
  );
}