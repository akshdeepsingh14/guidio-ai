import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * Label + hint + error wrapper for one form control.
 *
 * `children` is a function that receives the props the control needs
 * (id, aria-invalid, aria-describedby and, for grouped controls,
 * aria-labelledby). Spread them onto the control:
 *
 *   <FormField name="college" label="College" error={errors.college}>
 *     {(control) => <Input {...control} value={...} onChange={...} />}
 *   </FormField>
 *
 * Use `group` for controls that are not a single input (radio cards,
 * chip lists).
 */
export function FormField({
  name,
  label,
  optional = false,
  hint,
  error,
  group = false,
  className,
  children,
}) {
  const id = `ob-${name}`;
  const labelId = `${id}-label`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  const control = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    ...(group ? { "aria-labelledby": labelId } : {}),
  };

  const labelContent = (
    <>
      {label}
      {optional ? (
        <span className="font-normal text-muted-foreground">(optional)</span>
      ) : null}
    </>
  );

  return (
    <div
      data-invalid={error ? "true" : undefined}
      className={cn("space-y-2", className)}
    >
      {group ? (
        <p id={labelId} className="flex items-center gap-2 text-sm font-medium leading-none">
          {labelContent}
        </p>
      ) : (
        <Label htmlFor={id}>{labelContent}</Label>
      )}

      {hint ? (
        <p id={hintId} className="text-xs leading-5 text-muted-foreground">
          {hint}
        </p>
      ) : null}

      {children(control)}

      {error ? (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}