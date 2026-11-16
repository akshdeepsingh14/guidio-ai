import { Compass, LoaderCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function GeneratingState() {
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
        <h2 className="text-lg font-semibold">Building your career plan</h2>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          Guidio AI is reading your saved profile and writing a roadmap. This
          can take a little while, so please keep this page open.
        </p>
      </CardContent>
    </Card>
  );
}

export function NoPlanState({ canGenerate }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
        <span
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-full border bg-background"
        >
          <Compass className="size-5" />
        </span>

        <h2 className="text-lg font-semibold">No career plan yet</h2>

        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          {canGenerate
            ? "Generate your first plan to see a recommended role, the skills to learn, a step-by-step roadmap, project ideas and interview topics."
            : "Complete the items on the right in your profile first. Then you can generate your first career plan."}
        </p>
      </CardContent>
    </Card>
  );
}