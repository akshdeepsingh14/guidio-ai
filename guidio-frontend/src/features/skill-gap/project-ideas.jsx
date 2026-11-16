import { Badge } from "@/components/ui/badge";
import { asArray } from "./skill-gap-utils";

export function ProjectIdeas({ projects }) {
  const ideas = asArray(projects);

  if (ideas.length === 0) {
    return (
      <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
        This report has no project ideas.
      </p>
    );
  }

  return (
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
            <Badge variant="outline">{project.difficulty}</Badge>
          </div>

          <p className="break-words text-sm leading-6 text-muted-foreground">
            {project.description}
          </p>

          <ul className="mt-auto flex flex-wrap gap-1.5">
            {asArray(project.skills).map((skill) => (
              <li key={skill}>
                <Badge variant="secondary" className="h-auto whitespace-normal py-0.5">
                  {skill}
                </Badge>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}