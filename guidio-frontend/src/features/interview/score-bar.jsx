import { cn } from "@/lib/utils";
import { clampScore, getScoreTone } from "./interview-utils";

export function ScoreBar({ label, value }) {
  const score = clampScore(value);
  const tone = getScoreTone(score);

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums">{score}</span>
      </div>

      <div
        role="progressbar"
        aria-label={`${label} score`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score}
        className="h-1.5 overflow-hidden rounded-full bg-muted"
      >
        <div
          className={cn("h-full rounded-full", tone.bar)}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function ScoreBadge({ score, className }) {
  const value = clampScore(score);
  const tone = getScoreTone(value);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium tabular-nums",
        tone.badge,
        className
      )}
    >
      {value}/100
    </span>
  );
}