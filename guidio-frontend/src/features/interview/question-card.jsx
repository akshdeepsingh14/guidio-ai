import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function QuestionCard({ number, total, question }) {
  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Question {number} of {total}
          </p>

          {question?.questionType ? (
            <Badge variant="secondary">{question.questionType}</Badge>
          ) : null}
        </div>

        <h2 className="break-words text-lg font-semibold leading-7 sm:text-xl">
          {question?.question}
        </h2>
      </CardContent>
    </Card>
  );
}