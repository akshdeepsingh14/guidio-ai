import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * Multi-value text input shown as removable chips.
 *
 * - Enter or comma adds the typed text. Leaving the field also adds it,
 *   so text typed before pressing "Next" is never lost.
 * - Pasting "a, b, c" adds three items.
 * - Duplicates are ignored (letter case does not matter).
 * - Tap a suggestion to add it.
 *
 * `value` is an array of strings and `onChange` receives the new array.
 */
export function ChipInput({
  id,
  value,
  onChange,
  placeholder = "Type and press Enter",
  suggestions = [],
  maxItems = 20,
  maxLength = 60,
  disabled = false,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  className,
}) {
  const [draft, setDraft] = useState("");

  const isFull = value.length >= maxItems;
  const selected = new Set(value.map((item) => item.toLowerCase()));
  const visibleSuggestions = suggestions.filter(
    (item) => !selected.has(item.toLowerCase())
  );

  function addItems(rawText) {
    const parts = rawText
      .split(/[,\n]/)
      .map((part) => part.trim().slice(0, maxLength))
      .filter(Boolean);

    if (parts.length === 0) {
      setDraft("");
      return;
    }

    const next = [...value];
    const known = new Set(next.map((item) => item.toLowerCase()));

    for (const part of parts) {
      const key = part.toLowerCase();

      if (next.length >= maxItems) break;
      if (known.has(key)) continue;

      known.add(key);
      next.push(part);
    }

    if (next.length !== value.length) {
      onChange(next);
    }

    setDraft("");
  }

  function removeItem(item) {
    onChange(value.filter((current) => current !== item));
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addItems(draft);
      return;
    }

    if (event.key === "Backspace" && !draft && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div className={cn("space-y-2.5", className)}>
      <div
        className={cn(
          "rounded-lg border border-field bg-transparent p-2 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 dark:bg-input/30",
          ariaInvalid &&
            "border-destructive focus-within:border-destructive focus-within:ring-destructive/20"
        )}
      >
        {value.length > 0 ? (
          <ul className="mb-2 flex flex-wrap gap-1.5">
            {value.map((item) => (
              <li
                key={item}
                className="inline-flex max-w-full items-center gap-1 rounded-md bg-muted py-1 pl-2 pr-1 text-sm"
              >
                <span className="truncate">{item}</span>
                <button
                  type="button"
                  onClick={() => removeItem(item)}
                  disabled={disabled}
                  aria-label={`Remove ${item}`}
                  className="flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
                >
                  <X aria-hidden="true" className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex items-center gap-2">
          <Input
            id={id}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => addItems(draft)}
            placeholder={isFull ? "Limit reached" : placeholder}
            disabled={disabled || isFull}
            autoComplete="off"
            aria-invalid={ariaInvalid}
            aria-describedby={ariaDescribedBy}
            className="h-9 flex-1 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0 dark:bg-transparent"
          />

          <Button
            type="button"
            variant="outline"
            size="icon"
            // Keep focus in the field so the blur handler does not add the text twice.
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => addItems(draft)}
            disabled={disabled || isFull || !draft.trim()}
            aria-label="Add item"
            className="size-9"
          >
            <Plus aria-hidden="true" />
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Press Enter or comma to add · {value.length}/{maxItems}
      </p>

      {visibleSuggestions.length > 0 && !isFull ? (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">Suggestions</p>
          <ul className="flex flex-wrap gap-1.5">
            {visibleSuggestions.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => addItems(item)}
                  disabled={disabled}
                  className="inline-flex items-center gap-1 rounded-md border border-dashed px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-solid hover:bg-muted hover:text-foreground"
                >
                  <Plus aria-hidden="true" className="size-3" />
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}