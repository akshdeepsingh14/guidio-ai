import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearningPlan } from "./learning-plan";
import { MissingSkillsList } from "./missing-skills-list";
import { ProjectIdeas } from "./project-ideas";
import { ReportOverview } from "./report-overview";

export function SkillGapReport({ report }) {
  return (
    // key: each report starts on the Overview tab. flex-col is set here because
    // the shared Tabs component only stacks vertically through a data-attribute
    // that Base UI does not set.
    <Tabs key={report.id} defaultValue="overview" className="flex-col gap-4">
      <div className="max-w-full overflow-x-auto">
        <TabsList className="w-max min-w-full sm:min-w-0">
          <TabsTrigger value="overview" className="px-3 py-1.5">
            Overview
          </TabsTrigger>
          <TabsTrigger value="missing" className="px-3 py-1.5">
            Missing skills
          </TabsTrigger>
          <TabsTrigger value="plan" className="px-3 py-1.5">
            Learning plan
          </TabsTrigger>
          <TabsTrigger value="projects" className="px-3 py-1.5">
            Projects
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview">
        <ReportOverview report={report} />
      </TabsContent>

      <TabsContent value="missing">
        <MissingSkillsList skills={report.missingSkills} />
      </TabsContent>

      <TabsContent value="plan">
        <LearningPlan plan={report.learningPlan} />
      </TabsContent>

      <TabsContent value="projects">
        <ProjectIdeas projects={report.projectIdeas} />
      </TabsContent>
    </Tabs>
  );
}