import { ArrowRight, BarChart3, BriefcaseBusiness, Check, Mic } from "lucide-react";
import { Link } from "react-router";
import { AiUsageNotice } from "@/components/common/ai-usage-notice";
import { Button, buttonVariants } from "@/components/ui/button";
import { mergeSkills } from "@/features/onboarding/onboarding-data";
import { cn } from "@/lib/utils";

const nextSteps = [
  {
    title: "Analyze your skill gap",
    description: "Compare your skills with your target role.",
    href: "/skill-gap",
    icon: BarChart3,
  },
  {
    title: "Explore career guidance",
    description: "Get a roadmap, projects and interview topics.",
    href: "/career-guidance",
    icon: BriefcaseBusiness,
  },
  {
    title: "Practice a mock interview",
    description: "Answer role-based questions and get feedback.",
    href: "/mock-interview",
    icon: Mic,
  },
];

function SummaryRow({ label, children }) {
  return (
    <div className="grid gap-0.5 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="min-w-0 break-words text-sm font-medium">{children}</dd>
    </div>
  );
}

/**
 * Shown after the last step is saved, and when a student who has already
 * finished onboarding opens this page again. Everything shown here comes
 * from the saved answers.
 */
export function OnboardingComplete({ form, firstName, onEdit }) {
  const skills = mergeSkills(form.skills, form.languages);
  const degree = form.branch ? `${form.degree}, ${form.branch}` : form.degree;

  return (
    <div className="space-y-8">
      <div className="space-y-3 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-success/10 text-success">
          <Check aria-hidden="true" className="size-6" />
        </span>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {firstName ? `You are all set, ${firstName}` : "You are all set"}
        </h1>

        <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Your profile is saved. Guidio AI will use it to personalize your skill
          analysis, career guidance and interview practice.
        </p>

        <div className="flex flex-col justify-center gap-2 pt-2 sm:flex-row">
          <Link
            to="/dashboard"
            className={cn(buttonVariants(), "h-10 gap-2 px-5")}
          >
            Go to dashboard
            <ArrowRight aria-hidden="true" />
          </Link>

          <Button type="button" variant="outline" onClick={onEdit} className="h-10 px-5">
            Edit my answers
          </Button>
        </div>
      </div>

      <section
        aria-labelledby="ob-summary-title"
        className="rounded-xl border bg-card p-5 sm:p-6"
      >
        <h2 id="ob-summary-title" className="text-base font-semibold">
          Your profile
        </h2>

        <dl className="mt-2 divide-y">
          <SummaryRow label="Name">{form.fullName || "Not set"}</SummaryRow>
          <SummaryRow label="Education">
            {form.education} · {form.college}
          </SummaryRow>
          <SummaryRow label="Degree">{degree}</SummaryRow>
          <SummaryRow label="Graduation year">{form.graduationYear}</SummaryRow>
          <SummaryRow label="Experience level">{form.experienceLevel}</SummaryRow>
          <SummaryRow label="Preferred role">{form.targetRole}</SummaryRow>
          <SummaryRow label="Skills and knowledge">{skills.join(", ")}</SummaryRow>
          <SummaryRow label="Interests">{form.interests.join(", ")}</SummaryRow>
        </dl>
      </section>

      <section aria-labelledby="ob-next-title" className="space-y-3">
        <h2 id="ob-next-title" className="text-base font-semibold">
          What to do next
        </h2>

        <ul className="grid gap-3 sm:grid-cols-3">
          {nextSteps.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="group flex h-full flex-col gap-2 rounded-xl border bg-card p-4 transition-colors hover:bg-muted"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground group-hover:bg-background">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="text-xs leading-5 text-muted-foreground">
                    {item.description}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <AiUsageNotice className="justify-center text-center" />
    </div>
  );
}