import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { asArray, DIFFICULTY_STYLES } from "./career-utils";

export function CareerProjects({ projects }) {
  const ideas = asArray(projects);

  if (ideas.length === 0) {
    return (
      <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
        This plan has no project ideas.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm leading-6 text-muted-foreground">
        Build these in order and publish each one on GitHub with a clear README.
      </p>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ideas.map((project, index) => (
          <li
            key={`${project.title}-${index}`}
            className="flex min-w-0 flex-col gap-3 rounded-xl border bg-card p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="min-w-0 break-words text-sm font-semibold">
                {project.title}
              </h3>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                  DIFFICULTY_STYLES[project.difficulty] ||
                    "bg-muted text-muted-foreground"
                )}
              >
                {project.difficulty}
              </span>
            </div>

            <p className="break-words text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-auto space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                Skills you will practice
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {asArray(project.skills).map((skill) => (
                  <li key={skill}>
                    <Badge
                      variant="secondary"
                      className="h-auto whitespace-normal py-0.5"
                    >
                      {skill}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}