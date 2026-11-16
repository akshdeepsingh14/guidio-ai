import { Link } from "react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground",
        className
      )}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[60%]">
        <path d="M12 3c.8 5.6 3.4 8.2 9 9-5.6.8-8.2 3.4-9 9-.8-5.6-3.4-8.2-9-9 5.6-.8 8.2-3.4 9-9Z" />
      </svg>
    </span>
  );
}

/**
 * Guidio AI logo. Pass `to={null}` to render it without a link.
 */
export function Logo({ to = "/", showText = true, className, textClassName }) {
  const content = (
    <>
      <LogoMark />
      {showText ? (
        <span
          className={cn(
            "text-base font-semibold tracking-tight text-foreground",
            textClassName
          )}
        >
          Guidio AI
        </span>
      ) : null}
    </>
  );

  if (to === null) {
    return (
      <span className={cn("inline-flex items-center gap-2.5", className)}>
        {content}
      </span>
    );
  }

  return (
    <Link
      to={to}
      aria-label="Guidio AI home"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md transition-opacity hover:opacity-80",
        className
      )}
    >
      {content}
    </Link>
  );
}