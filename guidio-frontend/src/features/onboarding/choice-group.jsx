import { cn } from "@/lib/utils";

/**
 * Single-choice answer shown as large tappable cards.
 * Built on native radio inputs, so keyboard and screen reader support
 * works without extra code (arrow keys move between options).
 *
 * `options` is an array of { value, label, description? }.
 */
export function ChoiceGroup({
  name,
  value,
  onChange,
  options,
  disabled = false,
  className,
  ...groupProps
}) {
  return (
    <div
      role="radiogroup"
      className={cn("grid gap-2 sm:grid-cols-2", className)}
      {...groupProps}
    >
      {options.map((option) => (
        <label key={option.value} className="relative block">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            disabled={disabled}
            onChange={() => onChange(option.value)}
            className="peer sr-only"
          />
          <span
            className={cn(
              "flex h-full min-h-11 cursor-pointer flex-col justify-center rounded-lg border border-field bg-background px-3.5 py-2.5 text-sm transition-colors",
              "hover:bg-muted",
              "peer-checked:border-foreground peer-checked:bg-muted peer-checked:ring-1 peer-checked:ring-foreground",
              "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
            )}
          >
            <span className="font-medium">{option.label}</span>
            {option.description ? (
              <span className="text-xs text-muted-foreground">
                {option.description}
              </span>
            ) : null}
          </span>
        </label>
      ))}
    </div>
  );
}