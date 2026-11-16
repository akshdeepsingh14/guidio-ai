import { CircleAlert, RotateCcw } from "lucide-react";
import { AiUsageNotice } from "@/components/common/ai-usage-notice";
import { ErrorState } from "@/components/common/error-state";
import { PageHeader } from "@/components/common/page-header";
import { CardSkeleton, PageSkeleton } from "@/components/common/skeletons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InterviewHistory } from "@/features/interview/interview-history";
import { InterviewSession } from "@/features/interview/interview-session";
import { InterviewSetup } from "@/features/interview/interview-setup";
import { useMockInterview } from "@/features/interview/use-mock-interview";

function MockInterviewPage() {
  const interview = useMockInterview();

  const {
    status,
    loadError,
    activeInterview,
    isSubmitting,
    isOpening,
    isBusy,
    openError,
    cooldown,
  } = interview;

  if (status === "loading") {
    return <PageSkeleton />;
  }

  if (status === "error") {
    return (
      <ErrorState
        title="Unable to load Mock Interview"
        error={loadError}
        onRetry={interview.reload}
      />
    );
  }

  let description =
    "Practise realistic interviews and get scored feedback after every answer.";

  if (activeInterview?.status === "COMPLETED") {
    description = "Review your score, feedback and improvement plan.";
  } else if (activeInterview) {
    description = "Answer each question in your own words and learn from the feedback.";
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Mock Interview"
        description={description}
        actions={
          activeInterview ? (
            <Button
              type="button"
              variant="outline"
              onClick={interview.leaveInterview}
              disabled={isSubmitting}
            >
              <RotateCcw aria-hidden="true" />
              New interview
            </Button>
          ) : null
        }
      />

      {openError ? (
        <Alert variant="destructive">
          <CircleAlert aria-hidden="true" />
          <AlertTitle>Unable to open this interview</AlertTitle>
          <AlertDescription>{openError.message}</AlertDescription>
        </Alert>
      ) : null}

      {activeInterview ? (
        <InterviewSession
          interview={activeInterview}
          viewedQuestionId={interview.viewedQuestionId}
          onSelectQuestion={interview.selectQuestion}
          answerText={interview.answerText}
          onAnswerChange={interview.setAnswerText}
          onSubmit={interview.submitAnswer}
          isSubmitting={isSubmitting}
          submitError={interview.submitError}
          cooldown={cooldown}
          onNew={interview.leaveInterview}
          onRefresh={interview.refreshInterview}
          isRefreshing={interview.isRefreshing}
          refreshError={interview.refreshError}
        />
      ) : (
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="min-w-0">
            {isOpening ? (
              <CardSkeleton lines={6} />
            ) : (
              <InterviewSetup
                setup={interview.setup}
                onChange={interview.updateSetup}
                canStart={interview.canStart}
                profileRole={interview.profileRole}
                onStart={interview.startInterview}
                isStarting={interview.isStarting}
                startError={interview.startError}
                cooldown={cooldown}
              />
            )}
          </div>

          <div className="min-w-0">
            <InterviewHistory
              interviews={interview.interviews}
              onOpen={interview.openInterview}
              disabled={isBusy}
            />
          </div>
        </div>
      )}

      <AiUsageNotice variant="inline" />
    </div>
  );
}

export default MockInterviewPage;