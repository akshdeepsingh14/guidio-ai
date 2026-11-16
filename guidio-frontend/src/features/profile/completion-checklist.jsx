import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Which of the 8 profile details are saved. Uses the saved data only. */
export function CompletionChecklist({ completion }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What is saved</CardTitle>
        <CardDescription>
          Guidio AI uses these details to personalise your guidance.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="space-y-2.5">
          {completion.items.map((item) => (
            <li key={item.id} className="flex items-center gap-2.5 text-sm">
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border",
                  item.done
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "text-transparent"
                )}
              >
                <Check className="size-3" />
              </span>

              <span className={cn(!item.done && "text-muted-foreground")}>
                {item.label}
              </span>

              <span className="sr-only">
                {item.done ? "(saved)" : "(not added yet)"}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}