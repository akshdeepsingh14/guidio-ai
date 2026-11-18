
import { cn } from "@/lib/utils";

/** Small decorative illustrations for the feature cards. */

function VisualFrame({ children }) {
  return (
    <div
      aria-hidden="true"
      className="relative rounded-lg border bg-background p-3 pt-6"
    >
      <span className="absolute right-2.5 top-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        Example
      </span>
      {children}
    </div>
  );
}

function MiniBar({ label, width, className }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full bg-foreground", className)}
          style={{ width }}
        />
      </div>
    </div>
  );
}

function AssistantVisual() {
  return (
    <VisualFrame>
      <div className="space-y-2">
        <p className="ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm bg-primary px-3 py-2 text-xs text-primary-foreground">
          How do I prepare for my first job in my field?
        </p>
        <p className="w-fit max-w-[90%] rounded-xl rounded-bl-sm bg-muted px-3 py-2 text-xs text-muted-foreground">
          Start with the core subjects, then practise with one small project or case study.
        </p>
      </div>
    </VisualFrame>
  );
}

function SkillGapVisual() {
  return (
    <VisualFrame>
      <div className="space-y-2.5">
        <MiniBar label="Communication" width="85%" />
        <MiniBar
          label="Subject knowledge"
          width="55%"
          className="bg-foreground/60"
        />
        <MiniBar
          label="Presentation"
          width="20%"
          className="bg-foreground/25"
        />
      </div>
    </VisualFrame>
  );
}

function CareerVisual() {
  const phases = ["Foundations", "Projects", "Interview prep"];

  return (
    <VisualFrame>
      <ol className="space-y-2">
        {phases.map((phase, index) => (
          <li key={phase} className="flex items-center gap-2.5 text-xs">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-medium tabular-nums">
              {index + 1}
            </span>
            <span className="text-muted-foreground">{phase}</span>
          </li>
        ))}
      </ol>
    </VisualFrame>
  );
}

function InterviewVisual() {
  return (
    <VisualFrame>
      <div className="space-y-2.5">
        <MiniBar label="Technical" width="78%" />
        <MiniBar
          label="Communication"
          width="64%"
          className="bg-foreground/60"
        />
        <MiniBar
          label="Structure"
          width="48%"
          className="bg-foreground/40"
        />
      </div>
    </VisualFrame>
  );
}

const visuals = {
  assistant: AssistantVisual,
  "skill-gap": SkillGapVisual,
  career: CareerVisual,
  interview: InterviewVisual,
};

export function FeatureVisual({ id }) {
  const Visual = visuals[id];
  return Visual ? <Visual /> : null;
}
