import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  asArray,
  countByPriority,
  PRIORITY_ORDER,
  PRIORITY_STYLES,
  sortByPriority,
} from "./skill-gap-utils";

const FILTERS = ["All", ...PRIORITY_ORDER];

export function MissingSkillsList({ skills }) {
  const [filter, setFilter] = useState("All");

  const all = sortByPriority(asArray(skills));
  const counts = countByPriority(all);
  const visible = filter === "All" ? all : all.filter((skill) => skill.priority === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by priority">
        {FILTERS.map((name) => {
          const isActive = filter === name;
          const count = name === "All" ? all.length : counts[name];

          return (
            <button
              key={name}
              type="button"
              onClick={() => setFilter(name)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {name} ({count})
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
          No skills in this priority.
        </p>
      ) : (
        <ul className="space-y-2.5">
          {visible.map((skill, index) => {
            const style = PRIORITY_STYLES[skill.priority] || PRIORITY_STYLES.Low;

            return (
              <li key={`${skill.skill}-${index}`}>
                <details className="group rounded-xl border bg-card">
                  <summary className="flex cursor-pointer list-none items-center gap-3 p-3.5 [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0 flex-1 break-words text-sm font-medium">
                      {skill.skill}
                    </span>

                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                        style.badge
                      )}
                    >
                      {skill.priority}
                    </span>

                    <ChevronDown
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                    />
                  </summary>

                  <div className="space-y-3 border-t p-3.5 text-sm leading-6">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Why it matters
                      </p>
                      <p className="mt-0.5 break-words">{skill.reason}</p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        What to focus on
                      </p>
                      <p className="mt-0.5 break-words">{skill.learningFocus}</p>
                    </div>
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}