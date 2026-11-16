import { LoaderCircle, Sparkles } from "lucide-react";
import { AiErrorNotice } from "@/components/common/ai-error-notice";
import { AiUsageNotice } from "@/components/common/ai-usage-notice";
import { ErrorState } from "@/components/common/error-state";
import { PageHeader } from "@/components/common/page-header";
import { CardSkeleton, PageSkeleton } from "@/components/common/skeletons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ProfileInputsCard } from "@/features/skill-gap/profile-inputs-card";
import { ReportHistory } from "@/features/skill-gap/report-history";
import { AnalyzingState, NoReportState } from "@/features/skill-gap/report-states";
import { SkillGapReport } from "@/features/skill-gap/skill-gap-report";
import { useSkillGap } from "@/features/skill-gap/use-skill-gap";

function SkillGapPage() {
  const skillGap = useSkillGap();

  const {
    status,
    loadError,
    profile,
    canAnalyze,
    reports,
    activeReport,
    isLoadingReport,
    reportError,
    isGenerating,
    generateError,
    cooldown,
  } = skillGap;

  if (status === "loading") {
    return <PageSkeleton />;
  }

  if (status === "error") {
    return (
      <ErrorState
        title="Unable to load Skill Gap Analysis"
        error={loadError}
        onRetry={skillGap.reload}
      />
    );
  }

  const isBusy = isGenerating || isLoadingReport;

  let analyzeLabel = activeReport ? "Analyze again" : "Analyze skill gap";
  if (isGenerating) analyzeLabel = "Analyzing…";
  else if (cooldown.isCoolingDown) analyzeLabel = `Try again in ${cooldown.remaining}s`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Skill Gap Analysis"
        description="Compare the skills you have with your target role, then follow a clear plan to close the gap."
        actions={
          <Button
            type="button"
            size="lg"
            onClick={skillGap.generateReport}
            disabled={!canAnalyze || isBusy || cooldown.isCoolingDown}
          >
            {isGenerating ? (
              <LoaderCircle aria-hidden="true" className="animate-spin" />
            ) : (
              <Sparkles aria-hidden="true" />
            )}
            {analyzeLabel}
          </Button>
        }
      />

      {generateError ? (
        <AiErrorNotice
          error={generateError}
          onRetry={canAnalyze ? skillGap.generateReport : undefined}
          cooldownSeconds={cooldown.remaining}
        />
      ) : null}

      {reportError ? (
        <Alert variant="destructive">
          <AlertDescription className="text-destructive/90">
            {reportError}
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 space-y-4">
          {isGenerating ? (
            <AnalyzingState />
          ) : isLoadingReport ? (
            <CardSkeleton lines={6} />
          ) : activeReport ? (
            <SkillGapReport report={activeReport} />
          ) : (
            <NoReportState canAnalyze={canAnalyze} />
          )}

          <AiUsageNotice variant="inline" />
        </div>

        <div className="min-w-0 space-y-4">
          <ProfileInputsCard profile={profile} canAnalyze={canAnalyze} />

          <ReportHistory
            reports={reports}
            activeId={activeReport?.id}
            disabled={isBusy}
            onSelect={skillGap.selectReport}
          />
        </div>
      </div>
    </div>
  );
}

export default SkillGapPage;