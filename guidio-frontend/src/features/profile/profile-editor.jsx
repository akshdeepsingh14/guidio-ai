import { useEffect, useState } from "react";
import { useUser } from "@clerk/react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  GraduationCap,
  LoaderCircle,
  RotateCcw,
  Save,
  Sparkles,
  Target,
  TriangleAlert,
  UserRound,
} from "lucide-react";
import { ChipInput } from "@/components/common/chip-input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCooldown } from "@/hooks/use-cooldown";
import { getFieldProfile } from "@/features/onboarding/field-data";
import {
  EDUCATION_OPTIONS,
  EXPERIENCE_OPTIONS,
  LIMITS,
  PROGRAMMING_LANGUAGES,
  normalizeName,
  profileToForm,
} from "@/features/onboarding/onboarding-data";
import { ChoiceGroup } from "@/features/onboarding/choice-group";
import { FieldSelect } from "@/features/onboarding/field-select";
import { FormField } from "@/features/onboarding/form-field";
import { SuggestionButtons } from "@/features/onboarding/suggestion-buttons";
import { CompletionChecklist } from "@/features/profile/completion-checklist";
import { ProfileSummary } from "@/features/profile/profile-summary";
import {
  buildProfilePayload,
  getProfileCompletion,
  isFormDirty,
  normalizeForm,
  validateProfileForm,
} from "@/features/profile/profile-utils";

const DEFAULT_COOLDOWN_SECONDS = 30;

/** Moves keyboard focus to the first field that has an error. */
function focusFirstInvalidField() {
  requestAnimationFrame(() => {
    const field = document.querySelector('[data-invalid="true"]');

    if (!field) return;

    const control =
      field.querySelector(
        "input:not([type='radio']):not(:disabled), textarea:not(:disabled)"
      ) ?? field.querySelector("input[type='radio']:checked, input[type='radio']");

    if (control) {
      control.focus();
    } else {
      field.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  });
}

function Section({ icon: Icon, title, description, children }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon aria-hidden="true" className="size-4 text-muted-foreground" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
}

/**
 * The editable profile. It starts from the saved profile it is given and
 * keeps its own copy of the answers, so typing never triggers a request.
 * `onSave(payload)` calls PUT /api/profile.
 */
export function ProfileEditor({ initialProfile, onSave }) {
  const { user } = useUser();
  const cooldown = useCooldown();

  // Read once. The form is the student's working copy from here on.
  const [initialForm] = useState(() =>
    normalizeForm(profileToForm(initialProfile, user?.fullName ?? ""))
  );

  const [form, setForm] = useState(initialForm);
  const [savedForm, setSavedForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [justSaved, setJustSaved] = useState(false);

  const isDirty = isFormDirty(form, savedForm);
  const completion = getProfileCompletion(savedForm);
  const isWaiting = cooldown.remaining > 0;
  const isRateLimited = saveError?.code === "rate_limited";

  // Warn before the tab is closed with unsaved changes.
  useEffect(() => {
    if (!isDirty) return undefined;

    function handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  function handleChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });
    setSaveError(null);
    setJustSaved(false);
  }

  function handleReset() {
    setForm(savedForm);
    setErrors({});
    setSaveError(null);
    setJustSaved(false);
  }

  /* The full name lives in the Clerk account, not in the profile API. */
  async function saveFullName(name) {
    if (!user || !name || name === normalizeName(user.fullName ?? "")) return;

    const [firstName, ...rest] = name.split(" ");

    await user.update({ firstName, lastName: rest.join(" ") });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSaving || isWaiting || !isDirty) return;

    const validationErrors = validateProfileForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      focusFirstInvalidField();
      return;
    }

    const cleaned = normalizeForm(form);

    setErrors({});
    setSaveError(null);
    setJustSaved(false);
    setIsSaving(true);

    try {
      await onSave(buildProfilePayload(cleaned));
    } catch (error) {
      setSaveError(error);

      if (error?.code === "rate_limited") {
        cooldown.start(error.retryAfterSeconds ?? DEFAULT_COOLDOWN_SECONDS);
      }

      setIsSaving(false);
      return;
    }

    // The profile is saved. Now update the name in the Clerk account.
    let savedName = cleaned.fullName;

    try {
      await saveFullName(cleaned.fullName);
    } catch {
      savedName = savedForm.fullName;
      setSaveError({
        code: "name",
        message:
          "Your profile was saved, but your name could not be updated. Please try saving again.",
      });
    }

    setForm({ ...cleaned, fullName: cleaned.fullName });
    setSavedForm({ ...cleaned, fullName: savedName });
    setJustSaved(true);
    setIsSaving(false);
  }

  let saveLabel = "Save changes";

  if (isSaving) saveLabel = "Saving...";
  else if (isWaiting) saveLabel = `Try again in ${cooldown.remaining}s`;

  const field = getFieldProfile(form.field);
  const showLanguages = field.showLanguages || form.languages.length > 0;

  const skillsMax = Math.max(
    form.skills.length,
    LIMITS.maxSkills - form.languages.length
  );
  const languagesMax = Math.max(
    form.languages.length,
    LIMITS.maxSkills - form.skills.length
  );

  return (
    <div className="space-y-6">
      <ProfileSummary savedForm={savedForm} completion={completion} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <form noValidate onSubmit={handleSubmit} className="min-w-0 space-y-6">
          <Section
            icon={UserRound}
            title="Personal information"
            description="Your name is saved to your Guidio AI account."
          >
            <FormField name="fullName" label="Full name" error={errors.fullName}>
              {(control) => (
                <Input
                  {...control}
                  value={form.fullName}
                  onChange={(event) => handleChange("fullName", event.target.value)}
                  placeholder="Example: Aarav Sharma"
                  autoComplete="name"
                  disabled={isSaving}
                  className="h-10"
                />
              )}
            </FormField>

            <FormField
              name="email"
              label="Email address"
              hint="Your email is managed in Settings and cannot be edited here."
            >
              {(control) => (
                <Input
                  {...control}
                  value={user?.primaryEmailAddress?.emailAddress ?? ""}
                  readOnly
                  disabled
                  className="h-10"
                />
              )}
            </FormField>
          </Section>

          <Section
            icon={GraduationCap}
            title="Education"
            description="Your current academic background."
          >
            <FormField name="education" label="Education level" group error={errors.education}>
              {(control) => (
                <ChoiceGroup
                  {...control}
                  name="education"
                  value={form.education}
                  onChange={(value) => handleChange("education", value)}
                  options={EDUCATION_OPTIONS}
                  disabled={isSaving}
                  className="sm:grid-cols-3"
                />
              )}
            </FormField>

            <FormField name="college" label="College, university or institute" error={errors.college}>
              {(control) => (
                <Input
                  {...control}
                  value={form.college}
                  onChange={(event) => handleChange("college", event.target.value)}
                  placeholder="Example: Arka Jain University"
                  autoComplete="organization"
                  disabled={isSaving}
                  className="h-10"
                />
              )}
            </FormField>

            <FormField
              name="field"
              label="Field of study"
              optional
              hint="Only used to suggest relevant options. You can type anything in the fields below."
            >
              {(control) => (
                <FieldSelect
                  {...control}
                  value={form.field}
                  onChange={(value) => handleChange("field", value)}
                  disabled={isSaving}
                />
              )}
            </FormField>

            <FormField name="degree" label="Degree or course" error={errors.degree}>
              {(control) => (
                <div className="space-y-2">
                  <Input
                    {...control}
                    value={form.degree}
                    onChange={(event) => handleChange("degree", event.target.value)}
                    placeholder={`Example: ${field.degrees[0]}`}
                    autoComplete="off"
                    disabled={isSaving}
                    className="h-10"
                  />
                  <SuggestionButtons
                    options={field.degrees}
                    current={form.degree}
                    onPick={(value) => handleChange("degree", value)}
                    disabled={isSaving}
                  />
                </div>
              )}
            </FormField>

            <FormField name="branch" label="Branch, specialisation or subject" optional error={errors.branch}>
              {(control) => (
                <div className="space-y-2">
                  <Input
                    {...control}
                    value={form.branch}
                    onChange={(event) => handleChange("branch", event.target.value)}
                    placeholder={`Example: ${field.branches[0]}`}
                    autoComplete="off"
                    disabled={isSaving}
                    className="h-10"
                  />
                  <SuggestionButtons
                    options={field.branches}
                    current={form.branch}
                    onPick={(value) => handleChange("branch", value)}
                    disabled={isSaving}
                  />
                </div>
              )}
            </FormField>

            <FormField
              name="graduationYear"
              label="Graduation year"
              error={errors.graduationYear}
              hint="The year you finish or finished your course."
            >
              {(control) => (
                <Input
                  {...control}
                  value={form.graduationYear}
                  onChange={(event) =>
                    handleChange(
                      "graduationYear",
                      event.target.value.replace(/\D/g, "").slice(0, 4)
                    )
                  }
                  placeholder="Example: 2027"
                  inputMode="numeric"
                  autoComplete="off"
                  disabled={isSaving}
                  className="h-10 sm:max-w-40"
                />
              )}
            </FormField>

            <FormField name="experienceLevel" label="Experience level" group error={errors.experienceLevel}>
              {(control) => (
                <ChoiceGroup
                  {...control}
                  name="experienceLevel"
                  value={form.experienceLevel}
                  onChange={(value) => handleChange("experienceLevel", value)}
                  options={EXPERIENCE_OPTIONS}
                  disabled={isSaving}
                />
              )}
            </FormField>
          </Section>

          <Section
            icon={BriefcaseBusiness}
            title="Skills"
            description="This powers your skill-gap analysis and mock interviews."
          >
            <FormField
              name="skills"
              label="Skills and knowledge"
              error={errors.skills}
              hint="Subjects, tools, methods and abilities you already have."
            >
              {(control) => (
                <ChipInput
                  {...control}
                  value={form.skills}
                  onChange={(value) => handleChange("skills", value)}
                  suggestions={field.skills}
                  placeholder={`Example: ${field.skills[0]}`}
                  maxItems={skillsMax}
                  maxLength={LIMITS.skill}
                  disabled={isSaving}
                />
              )}
            </FormField>

            {showLanguages ? (
              <FormField
                name="languages"
                label="Programming languages"
                optional
                hint="Only if you write code, for example for data work or research."
              >
                {(control) => (
                  <ChipInput
                    {...control}
                    value={form.languages}
                    onChange={(value) => handleChange("languages", value)}
                    suggestions={PROGRAMMING_LANGUAGES}
                    placeholder="Example: Python"
                    maxItems={languagesMax}
                    maxLength={LIMITS.skill}
                    disabled={isSaving}
                  />
                )}
              </FormField>
            ) : null}
          </Section>

          <Section
            icon={Target}
            title="Career direction"
            description="Where you want to go. This personalises your guidance."
          >
            <FormField
              name="targetRole"
              label="Preferred career role"
              error={errors.targetRole}
              hint="The job you want to prepare for."
            >
              {(control) => (
                <div className="space-y-2">
                  <Input
                    {...control}
                    value={form.targetRole}
                    onChange={(event) => handleChange("targetRole", event.target.value)}
                    placeholder={`Example: ${field.roles[0]}`}
                    autoComplete="off"
                    disabled={isSaving}
                    className="h-10"
                  />
                  <SuggestionButtons
                    options={field.roles}
                    current={form.targetRole}
                    onPick={(value) => handleChange("targetRole", value)}
                    disabled={isSaving}
                  />
                </div>
              )}
            </FormField>

            <FormField
              name="interests"
              label="Areas of interest"
              error={errors.interests}
              hint="Topics you would like to explore."
            >
              {(control) => (
                <ChipInput
                  {...control}
                  value={form.interests}
                  onChange={(value) => handleChange("interests", value)}
                  suggestions={field.interests}
                  placeholder={`Example: ${field.interests[0]}`}
                  maxItems={LIMITS.maxInterests}
                  maxLength={LIMITS.interest}
                  disabled={isSaving}
                />
              )}
            </FormField>
          </Section>

          {saveError ? (
            <Alert
              variant={isRateLimited ? "default" : "destructive"}
              className="items-start"
            >
              {isRateLimited ? (
                <Clock aria-hidden="true" />
              ) : (
                <TriangleAlert aria-hidden="true" />
              )}
              <AlertTitle>
                {isRateLimited ? "Please wait a moment" : "We could not save everything"}
              </AlertTitle>
              <AlertDescription>
                <p>{saveError.message}</p>
                <p className="mt-1">Your changes are still here. Nothing was lost.</p>
              </AlertDescription>
            </Alert>
          ) : null}

          <Card>
            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p
                role="status"
                aria-live="polite"
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                {justSaved && !isDirty ? (
                  <>
                    <CheckCircle2
                      aria-hidden="true"
                      className="size-4 text-emerald-600 dark:text-emerald-400"
                    />
                    Your profile is saved.
                  </>
                ) : isDirty ? (
                  "You have unsaved changes."
                ) : (
                  "No changes to save."
                )}
              </p>

              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={!isDirty || isSaving}
                  className="h-10 px-4"
                >
                  <RotateCcw aria-hidden="true" />
                  Discard changes
                </Button>

                <Button
                  type="submit"
                  disabled={!isDirty || isSaving || isWaiting}
                  className="h-10 px-5"
                >
                  {isSaving ? (
                    <LoaderCircle aria-hidden="true" className="animate-spin" />
                  ) : (
                    <Save aria-hidden="true" />
                  )}
                  {saveLabel}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        <aside className="min-w-0 space-y-6 xl:sticky xl:top-24 xl:self-start">
          <CompletionChecklist completion={completion} />

          <Card>
            <CardContent className="flex items-start gap-3">
              <Sparkles
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-muted-foreground"
              />
              <p className="text-sm leading-6 text-muted-foreground">
                A complete profile improves your career guidance, skill-gap
                reports and mock interview questions.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}