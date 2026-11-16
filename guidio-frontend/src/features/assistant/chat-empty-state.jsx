import { ArrowUpRight, Sparkles } from "lucide-react";
import { SUGGESTED_PROMPTS } from "./assistant-utils";

export function ChatEmptyState({ onPick, disabled }) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center py-8 text-center">
      <span
        aria-hidden="true"
        className="flex size-12 items-center justify-center rounded-2xl border bg-background"
      >
        <Sparkles className="size-6" />
      </span>

      <h2 className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">
        What can I help you with?
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Ask about programming, DSA, placements, resumes, interviews or learning
        roadmaps. Pick a suggestion or type your own question.
      </p>

      <div className="mt-8 grid w-full max-w-2xl gap-2.5 text-left sm:grid-cols-2">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPick(prompt)}
            disabled={disabled}
            className="group flex items-start justify-between gap-3 rounded-xl border bg-background p-3.5 text-sm leading-6 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>{prompt}</span>
            <ArrowUpRight
              aria-hidden="true"
              className="mt-1 size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            />
          </button>
        ))}
      </div>
    </div>
  );
}