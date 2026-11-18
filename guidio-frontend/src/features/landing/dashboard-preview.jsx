
import {
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  LayoutDashboard,
  Mic,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "My Profile", icon: UserRound },
  { label: "AI Assistant", icon: BrainCircuit },
  { label: "Skill Gap", icon: BarChart3 },
  { label: "Career Guidance", icon: BriefcaseBusiness },
  { label: "Mock Interview", icon: Mic },
];

const stats = [
  { label: "Readiness", value: "72", suffix: "/100" },
  { label: "Skill match", value: "68%" },
  { label: "Interviews", value: "4" },
];

const skills = [
  { name: "Communication", width: "85%", barClass: "bg-foreground" },
  { name: "Market research", width: "55%", barClass: "bg-foreground/60" },
  { name: "Data analysis", width: "20%", barClass: "bg-foreground/25", high: true },
];

const activity = [
  { text: "Mock interview completed", time: "Today" },
  { text: "Skill gap report saved", time: "Yesterday" },
  { text: "Asked the assistant about a study topic", time: "2 days ago" },
];

/**
 * A static illustration of the student dashboard. It uses sample values
 * only and says so on screen, so it is never mistaken for real data.
 */
export function DashboardPreview({ className }) {
  return (
    <div
      role="img"
      aria-label="Illustration of the Guidio AI student dashboard using sample data"
      className={cn("relative mx-auto max-w-5xl", className)}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-6 -bottom-6 top-10 -z-10 rounded-[2rem] bg-foreground/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="overflow-hidden rounded-2xl border bg-card text-left shadow-xl ring-1 ring-foreground/5"
      >
        {/* Window bar */}
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
          </div>

          <Badge variant="outline" className="h-5 text-[10px]">
            Sample data
          </Badge>
        </div>

        <div className="grid md:grid-cols-[180px_1fr]">
          {/* Sidebar (hidden on small screens) */}
          <div className="hidden space-y-1 border-r p-3 md:block">
            {sidebarItems.map(({ label, icon: Icon, active }) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs",
                  active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="size-3.5 shrink-0" />
                <span className="truncate">{label}</span>
              </div>
            ))}
          </div>

          {/* Main area */}
          <div className="min-w-0 space-y-4 p-4 sm:p-5">
            <div>
              <p className="text-xs text-muted-foreground">Student dashboard</p>
              <p className="text-base font-semibold sm:text-lg">
                Welcome back
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-0 rounded-lg border bg-background p-2.5 sm:p-3"
                >
                  <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-xl font-semibold tabular-nums sm:text-2xl">
                    {stat.value}
                    {stat.suffix ? (
                      <span className="text-xs font-normal text-muted-foreground">
                        {stat.suffix}
                      </span>
                    ) : null}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-3 lg:grid-cols-5">
              <div className="rounded-lg border bg-background p-3 sm:p-4 lg:col-span-3">
                <p className="text-xs font-medium">
                  Skill gap: Marketing Executive
                </p>

                <div className="mt-3 space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="text-muted-foreground">
                          {skill.name}
                        </span>
                        {skill.high ? (
                          <span className="rounded-full bg-warning/10 px-1.5 py-0.5 text-[10px] font-medium text-warning">
                            High priority
                          </span>
                        ) : null}
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn("h-full rounded-full", skill.barClass)}
                          style={{ width: skill.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden rounded-lg border bg-background p-3 sm:block sm:p-4 lg:col-span-2">
                <p className="text-xs font-medium">Recent activity</p>

                <ul className="mt-3 space-y-3">
                  {activity.map((item) => (
                    <li key={item.text} className="space-y-0.5">
                      <p className="text-xs leading-5">{item.text}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {item.time}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
