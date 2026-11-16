import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CareerInterview } from "./career-interview";
import { CareerOverview } from "./career-overview";
import { CareerProjects } from "./career-projects";
import { CareerRoadmap } from "./career-roadmap";

export function CareerPlan({ plan }) {
  return (
    // key: each plan starts on the Overview tab. flex-col is set here because
    // the shared Tabs component only stacks vertically through a data-attribute
    // that Base UI does not set.
    <Tabs key={plan.id} defaultValue="overview" className="flex-col gap-4">
      <div className="max-w-full overflow-x-auto">
        <TabsList className="w-max min-w-full sm:min-w-0">
          <TabsTrigger value="overview" className="px-3 py-1.5">
            Overview
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="px-3 py-1.5">
            Roadmap
          </TabsTrigger>
          <TabsTrigger value="projects" className="px-3 py-1.5">
            Projects
          </TabsTrigger>
          <TabsTrigger value="interview" className="px-3 py-1.5">
            Interview prep
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview">
        <CareerOverview plan={plan} />
      </TabsContent>

      <TabsContent value="roadmap">
        <CareerRoadmap roadmap={plan.roadmap} />
      </TabsContent>

      <TabsContent value="projects">
        <CareerProjects projects={plan.projects} />
      </TabsContent>

      <TabsContent value="interview">
        <CareerInterview plan={plan} />
      </TabsContent>
    </Tabs>
  );
}