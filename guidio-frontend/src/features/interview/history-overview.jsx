import { CheckCircle2, Mic, Target, Trophy } from "lucide-react";
import { StatCard } from "@/components/common/stat-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getHistoryStats, getScoreTrend } from "./history-utils";
import { formatDate, getScoreTone } from "./interview-utils";

function ScoreTrend({ trend }) {
  const summary = trend.map((item) => item.overallScore).join(", ");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Score trend</CardTitle>
        <CardDescription>
          Your latest {trend.length} completed interviews, oldest on the left.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <div
          role="img"
          aria-label={`Interview scores from oldest to latest: ${summary}`}
          className="space-y-2"
        >
          <div className="flex h-32 items-end gap-2">
            {trend.map((item) => (
              <div
                key={item.id}
                title={`${item.targetRole}, ${formatDate(item.completedAt || item.createdAt)}: ${item.overallScore}/100`}
                className="flex h-full flex-1 items-end"
              >
                <div
                  className={cn(
                    "w-full rounded-t-sm",
                    getScoreTone(item.overallScore).bar
                  )}
                  style={{ height: `${Math.max(item.overallScore, 4)}%` }}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {trend.map((item) => (
              <p
                key={item.id}
                className="flex-1 text-center text-xs tabular-nums text-muted-foreground"
              >
                {item.overallScore}
              </p>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function HistoryOverview({ interviews }) {
  const stats = getHistoryStats(interviews);
  const trend = getScoreTrend(interviews);

  return (
    <div className="space-y-4">
      <section
        aria-label="Interview statistics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          label="Interviews"
          icon={Mic}
          value={stats.total}
          hint={stats.inProgress > 0 ? `${stats.inProgress} in progress` : "All finished"}
        />

        <StatCard
          label="Completed"
          icon={CheckCircle2}
          value={stats.completed}
          hint="Interviews with a final score"
        />

        <StatCard
          label="Average score"
          icon={Target}
          value={stats.average === null ? null : `${stats.average}/100`}
          hint={
            stats.completed > 0
              ? `From ${stats.completed} completed`
              : "Complete an interview to see this"
          }
        />

        <StatCard
          label="Best score"
          icon={Trophy}
          value={stats.best === null ? null : `${stats.best}/100`}
          hint="Your highest interview score"
        />
      </section>

      {trend.length >= 2 ? <ScoreTrend trend={trend} /> : null}
    </div>
  );
}