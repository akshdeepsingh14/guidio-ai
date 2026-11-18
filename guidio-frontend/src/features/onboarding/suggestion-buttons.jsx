/**
 * Small tappable suggestions shown under a text input.
 * Used by onboarding and the profile editor.
 */
export function SuggestionButtons({ options, current, onPick, disabled }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {options.map((option) => {
        const isActive = current.trim().toLowerCase() === option.toLowerCase();

        return (
          <li key={option}>
            <button
              type="button"
              onClick={() => onPick(option)}
              disabled={disabled}
              aria-pressed={isActive}
              className="inline-flex items-center rounded-md border px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground aria-pressed:border-foreground aria-pressed:text-foreground"
            >
              {option}
            </button>
          </li>
        );
      })}
    </ul>
  );
}