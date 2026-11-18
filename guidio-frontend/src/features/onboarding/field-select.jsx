import { FIELD_OPTIONS } from "@/features/onboarding/field-data";
import { cn } from "@/lib/utils";

/**
 * Field-of-study picker. A native select keeps keyboard, screen reader and
 * mobile behaviour correct without extra code.
 * `FormField` passes id and the aria-* props through `...props`.
 */
export function FieldSelect({ value, onChange, disabled = false, className, ...props }) {
  return (
    <select
      {...props}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-field bg-background px-2.5 text-base text-foreground outline-none transition-colors",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
    >
      <option value="">Select a field</option>
      {FIELD_OPTIONS.map((field) => (
        <option key={field.id} value={field.id}>
          {field.label}
        </option>
      ))}
    </select>
  );
}