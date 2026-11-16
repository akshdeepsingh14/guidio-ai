import { BarChart3, BriefcaseBusiness, Mic } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatDate,
  getInterviewStatusLabel,
} from "@/features/dashboard/dashboard-utils";

function ResultItem({ icon: Icon, label, emptyText, href, linkLabel, children }) {
  return (
    <li className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon aria-hidden="true" className="size-4" />
      </span>

      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        {children ?? (
          <p className="text-sm leading-6 text-muted-foreground">{emptyText}</p>
        )}

        <Link
          to={href}
          className="inline-block text-sm font-medium underline-offset-4 hover:underline"
        >
          {linkLabel}
        </Link>
      </div>
    </li>
  );
}

function Meta({ children }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
      {children}
    </div>
  );
}

/** `latest` is the normalised latest object from normalizeDashboard(). */
export function LatestResultsCard({ latest }) {
  const { skillGapReport, careerPlan, interview } = latest;
  const interviewDone = interview?.status === "COMPLETED";

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Latest results</CardTitle>
        <CardDescription>
          Your most recent skill gap report, career plan and mock interview.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="divide-y">
          <ResultItem
            icon={BarChart3}
            label="Skill gap"
            emptyText="No skill gap analysis yet."
            href="/skill-gap"
            linkLabel={skillGapReport ? "Open skill gap" : "Run analysis"}
          >
            {skillGapReport ? (
              <>
                <p className="break-words text-sm font-medium">
                  {skillGapReport.targetRole || "Target role"}
                </p>
                <Meta>
                  <span>{skillGapReport.matchPercentage}% match</span>
                  <span>{formatDate(skillGapReport.createdAt)}</span>
                </Meta>
              </>
            ) : null}
          </ResultItem>

          <ResultItem
            icon={BriefcaseBusiness}
            label="Career plan"
            emptyText="No career roadmap yet."
            href="/career-guidance"
            linkLabel={careerPlan ? "Open career guidance" : "Generate roadmap"}
          >
            {careerPlan ? (
              <>
                <p className="break-words text-sm font-medium">
                  {careerPlan.primaryRole || "Recommended role"}
                </p>
                <Meta>
                  <span>Plan readiness {careerPlan.readinessScore}/100</span>
                  <span>{formatDate(careerPlan.createdAt)}</span>
                </Meta>
              </>
            ) : null}
          </ResultItem>

          <ResultItem
            icon={Mic}
            label="Mock interview"
            emptyText="No mock interviews yet."
            href="/mock-interview"
            linkLabel={
              interview && !interviewDone ? "Continue practice" : "Open mock interview"
            }
          >
            {interview ? (
              <>
                <p className="break-words text-sm font-medium">
                  {interview.targetRole || "Mock interview"}
                </p>
                <Meta>
                  <Badge variant={interviewDone ? "secondary" : "outline"}>
                    {getInterviewStatusLabel(interview.status)}
                  </Badge>
                  {typeof interview.overallScore === "number" ? (
                    <span>Score {interview.overallScore}/100</span>
                  ) : null}
                  <span>{formatDate(interview.createdAt)}</span>
                </Meta>
              </>
            ) : null}
          </ResultItem>
        </ul>
      </CardContent>
    </Card>
  );
}