import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { ErrorState } from "@/components/common/error-state";
import { CardSkeleton } from "@/components/common/skeletons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InterviewResult } from "./interview-result";
import { formatDate } from "./interview-utils";
import { useInterviewDetail } from "./use-interview-detail";

function BackLink() {
  return (
    <Link
      to="/interview-history"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft aria-hidden="true" className="size-4" />
      All interviews
    </Link>
  );
}

function UnfinishedInterview({ interview }) {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Badge variant="secondary" className="bg-warning/10 text-warning">
            In progress
          </Badge>

          <h2 className="break-words text-xl font-semibold sm:text-2xl">
            {interview.targetRole} interview
          </h2>

          <p className="text-sm text-muted-foreground">
            {interview.interviewType} · {interview.difficulty}
            {formatDate(interview.createdAt) ? ` · ${formatDate(interview.createdAt)}` : ""}
          </p>
        </div>

        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          This interview is not finished, so it has no final score yet. Open
          Mock Interview and choose it from your history to continue or to
          review the answers you have already given.
        </p>

        <Link to="/mock-interview" className={buttonVariants({ size: "lg" })}>
          Go to Mock Interview
        </Link>
      </CardContent>
    </Card>
  );
}

/** One interview. The page gives it key={id} so the state resets per interview. */
export function HistoryDetail({ id }) {
  const detail = useInterviewDetail(id);
  const navigate = useNavigate();
  const { status, error, interview } = detail;

  let content;

  if (status === "loading") {
    content = <CardSkeleton lines={8} />;
  } else if (status === "error") {
    const notFound = error?.code === "not_found";

    content = (
      <ErrorState
        title={notFound ? "Interview not found" : "Unable to load this interview"}
        error={error}
        onRetry={notFound ? undefined : detail.reload}
      />
    );
  } else if (interview.status === "COMPLETED") {
    content = (
      <InterviewResult
        interview={interview}
        onNew={() => navigate("/mock-interview")}
        onRefresh={detail.refresh}
        isRefreshing={detail.isRefreshing}
        refreshError={detail.refreshError}
      />
    );
  } else {
    content = <UnfinishedInterview interview={interview} />;
  }

  return (
    <div className="space-y-5">
      <BackLink />
      <div className="max-w-4xl">{content}</div>
    </div>
  );
}